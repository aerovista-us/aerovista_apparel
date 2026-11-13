import test from 'node:test'
import assert from 'node:assert/strict'
import {bagSignature,savePendingCheckout,mayClearPaidBag,forgetPendingCheckout,returnMessage} from '../src/commerce/checkoutReturn.js'
const reference='A'.repeat(43)
const product={id:'afterdark-midnight-signal-hoodie'}
const item={product,variant:{providerVariationId:'SQUAREID1234567890'},quantity:1}
function storage() {
 const map=new Map()
 return {getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)}
}
test('checkout proof is bound to exact cart state and opaque ref',()=>{
 const s=storage()
 assert.ok(savePendingCheckout(reference,[item],s))
 assert.ok(mayClearPaidBag(reference,[item],s))
 assert.equal(mayClearPaidBag('B'.repeat(43),[item],s),false)
 assert.equal(mayClearPaidBag(reference,[{...item,quantity:2}],s),false)
 assert.equal(mayClearPaidBag(reference,[],s),false)
 forgetPendingCheckout(s)
 assert.equal(mayClearPaidBag(reference,[item],s),false)
})
test('saved checkout proof never includes prices or buyer data',()=>{
 const s=storage()
 savePendingCheckout(reference,[{...item,price:250,customerEmail:'private@example.com'}],s)
 assert.ok(!s.getItem('aerovista-apparel.checkout.v1').includes('private@example.com'))
 assert.ok(!s.getItem('aerovista-apparel.checkout.v1').includes('250'))
})
test('return messages do not declare success for URL-only states',()=>{
 assert.match(returnMessage('unverified'),/not verified/)
 assert.match(returnMessage('pending'),/not confirmed/)
 assert.match(returnMessage('confirmed'),/Square verified/)
 assert.match(returnMessage('cancel'),/preserved/)
})
