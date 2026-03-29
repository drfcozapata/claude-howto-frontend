import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contentDir = path.join(__dirname, '../src/content')

// Find all markdown files
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)
    
    if (stat.isDirectory()) {
      if (['node_modules', '.git', '.qwen'].includes(item)) {
        continue
      }
      findMarkdownFiles(itemPath, files)
    } else if (item.endsWith('.md')) {
      files.push(itemPath)
    }
  }
  
  return files
}

// Replace picture tag with single img tag
function updateMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const originalContent = content
  
  // Replace picture tags with logo images
  // Pattern 1: <picture>...<img...>...</picture>
  const picturePattern = /<picture>[\s\S]*?<img[^>]*?src=["']([^"']*?)["'][^>]*?>([\s\S]*?)<\/picture>/gi
  
  content = content.replace(picturePattern, (match, imgSrc) => {
    // Extract just the filename from the path
    const filename = imgSrc.split('/').pop()
    // Return single img tag with logo path
    return `<img src="/resources/logos/${filename}" alt="Claude How To" class="logo-image" width="200" height="auto">`
  })
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`Updated: ${filePath}`)
    return true
  }
  
  return false
}

// Main
console.log('Updating markdown files to use single logo...')
const files = findMarkdownFiles(contentDir)
let updatedCount = 0

for (const file of files) {
  if (updateMarkdownFile(file)) {
    updatedCount++
  }
}

console.log(`\nUpdated ${updatedCount} files with single logo`)

// Also rebuild the content index
console.log('\nRebuilding content index...')
const { execSync } = await import('child_process')
execSync('node scripts/build-content-index.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' })
