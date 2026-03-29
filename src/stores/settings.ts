import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  const fontSize = useStorage<'sm' | 'base' | 'lg' | 'xl'>('domina-claude-code-fontsize', 'base')
  const sidebarOpen = ref(true)
  const showTableOfContents = useStorage<boolean>('domina-claude-code-toc', true)

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
