<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 pb-0">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <RouterLink to="/" class="hover:text-primary-600 dark:hover:text-primary-400">Inicio</RouterLink>
        <ChevronRight class="w-4 h-4" />
        <span class="text-gray-900 dark:text-white font-medium">Catálogo Completo</span>
      </nav>

      <!-- Header -->
      <div class="max-w-6xl mx-auto mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Catálogo Completo
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Todos los recursos, ejemplos y plantillas organizados por categoría
        </p>
      </div>

      <!-- Stats -->
      <div class="max-w-6xl mx-auto mb-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="card p-6 text-center">
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ chapters.length }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Módulos</p>
          </div>
          <div class="card p-6 text-center">
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ totalFiles }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Archivos</p>
          </div>
          <div class="card p-6 text-center">
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">100+</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Ejemplos</p>
          </div>
          <div class="card p-6 text-center">
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">10</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Categorías</p>
          </div>
        </div>
      </div>

      <!-- Chapters Grid -->
      <div class="max-w-6xl mx-auto space-y-8">
        <div 
          v-for="chapter in chapters" 
          :key="chapter.id"
          class="card overflow-hidden"
        >
          <!-- Chapter Header -->
          <div 
            class="p-6 bg-linear-to-r from-primary-600 to-secondary-600 cursor-pointer"
            @click="expandedChapter = expandedChapter === chapter.id ? null : chapter.id"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <span class="text-xl font-bold text-white">{{ chapter.number }}</span>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-white">{{ chapter.title }}</h2>
                  <p class="text-sm text-white/80">{{ chapter.files.length }} archivos • {{ chapter.timeEstimate }}</p>
                </div>
              </div>
              <ChevronDown 
                class="w-6 h-6 text-white transition-transform"
                :class="{ 'rotate-180': expandedChapter === chapter.id }"
              />
            </div>
          </div>

          <!-- Chapter Content -->
          <div v-show="expandedChapter === chapter.id" class="p-6">
            <p class="text-gray-600 dark:text-gray-400 mb-6">{{ chapter.description }}</p>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                v-for="file in chapter.files"
                :key="file.id"
                :href="`/chapter/${chapter.id}/${file.id}`"
                @click.prevent="navigateToFile(chapter.id, file.id)"
                class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors cursor-pointer"
              >
                <FileText class="w-5 h-5 text-primary-600 dark:text-primary-400 shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ file.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ file.path }}</p>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-400 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronDown, ChevronRight, FileText, ArrowRight } from 'lucide-vue-next'
import { useChaptersStore } from '@/stores/chapters'

const router = useRouter()
const chaptersStore = useChaptersStore()

const expandedChapter = ref<string | null>(null)

const chapters = computed(() => chaptersStore.chapters)
const totalFiles = computed(() => chaptersStore.totalFiles)

const navigateToFile = (chapterId: string, fileId: string) => {
  router.push(`/chapter/${chapterId}/${fileId}?from=catalog`)
}
</script>
