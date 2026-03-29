import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const contentDir = path.join(__dirname, '../src/content')
const destDir = path.join(__dirname, '../public')
const destFile = path.join(destDir, 'content-index.json')

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Build content index
const contentIndex = {}

function buildIndex(dir, relativePath = '') {
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const itemPath = path.join(dir, item)
    const relativeItemPath = path.join(relativePath, item)
    const stat = fs.statSync(itemPath)
    
    if (stat.isDirectory()) {
      // Skip node_modules and other non-content directories
      if (['node_modules', '.git', '.qwen'].includes(item)) {
        continue
      }
      buildIndex(itemPath, relativeItemPath)
    } else if (item.endsWith('.md')) {
      // Read markdown file and add to index
      const content = fs.readFileSync(itemPath, 'utf-8')
      // Use relative path as key (normalized to forward slashes)
      const key = relativeItemPath.replace(/\\/g, '/')
      contentIndex[key] = content
      console.log(`Indexed: ${key}`)
    }
  }
}

console.log('Building content index...')
buildIndex(contentDir)

// Write index to public directory
fs.writeFileSync(destFile, JSON.stringify(contentIndex, null, 2))

console.log(`\nContent index built with ${Object.keys(contentIndex).length} files`)
console.log(`Output: ${destFile}`)
console.log(`Total size: ${(fs.statSync(destFile).size / 1024 / 1024).toFixed(2)} MB`)
