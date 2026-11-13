import test from 'node:test'
import assert from 'node:assert/strict'
import {returnMessage, savePendingCheckout, mayClearPaidBag} from '../src/commerce/checkoutReturn.js'
test('URL-only success string never grants payment proof',()=>{
 assert.match(returnMessage('success'),/not verified/)
 assert.match(returnMessage('return'),/not verified/)
 assert.match(returnMessage('cancel'),/preserved/)
 assert.match(returnMessage('pending'),/preserved/)
})
test('altered cart is never cleared even when verification says paid',()=>{
 const storage=new Map()
 const store={getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}
 const ref='B'.repeat(43)
 const bag=[{product:{id:'afterdark-midnight-signal-hoodie'},variant:{providerVariationId:'ABC123456789'},quantity:1}]
 savePendingCheckout(ref,bag,store)
 assert.equal(mayClearPaidBag(ref,[{...bag[0],quantity:2}],store),false)
})
