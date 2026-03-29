<template>
  <div class="card p-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error al cargar</h3>
      <p class="text-gray-600 dark:text-gray-400">{{ error }}</p>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- File Header -->
      <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ file?.title }}</h2>
        <div class="flex items-center gap-2">
          <button
            @click="toggleComplete"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              isCompleted 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            ]"
          >
            {{ isCompleted ? '✓ Completado' : 'Marcar como completado' }}
          </button>
        </div>
      </div>

      <!-- Markdown Content -->
      <div 
        class="markdown-content prose dark:prose-invert max-w-none"
        v-html="renderedContent"
      ></div>

      <!-- Navigation -->
      <div class="flex justify-between mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <RouterLink
          v-if="prevFile"
          :to="`/chapter/${chapterId}/${prevFile.id}`"
          class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
        >
          <ArrowLeft class="w-5 h-5" />
          <span>{{ prevFile.title }}</span>
        </RouterLink>
        <div v-else></div>
        <RouterLink
          v-if="nextFile"
          :to="`/chapter/${chapterId}/${nextFile.id}`"
          class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
        >
          <span>{{ nextFile.title }}</span>
          <ArrowRight class="w-5 h-5" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AlertCircle, ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { useChaptersStore } from '@/stores/chapters'
import { useProgressStore } from '@/stores/progress'
import { parseMarkdown, renderMermaidDiagrams } from '@/utils/markdown-parser'
import { useContentLoader } from '@/composables/useContentLoader'

const route = useRoute()
const chaptersStore = useChaptersStore()
const progressStore = useProgressStore()
const { getContent } = useContentLoader()

const loading = ref(true)
const error = ref<string | null>(null)
const content = ref('')
const renderedContent = ref('')

const chapterId = computed(() => route.params.chapterId as string)
const fileId = computed(() => route.params.fileId as string)

const chapter = computed(() => chaptersStore.getChapterById(chapterId.value))
const file = computed(() => {
  if (!chapter.value) return null
  return chapter.value.files.find((f: any) => f.id === fileId.value)
})

const isCompleted = computed(() => file.value ? progressStore.isCompleted(file.value.id) : false)

const currentIndex = computed(() => {
  if (!chapter.value) return -1
  return chapter.value.files.findIndex((f: any) => f.id === fileId.value)
})

const prevFile = computed(() => {
  if (!chapter.value || currentIndex.value <= 0) return null
  return chapter.value.files[currentIndex.value - 1]
})

const nextFile = computed(() => {
  if (!chapter.value || currentIndex.value >= chapter.value.files.length - 1) return null
  return chapter.value.files[currentIndex.value + 1]
})

const loadContent = async () => {
  if (!file.value) {
    error.value = 'Archivo no encontrado'
    loading.value = false
    return
  }

  loading.value = true
  error.value = null

  try {
    // Load content from the index
    content.value = await getContent(file.value.path)
    renderedContent.value = parseMarkdown(content.value)
    
    // Render mermaid diagrams after content is loaded
    setTimeout(() => {
      renderMermaidDiagrams()
    }, 100)
  } catch (e: any) {
    console.error('Error loading content:', e)
    error.value = `Error al cargar el contenido: ${e.message}`
  } finally {
    loading.value = false
  }
}

const toggleComplete = () => {
  if (file.value) {
    progressStore.toggleCompletion(file.value.id)
  }
}

watch([() => route.params.chapterId, () => route.params.fileId], loadContent, { immediate: true })
onMounted(loadContent)
</script>
