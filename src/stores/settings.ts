import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  const fontSize = useStorage<'sm' | 'base' | 'lg' | 'xl'>('claude-howto-fontsize', 'base')
  const sidebarOpen = ref(true)
  const showTableOfContents = useStorage<boolean>('claude-howto-toc', true)

  const setFontSize = (size: 'sm' | 'base' | 'lg' | 'xl') => {
    fontSize.value = size
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const toggleTableOfContents = () => {
    showTableOfContents.value = !showTableOfContents.value
  }

  return {
    fontSize,
    sidebarOpen,
    showTableOfContents,
    setFontSize,
    toggleSidebar,
    toggleTableOfContents
  }
})
