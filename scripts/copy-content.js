import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const sourceDir = path.join(__dirname, '../../claude-howto')
const destDir = path.join(__dirname, '../src/content')

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Function to copy markdown files
function copyMarkdownFiles(source, dest, relativePath = '') {
  const items = fs.readdirSync(source)
  
  for (const item of items) {
    const sourcePath = path.join(source, item)
    const destPath = path.join(dest, relativePath, item)
    const stat = fs.statSync(sourcePath)
    
    if (stat.isDirectory()) {
      // Skip node_modules, .git, and other non-content directories
      if (['node_modules', '.git', '.qwen'].includes(item)) {
        continue
      }
      
      // Create subdirectory in destination
      const newRelativePath = path.join(relativePath, item)
      if (!fs.existsSync(path.join(dest, newRelativePath))) {
        fs.mkdirSync(path.join(dest, newRelativePath), { recursive: true })
      }
      
      copyMarkdownFiles(sourcePath, dest, newRelativePath)
    } else if (item.endsWith('.md')) {
      // Copy markdown file
      fs.copyFileSync(sourcePath, destPath)
      console.log(`Copied: ${path.join(relativePath, item)}`)
    }
  }
}

console.log('Copying Markdown files from claude-howto to frontend...')
copyMarkdownFiles(sourceDir, destDir)
console.log('Done!')
