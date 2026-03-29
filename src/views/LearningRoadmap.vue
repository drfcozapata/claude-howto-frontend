<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <RouterLink to="/" class="hover:text-primary-600 dark:hover:text-primary-400">Inicio</RouterLink>
        <ChevronRight class="w-4 h-4" />
        <span class="text-gray-900 dark:text-white font-medium">Ruta de Aprendizaje</span>
      </nav>

      <!-- Header -->
      <div class="max-w-4xl mx-auto mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Ruta de Aprendizaje
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Tu camino personalizado para dominar Claude Code, de principiante a usuario avanzado
        </p>
      </div>

      <!-- Progress Overview -->
      <div class="max-w-4xl mx-auto mb-12">
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Tu Progreso General</h2>
            <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ progressPercentage }}%</span>
          </div>
          <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-linear-to-r from-primary-500 to-secondary-500 transition-all duration-500"
              :style="{ width: `${progressPercentage}%` }"
            />
          </div>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ completedCount }} archivos completados de ~50 totales
          </p>
        </div>
      </div>

      <!-- Learning Levels -->
      <div class="max-w-6xl mx-auto space-y-12">
        <!-- Beginner -->
        <section>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Sprout class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Nivel Principiante</h2>
              <p class="text-gray-600 dark:text-gray-400">Comienza con lo básico y construye tus fundamentos</p>
            </div>
            <div class="ml-auto text-sm text-gray-500 dark:text-gray-400">
              ~2.5 horas
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div 
              v-for="chapter in beginnerChapters" 
              :key="chapter.id"
              class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              @click="navigateToChapter(chapter.id)"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <span class="text-lg font-bold text-primary-600 dark:text-primary-400">{{ chapter.number }}</span>
                </div>
                <Clock class="w-5 h-5 text-gray-400" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ chapter.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ chapter.description }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ chapter.timeEstimate }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ chapter.files.length }} archivos</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Intermediate -->
        <section>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Nivel Intermedio</h2>
              <p class="text-gray-600 dark:text-gray-400">Profundiza en funcionalidades avanzadas</p>
            </div>
            <div class="ml-auto text-sm text-gray-500 dark:text-gray-400">
              ~5 horas
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="chapter in intermediateChapters"
              :key="chapter.id"
              class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              @click="navigateToChapter(chapter.id)"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <span class="text-lg font-bold text-primary-600 dark:text-primary-400">{{ chapter.number }}</span>
                </div>
                <Clock class="w-5 h-5 text-gray-400" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ chapter.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ chapter.description }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ chapter.timeEstimate }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ chapter.files.length }} archivos</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Advanced -->
        <section>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Rocket class="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Nivel Avanzado</h2>
              <p class="text-gray-600 dark:text-gray-400">Domina funcionalidades complejas y construcción de plugins</p>
            </div>
            <div class="ml-auto text-sm text-gray-500 dark:text-gray-400">
              ~5 horas
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="chapter in advancedChapters"
              :key="chapter.id"
              class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              @click="navigateToChapter(chapter.id)"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <span class="text-lg font-bold text-primary-600 dark:text-primary-400">{{ chapter.number }}</span>
                </div>
                <Clock class="w-5 h-5 text-gray-400" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ chapter.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ chapter.description }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ chapter.timeEstimate }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ chapter.files.length }} archivos</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Sprout, TrendingUp, Rocket, Clock, ChevronRight } from 'lucide-vue-next'
import { useChaptersStore } from '@/stores/chapters'
import { useProgressStore } from '@/stores/progress'

const router = useRouter()
const chaptersStore = useChaptersStore()
const progressStore = useProgressStore()

const navigateToChapter = (chapterId: string) => {
  router.push(`/chapter/${chapterId}?from=roadmap`)
}

const beginnerChapters = computed(() => 
  chaptersStore.getChaptersByLevel('beginner')
)

const intermediateChapters = computed(() => 
  chaptersStore.getChaptersByLevel('intermediate')
)

const advancedChapters = computed(() => 
  chaptersStore.getChaptersByLevel('advanced')
)

const progressPercentage = computed(() => progressStore.progressPercentage)
const completedCount = computed(() => progressStore.completedCount)
</script>
