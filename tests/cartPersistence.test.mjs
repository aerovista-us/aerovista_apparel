import test from 'node:test'
import assert from 'node:assert/strict'
import {CART_STORAGE_KEY,serializeBag,parseSavedCart,restoreBag,readCart,writeCart,CART_TTL_MS} from '../src/commerce/cartPersistence.js'

const NOW = Date.UTC(2026,10,12)
const product=(id,variantId,price=32)=>({
  id,commerceStatus:'connected',
  commerce:{variants:[{providerVariationId:variantId,price,size:'M',availability:'available'}]},
})
const prod=product('aerovista-idaho-after-dark-tee','ABCDEFG12345678',40)
const selected=prod.commerce.variants[0]
const raw=[{product:prod,variant:selected,size:'M',quantity:1}]

test('persist only immutable identity, never saved price or product metadata',()=>{
 const snap=serializeBag(raw,NOW)
 assert.deepEqual(snap.lines,[{productId:prod.id,variationId:'ABCDEFG12345678',quantity:1}])
 assert.equal(JSON.stringify(snap).includes('price'),false)
 const restored=restoreBag(parseSavedCart(JSON.stringify(snap),NOW+100),new Map([[prod.id,product(prod.id,'ABCDEFG12345678',99)]]))
 assert.equal(restored[0].variant.price,99)
 assert.equal(restored[0].size,'M')
})
test('malformed/expired data cannot restore',()=>{
 assert.equal(parseSavedCart('{"bad":',NOW),null)
 assert.equal(parseSavedCart(JSON.stringify(serializeBag(raw,NOW)),NOW+CART_TTL_MS+1),null)
 assert.equal(parseSavedCart(JSON.stringify({...serializeBag(raw,NOW),version:2}),NOW),null)
})
test('deleted products / unavailable or renamed variants are dropped',()=>{
 const saved=serializeBag(raw,NOW).lines
 assert.equal(restoreBag(saved,new Map()).length,0)
 assert.equal(restoreBag(saved,new Map([[prod.id,product(prod.id,'DIFFERENT9876543')]])).length,0)
 const blocked=product(prod.id,'ABCDEFG12345678')
 blocked.commerce.variants[0].availability='unavailable'
 assert.equal(restoreBag(saved,new Map([[prod.id,blocked]])).length,0)
})
test('bundle with a removed member is not restored partially',()=>{
 const one={product:prod,variant:selected,quantity:1,bundleId:'sticker-example1234'}
 const second={product:product('second-item','HIJKLMN12345678'),variant:{providerVariationId:'HIJKLMN12345678'},quantity:2,bundleId:one.bundleId}
 const lines=serializeBag([one,second],NOW).lines
 assert.equal(restoreBag(lines,new Map([[prod.id,prod]])).length,0)
 assert.equal(restoreBag(lines,new Map([[prod.id,prod],['second-item',product('second-item','HIJKLMN12345678')]])).length,2)
})
test('storage failures are safe and empty cart clears storage',()=>{
 const cache=new Map()
 const storage={getItem:k=>cache.get(k),setItem:(k,v)=>cache.set(k,v),removeItem:k=>cache.delete(k)}
 assert.equal(writeCart(raw,storage,NOW),true)
 assert.equal(readCart(storage,NOW).length,1)
 assert.ok(cache.has(CART_STORAGE_KEY))
 assert.equal(writeCart([],storage,NOW),true)
 assert.equal(cache.has(CART_STORAGE_KEY),false)
 const denied={getItem(){throw Error('disabled')},setItem(){throw Error('disabled')},removeItem(){throw Error('disabled')}}
 assert.equal(readCart(denied,NOW),null)
 assert.equal(writeCart(raw,denied,NOW),false)
})
test('storage quantity and variation fields are validated',()=>{
 assert.equal(serializeBag([{...raw[0],quantity:51}],NOW),null)
 const invalid={...serializeBag(raw,NOW),lines:[{productId:'foo',variationId:'bad',quantity:1}]}
 assert.equal(parseSavedCart(JSON.stringify(invalid),NOW),null)
})

test('complete 3-piece sticker bundle survives rehydration as one group',()=>{
 const sticker=product('mount-sled-sticker','CCL2FBPVTS5FCGMBCWJM2SDD',8)
 const variant=sticker.commerce.variants[0]
 const bundle=Array.from({length:3},()=>({product:sticker,variant,quantity:1,bundleId:'sticker-1720298750000-a1b2c3'}))
 const lines=parseSavedCart(JSON.stringify(serializeBag(bundle,NOW)),NOW)
 const restored=restoreBag(lines,new Map([[sticker.id,sticker]]))
 assert.equal(restored.length,3)
 assert.equal(new Set(restored.map(x=>x.bundleId)).size,1)
})
