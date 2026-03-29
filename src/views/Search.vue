<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 pb-0">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Búsqueda
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Busca en toda la documentación
        </p>

        <!-- Search Input -->
        <div class="card p-6 mb-8">
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Escribe para buscar..."
              class="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              ref="searchInput"
            />
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="hasSearched">
          <!-- Loading -->
          <div v-if="isSearching" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Buscando...</p>
          </div>

          <!-- No Results -->
          <div v-else-if="!hasResults" class="text-center py-12">
            <SearchX class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron resultados
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Intenta con diferentes términos de búsqueda
            </p>
          </div>

          <!-- Results -->
          <div v-else class="space-y-4">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ results.length }} resultado{{ results.length !== 1 ? 's' : '' }} encontrado{{ results.length !== 1 ? 's' : '' }}
              </p>
            </div>

            <div
              v-for="result in results"
              :key="result.file"
              class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              @click="navigateToResult(result)"
            >
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ result.title }}
                </h3>
                <FileText class="w-5 h-5 text-gray-400 shrink-0 ml-4" />
              </div>
              <p class="text-sm text-primary-600 dark:text-primary-400 mb-2">
                {{ result.chapter }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ result.content || 'Contenido disponible en el capítulo' }}
              </p>
              <div class="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                  Score: {{ Math.round((1 - result.score) * 100) }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Initial State -->
        <div v-else class="text-center py-12">
          <Search class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p class="text-gray-600 dark:text-gray-400">
            Comienza a escribir para buscar en toda la documentación
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, SearchX, FileText } from 'lucide-vue-next'
import { useSearch } from '@/composables/useSearch'

const router = useRouter()
const route = useRoute()

const { searchQuery, isSearching, results, search, hasResults, initializeSearch } = useSearch()

const hasSearched = ref(false)

// Initialize search on mount
onMounted(() => {
  initializeSearch()
  
  // Check for query param on load
  if (route.query.q) {
    searchQuery.value = route.query.q as string
    handleSearch()
  }
})

const handleSearch = () => {
  hasSearched.value = true
  search(searchQuery.value)
}

const navigateToResult = (result: any) => {
  // Extract chapter ID and file ID from path
  const parts = result.file.split('/')
  const chapterId = parts[0]
  const fileId = parts[parts.length - 1].replace('.md', '')
  
  router.push(`/chapter/${chapterId}/${fileId}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
