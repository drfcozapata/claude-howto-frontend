<template>
  <aside
    :class="[
      'fixed lg:sticky top-16 left-0 z-40 h-full lg:h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-transform duration-300 scrollbar-thin',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <nav class="p-4 space-y-2 pb-20">
      <!-- Main Navigation -->
      <div class="space-y-1">
        <RouterLink 
          to="/"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': $route.path === '/' }"
        >
          <Home class="w-5 h-5" />
          <span>Inicio</span>
        </RouterLink>

        <RouterLink 
          to="/roadmap"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': $route.path === '/roadmap' }"
        >
          <Map class="w-5 h-5" />
          <span>Ruta de Aprendizaje</span>
        </RouterLink>

        <RouterLink 
          to="/catalog"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': $route.path === '/catalog' }"
        >
          <BookOpen class="w-5 h-5" />
          <span>Catálogo</span>
        </RouterLink>

        <RouterLink 
          to="/quick-reference"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': $route.path === '/quick-reference' }"
        >
          <Zap class="w-5 h-5" />
          <span>Referencia Rápida</span>
        </RouterLink>
      </div>

      <!-- Chapters Section -->
      <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 class="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Módulos
        </h3>
        <div class="space-y-1">
          <RouterLink 
            v-for="chapter in chapters"
            :key="chapter.id"
            :to="`/chapter/${chapter.id}`"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': $route.params.chapterId === chapter.id }"
          >
            <component :is="getIcon(chapter.icon)" class="w-5 h-5 shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">{{ chapter.number }}. {{ chapter.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ chapter.timeEstimate }}</p>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="px-3 mb-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Tu Progreso
            </span>
            <span class="text-xs font-medium text-primary-600 dark:text-primary-400">
              {{ progressPercentage }}%
            </span>
          </div>
          <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-linear-to-r from-primary-500 to-secondary-500 transition-all duration-500"
              :style="{ width: `${progressPercentage}%` }"
            />
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ completedCount }} archivos completados
          </p>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  Home, Map, BookOpen, Zap, 
  Command, Brain, Sparkles, Users, 
  Plug, Link, Puzzle, Clock, 
  Terminal
} from 'lucide-vue-next'
import { useChaptersStore } from '@/stores/chapters'
import { useProgressStore } from '@/stores/progress'
import { useSettingsStore } from '@/stores/settings'

const chaptersStore = useChaptersStore()
const progressStore = useProgressStore()
const settingsStore = useSettingsStore()

const chapters = computed(() => chaptersStore.chapters)
const progressPercentage = computed(() => progressStore.progressPercentage)
const completedCount = computed(() => progressStore.completedCount)
const isOpen = computed(() => settingsStore.sidebarOpen)

const iconMap: Record<string, any> = {
  command: Command,
  brain: Brain,
  sparkles: Sparkles,
  users: Users,
  plug: Plug,
  link: Link,
  puzzle: Puzzle,
  clock: Clock,
  terminal: Terminal
}

const getIcon = (iconName: string) => {
  return iconMap[iconName] || BookOpen
}
</script>
