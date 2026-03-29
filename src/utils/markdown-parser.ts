import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import mermaid from 'mermaid'

// Initialize MarkdownIt with options
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

// Fix relative image paths to point to /resources/ and set max width
const defaultImageRenderer = md.renderer.rules.image
md.renderer.rules.image = function(tokens, idx, options, env, self) {
  const token = tokens[idx]
  const srcIndex = token.attrIndex('src')
  
  if (srcIndex >= 0 && token.attrs) {
    let src = token.attrs[srcIndex][1]
    
    // Fix relative paths that go up directories
    if (src.startsWith('../')) {
      // Remove all ../ prefixes and prepend /resources/
      const cleanPath = src.replace(/^(\.\.\/)+/, '')
      src = `/resources/${cleanPath}`
      token.attrs[srcIndex][1] = src
      
      // Add width and height attributes for logos
      if (src.includes('logo')) {
        // Add width attribute
        const widthIndex = token.attrIndex('width')
        if (widthIndex < 0) {
          token.attrPush(['width', '200'])
        }
        // Add height attribute (auto)
        const heightIndex = token.attrIndex('height')
        if (heightIndex < 0) {
          token.attrPush(['height', 'auto'])
        }
        // Add class for styling
        const classIndex = token.attrIndex('class')
        if (classIndex >= 0) {
          token.attrs[classIndex][1] += ' logo-image'
        } else {
          token.attrPush(['class', 'logo-image'])
        }
      }
    } else if (src.startsWith('./')) {
      const cleanPath = src.replace(/^\.\//, '')
      src = `/resources/${cleanPath}`
      token.attrs[srcIndex][1] = src
    }
  }
  
  return defaultImageRenderer!(tokens, idx, options, env, self)
}

// Custom renderer for mermaid diagrams
const defaultFenceRenderer = md.renderer.rules.fence
md.renderer.rules.fence = function(tokens: any[], idx: number, options: any, env: any, self: any) {
  const token = tokens[idx]
  if (token.info === 'mermaid') {
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    return `<div class="mermaid" id="${id}">${token.content}</div>`
  }
  return defaultFenceRenderer!(tokens, idx, options, env, self)
}

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
})

export async function renderMermaidDiagrams(container?: HTMLElement) {
  const elements = container 
    ? container.querySelectorAll('.mermaid')
    : document.querySelectorAll('.mermaid')
  
  if (elements.length === 0) return

  try {
    await mermaid.run({
      nodes: Array.from(elements) as HTMLElement[]
    })
  } catch (error) {
    console.error('Error rendering mermaid diagrams:', error)
  }
}

export function parseMarkdown(content: string): string {
  // Remove YAML frontmatter (everything between --- at the start)
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '')
  
  // Remove any remaining standalone '---' lines that might be frontmatter remnants
  const cleanedContent = contentWithoutFrontmatter.replace(/^\s*---\s*$/gm, '')
  
  return md.render(cleanedContent)
}

export default md
