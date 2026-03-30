<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Left: Logo & Menu Toggle -->
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="flex items-center gap-3 group">
          <img src="/resources/logos/logo.svg" alt="Domina Claude Code" class="w-36" />
        </RouterLink>
      </div>

      <!-- Center: Search -->
      <div class="flex-1 max-w-xl mx-4 hidden md:block">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Buscar en la documentación... (Ctrl+K)"
            class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <kbd class="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 rounded">
            Ctrl+K
          </kbd>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2">
        <!-- Mobile Search Toggle -->
        <button
          @click="$router.push('/search')"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Search"
        >
          <Search class="w-5 h-5" />
        </button>

        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDark()"
          class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          <Sun v-if="isDark" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
        </button>

        <!-- GitHub Link -->
        <a
          href="https://github.com/drfcozapata/domina-claude-code"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="GitHub"
        >
          <Github class="w-5 h-5" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import {
  Search, Sun, Moon, Github
} from 'lucide-vue-next'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const settingsStore = useSettingsStore()

// Dark mode setup
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'theme-preference',
  initialValue: 'dark'
})

const toggleDark = useToggle(isDark)

const searchQuery = ref('')
const isSidebarOpen = ref(settingsStore.sidebarOpen)

// Sync with settings store
watch(() => settingsStore.sidebarOpen, (val) => {
  isSidebarOpen.value = val
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

// Ctrl+K to focus search
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
      searchInput?.focus()
    }
  })
}
</script>
