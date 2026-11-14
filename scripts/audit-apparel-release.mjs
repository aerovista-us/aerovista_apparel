#!/usr/bin/env node
// Strict source-only release checks; never pretends static catalog data is a live Square verification.
import fs from 'node:fs'
import { stickerSurcharges } from '../src/commerce/stickerPricing.js'
import editions from '../src/data/flagshipSquareEditions.json' with { type: 'json' }

const args=process.argv.slice(2)
const check=args.includes('--check')
const getFlag=(name)=>{const i=args.indexOf(name);return i<0?null:args[i+1]}
const assert=(condition,message)=>{if(!condition)throw Error(message)}
const itemIds=new Set(),variationIds=new Set()
let variations=0
for(const item of editions){
 assert(item?.id && /^[a-z0-9-]+$/.test(item.id),'Invalid Apparel product id')
 assert(item.square_item_id,'Missing Square item ID '+item.id)
 assert(!itemIds.has(item.id),'Duplicate Apparel product id '+item.id)
 itemIds.add(item.id)
 assert(Array.isArray(item.variants) && item.variants.length,'No variants '+item.id)
 for(const v of item.variants){
   assert(/^[A-Z0-9]{20,}$/.test(v.variation_id),'Invalid Square variation ID '+item.id)
   assert(!variationIds.has(v.variation_id),'Duplicate Square variation ID '+v.variation_id)
   variationIds.add(v.variation_id)
   assert(Number.isFinite(v.price) && v.price>0,'Missing positive retail price '+v.variation_id)
   variations++
 }
}
const stickerKeys=Object.keys(stickerSurcharges)
assert(stickerKeys.length===new Set(stickerKeys).size,'Duplicate sticker keys')
assert(stickerKeys.every(id=>Number.isInteger(stickerSurcharges[id])&&stickerSurcharges[id]>=0),'Bad sticker surcharge')

const csvEscape=value=>'"'+String(value??'').replace(/"/g,'""')+'"'
const columns=['scope','product_id','square_item_id','product_name','visibility','variation_id','sku','color','size','feed_price_usd','primary_image','current_square_price_verified','printful_variant_verified','status']
function rowsFor(products,scope){
 const rows=[]
 for(const item of products){
  for(const v of item.variants||[]){
   rows.push({
    scope,product_id:item.id,square_item_id:item.square_item_id||'',product_name:item.name||'',
    visibility:String(item.visibility??'visible'),variation_id:v.variation_id||'',sku:v.sku||'',
    color:v.color||item.color||'',size:v.size||'One Size',
    feed_price_usd:v.price??item.price??'',primary_image:item.image||'',
    current_square_price_verified:'NOT_CHECKED_LIVE',
    printful_variant_verified:'NOT_CHECKED_LIVE',
    status:!v.variation_id?'MISSING_VARIATION_ID':(item.visibility==='hidden'?'HIDDEN':'STATIC_RECORD_ONLY')
   })
  }
 }
 return rows
}
const gearPath=getFlag('--feed')
const output=getFlag('--output')
let rows=rowsFor(editions,'apparel_flagship_only')
if(gearPath){
 const gear=JSON.parse(fs.readFileSync(gearPath,'utf8'))
 assert(Array.isArray(gear.products),'Missing Gear products')
 const gearRows=rowsFor(gear.products,'gear_legacy_feed')
 const gearSet=new Set(gearRows.map(r=>r.variation_id).filter(Boolean))
 for(const row of rows)if(gearSet.has(row.variation_id))row.status='OVERLAP_REVIEW'
 rows=[...gearRows,...rows]
}
if(output){
 const data=[columns.join(','),...rows.map(row=>columns.map(k=>csvEscape(row[k])).join(','))].join('\n')+'\n'
 fs.writeFileSync(output,data)
}
const report={scope:gearPath?'gear-and-apparel-snapshot':'apparel-source-only',apparelItems:editions.length,apparelVariations:variations,stickerKeys:stickerKeys.length,rows:rows.length,liveSquareVerified:false}
console.log(JSON.stringify(report))
if(!check && !output)console.log('Use --feed <export.json> --output <matrix.csv> to materialize snapshot. Live Square/Printful identity remains a separate gated check.')
