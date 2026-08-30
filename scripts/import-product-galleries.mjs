import { createHash } from 'node:crypto'
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const defaultSource = path.resolve(repoRoot, '..', 'aerovista-store', 'store', 'products')
const sourceRoot = path.resolve(process.env.AEROVISTA_STORE_PRODUCTS || defaultSource)
const targetRoot = path.resolve(repoRoot, 'public', 'products')

const sha256 = async (filePath) => createHash('sha256').update(await readFile(filePath)).digest('hex')

const sourceEntries = await readdir(sourceRoot, { withFileTypes: true })
const productIds = sourceEntries
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .map((entry) => entry.name)
  .sort()

let imageCount = 0
let manifestCount = 0

for (const productId of productIds) {
  const sourceDir = path.join(sourceRoot, productId)
  const targetDir = path.join(targetRoot, productId)
  const manifestPath = path.join(sourceDir, 'manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

  if (manifest.productId !== productId) {
    throw new Error(`Manifest productId mismatch: ${productId} != ${manifest.productId}`)
  }

  await mkdir(targetDir, { recursive: true })
  for (const image of manifest.images || []) {
    const fileName = path.basename(String(image.file || ''))
    if (!fileName || fileName !== image.file || !fileName.endsWith('.webp')) {
      throw new Error(`Unsafe or unsupported gallery filename in ${productId}: ${image.file}`)
    }

    const sourceImage = path.join(sourceDir, fileName)
    const targetImage = path.join(targetDir, fileName)
    await copyFile(sourceImage, targetImage)

    const actualHash = await sha256(targetImage)
    if (image.outputSha256 && actualHash !== image.outputSha256) {
      throw new Error(`Hash mismatch after copy: ${productId}/${fileName}`)
    }
    imageCount += 1
  }

  const migratedManifest = {
    ...manifest,
    hero: String(manifest.hero || '').replace(/^\/store\/products\//, '/products/'),
    sourceRepository: 'aerovista-us/store',
    originalArchivesPreservedAt: 'aerovista-us/store:store/products/_completed/',
  }
  await writeFile(
    path.join(targetDir, 'manifest.json'),
    `${JSON.stringify(migratedManifest, null, 2)}\n`,
    'utf8',
  )
  manifestCount += 1
}

console.log(`[product-galleries] ${manifestCount} manifests and ${imageCount} verified WebPs copied`)
console.log(`[product-galleries] ${sourceRoot} -> ${targetRoot}`)
