<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 pb-0">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <RouterLink to="/" class="hover:text-primary-600 dark:hover:text-primary-400">Inicio</RouterLink>
        <ChevronRight class="w-4 h-4" />
        <RouterLink :to="breadcrumbParent.path" class="hover:text-primary-600 dark:hover:text-primary-400">{{ breadcrumbParent.name }}</RouterLink>
        <ChevronRight class="w-4 h-4" />
        <span class="text-gray-900 dark:text-white font-medium">{{ chapter?.title }}</span>
      </nav>

      <!-- Chapter Header -->
      <div class="card p-8 mb-8">
        <div class="flex items-start justify-between mb-4">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                Módulo {{ chapter?.number }}
              </span>
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                chapter?.level === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                chapter?.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              ]">
                {{ levelLabel(chapter?.level || 'beginner') }}
              </span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ chapter?.title }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {{ chapter?.description }}
            </p>
          </div>
          <div class="text-right">
            <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
              <Clock class="w-5 h-5" />
              <span>{{ chapter?.timeEstimate }}</span>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ chapter?.files.length }} archivos
            </div>
          </div>
        </div>

        <!-- Progress for this chapter -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso del módulo</span>
            <span class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ chapterProgress }}%</span>
          </div>
          <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-linear-to-r from-primary-500 to-secondary-500 transition-all duration-500"
              :style="{ width: `${chapterProgress}%` }"
            />
          </div>
        </div>
      </div>

      <!-- Content Area - Two Column Layout -->
      <div class="grid lg:grid-cols-12 gap-8">
        <!-- Files List (Left Sidebar) -->
        <div class="lg:col-span-4 xl:col-span-3">
          <div class="card sticky top-24 overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h2 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <List class="w-5 h-5" />
                Contenido
              </h2>
            </div>
            <div class="p-2 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin">
              <button
                v-for="file in chapter?.files"
                :key="file.id"
                @click="selectFile(file.id)"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                :class="{ 
                  'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': selectedFile === file.id,
                  'text-gray-700 dark:text-gray-300': selectedFile !== file.id
                }"
              >
                <FileText class="w-4 h-4 shrink-0" />
                <span class="text-sm flex-1 truncate">{{ file.title }}</span>
                <CheckCircle v-if="isFileCompleted(file.id)" class="w-4 h-4 text-green-500 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content (Right Panel) -->
        <div class="lg:col-span-8 xl:col-span-9">
          <div class="card min-h-150">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center py-24">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-24">
              <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error al cargar</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ error }}</p>
            </div>

            <!-- No File Selected -->
            <div v-else-if="!selectedFile" class="text-center py-24">
              <BookOpen class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Selecciona un archivo</h3>
              <p class="text-gray-600 dark:text-gray-400">Haz clic en cualquier archivo de la lista para ver su contenido</p>
            </div>

            <!-- Content -->
            <div v-else class="h-full">
              <!-- File Header -->
              <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 px-6 pt-6">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentFileTitle }}</h2>
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
                class="markdown-content prose dark:prose-invert max-w-none px-6 pb-6 overflow-y-auto"
                style="max-height: calc(100vh - 400px);"
                v-html="renderedContent"
              ></div>

              <!-- Navigation Footer -->
              <div class="flex justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 px-6 pb-6">
                <button
                  v-if="prevFile"
                  @click="selectFile(prevFile.id)"
                  class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <ArrowLeft class="w-5 h-5" />
                  <span>{{ prevFile.title }}</span>
                </button>
                <div v-else></div>
                <button
                  v-if="nextFile"
                  @click="selectFile(nextFile.id)"
                  class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <span>{{ nextFile.title }}</span>
                  <ArrowRight class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ChevronRight, Clock, FileText, CheckCircle, 
  AlertCircle, ArrowLeft, ArrowRight, BookOpen,
  List
} from 'lucide-vue-next'
import { useChaptersStore } from '@/stores/chapters'
import { useProgressStore } from '@/stores/progress'
import { parseMarkdown, renderMermaidDiagrams } from '@/utils/markdown-parser'
import { useContentLoader } from '@/composables/useContentLoader'

const route = useRoute()
const router = useRouter()
const chaptersStore = useChaptersStore()
const progressStore = useProgressStore()
const { getContent } = useContentLoader()

const loading = ref(false)
const error = ref<string | null>(null)
const content = ref('')
const renderedContent = ref('')
const selectedFile = ref<string | null>(null)

// Track previous route using query parameter
const getPreviousRoute = () => {
  const from = route.query.from
  
  if (from === 'catalog') {
    return { name: 'Catálogo Completo', path: '/catalog' }
  }
  // Default to Learning Roadmap
  return { name: 'Ruta de Aprendizaje', path: '/roadmap' }
}

const chapterId = computed(() => route.params.chapterId as string)

const chapter = computed(() => chaptersStore.getChapterById(chapterId.value))

// Determine breadcrumb based on previous route
const breadcrumbParent = computed(() => {
  return getPreviousRoute()
})

const chapterProgress = computed(() => {
  if (!chapter.value) return 0
  const completedInChapter = chapter.value.files.filter((f: any) => 
    progressStore.isCompleted(f.id)
  ).length
  return Math.round((completedInChapter / chapter.value.files.length) * 100)
})

const currentFileTitle = computed(() => {
  if (!selectedFile.value || !chapter.value) return ''
  const file = chapter.value.files.find(f => f.id === selectedFile.value)
  return file?.title || ''
})

const isCompleted = computed(() => 
  selectedFile.value ? progressStore.isCompleted(selectedFile.value) : false
)

const currentIndex = computed(() => {
  if (!chapter.value || !selectedFile.value) return -1
  return chapter.value.files.findIndex((f: any) => f.id === selectedFile.value)
})

const prevFile = computed(() => {
  if (!chapter.value || currentIndex.value <= 0) return null
  return chapter.value.files[currentIndex.value - 1]
})

const nextFile = computed(() => {
  if (!chapter.value || currentIndex.value >= chapter.value.files.length - 1) return null
  return chapter.value.files[currentIndex.value + 1]
})

const isFileCompleted = (fileId: string) => progressStore.isCompleted(fileId)

const selectFile = (fileId: string) => {
  selectedFile.value = fileId
  // Update URL without navigating away, preserving 'from' parameter
  router.replace({ 
    params: { ...route.params, fileId },
    query: route.query
  })
  loadContent()
}

const loadContent = async () => {
  if (!selectedFile.value || !chapter.value) {
    return
  }

  const file = chapter.value.files.find(f => f.id === selectedFile.value)
  if (!file) {
    error.value = 'Archivo no encontrado'
    return
  }

  loading.value = true
  error.value = null

  try {
    content.value = await getContent(file.path)
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
  if (selectedFile.value) {
    progressStore.toggleCompletion(selectedFile.value)
  }
}

const levelLabel = (level: string) => {
  const labels: Record<string, string> = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  }
  return labels[level]
}

// Watch for route changes
watch(
  () => route.params.chapterId,
  (newChapterId) => {
    // When chapter changes, select first file if no file is selected
    if (newChapterId && chapter.value?.files.length && !selectedFile.value) {
      const firstFile = chapter.value.files[0].id
      selectedFile.value = firstFile
      // Update URL
      router.replace({ 
        params: { ...route.params, fileId: firstFile },
        query: route.query
      })
      loadContent()
    }
  },
  { immediate: true }
)

watch(
  () => route.params.fileId,
  (fileId) => {
    if (fileId) {
      selectedFile.value = fileId as string
      loadContent()
    }
  }
)

// Select first file on mount if no file is selected
onMounted(() => {
  if (!selectedFile.value && chapter.value?.files.length) {
    // Check if there's a fileId in the route
    if (route.params.fileId) {
      selectedFile.value = route.params.fileId as string
      loadContent()
    } else {
      // No fileId in route, select first file
      const firstFile = chapter.value.files[0].id
      selectedFile.value = firstFile
      router.replace({ 
        params: { ...route.params, fileId: firstFile },
        query: route.query
      })
      loadContent()
    }
  }
})
</script>
