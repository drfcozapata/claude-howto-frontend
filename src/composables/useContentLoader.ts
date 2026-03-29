import { ref } from 'vue'

export interface ContentIndex {
  [key: string]: string
}

let contentCache: ContentIndex | null = null
let loadPromise: Promise<ContentIndex> | null = null

export function useContentLoader() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadIndex = async (): Promise<ContentIndex> => {
    if (contentCache) {
      return contentCache
    }

    if (loadPromise) {
      return loadPromise
    }

    isLoading.value = true
    error.value = null

    loadPromise = (async (): Promise<ContentIndex> => {
      try {
        const response = await fetch('/content-index.json')
        if (!response.ok) {
          throw new Error('Failed to load content index')
        }
        const data = await response.json()
        contentCache = data as ContentIndex
        return data as ContentIndex
      } catch (e) {
        error.value = 'Error al cargar el índice de contenido'
        console.error('Error loading content index:', e)
        throw e
      } finally {
        isLoading.value = false
      }
    })()

    return loadPromise
  }

  const getContent = async (path: string): Promise<string> => {
    const index = await loadIndex()
    
    // Try different case variations
    const variations = [
      path,
      path.toLowerCase(),
      path.toUpperCase(),
      path.replace(/\.md$/i, '.md'),
      path.replace(/readme/i, 'README'),
    ]

    for (const variation of variations) {
      if (index[variation]) {
        return index[variation]
      }
    }

    // If not found, try to find a case-insensitive match
    const lowerPath = path.toLowerCase()
    for (const [key, value] of Object.entries(index)) {
      if (key.toLowerCase() === lowerPath) {
        return value
      }
    }

    throw new Error(`Content not found: ${path}`)
  }

  return {
    isLoading,
    error,
    loadIndex,
    getContent
  }
}
