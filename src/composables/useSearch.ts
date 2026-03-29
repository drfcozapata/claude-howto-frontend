import { ref } from 'vue'
import Fuse from 'fuse.js'

export interface SearchResult {
  file: string
  chapter: string
  title: string
  content: string
  score: number
  matches: readonly any[]
}

export function useSearch() {
  const searchQuery = ref('')
  const isSearching = ref(false)
  const results = ref<SearchResult[]>([])
  let fuse: Fuse<SearchResult> | null = null

  // Initialize Fuse with sample data
  const initializeSearch = () => {
    // Sample documents - in production this would come from loaded content
    const documents: SearchResult[] = [
      { file: '01-slash-commands', chapter: 'Slash Commands', title: 'Introducción', content: '', score: 0, matches: [] },
      { file: '02-memory', chapter: 'Memory', title: 'Introducción', content: '', score: 0, matches: [] },
      { file: '03-skills', chapter: 'Skills', title: 'Introducción', content: '', score: 0, matches: [] },
    ]

    fuse = new Fuse(documents, {
      keys: ['title', 'chapter', 'content'],
      threshold: 0.3,
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: 2
    })
  }

  const search = (query: string) => {
    if (!query || query.length < 2) {
      results.value = []
      return
    }

    isSearching.value = true

    if (fuse) {
      const searchResults = fuse.search(query)
      results.value = searchResults.map(result => ({
        ...result.item,
        score: result.score || 0,
        matches: result.matches || []
      }))
    }

    isSearching.value = false
  }

  const clearSearch = () => {
    searchQuery.value = ''
    results.value = []
  }

  const hasResults = () => results.value.length > 0

  const resultCount = () => results.value.length

  return {
    searchQuery,
    isSearching,
    results,
    search,
    clearSearch,
    hasResults,
    resultCount,
    initializeSearch
  }
}
