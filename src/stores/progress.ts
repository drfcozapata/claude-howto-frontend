import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export const useProgressStore = defineStore('progress', () => {
  // Use localStorage to persist progress
  const completedFiles = useStorage<string[]>('claude-howto-completed', [])
  const currentChapter = useStorage<string | null>('claude-howto-current', null)
  const notes = useStorage<Record<string, string>>('claude-howto-notes', {})

  const markAsCompleted = (fileId: string) => {
    if (!completedFiles.value.includes(fileId)) {
      completedFiles.value.push(fileId)
    }
  }

  const markAsIncomplete = (fileId: string) => {
    completedFiles.value = completedFiles.value.filter((id: string) => id !== fileId)
  }

  const isCompleted = (fileId: string) => {
    return completedFiles.value.includes(fileId)
  }

  const toggleCompletion = (fileId: string) => {
    if (isCompleted(fileId)) {
      markAsIncomplete(fileId)
    } else {
      markAsCompleted(fileId)
    }
  }

  const addNote = (fileId: string, note: string) => {
    notes.value[fileId] = note
  }

  const getNote = (fileId: string) => {
    return notes.value[fileId] || ''
  }

  const setCurrentChapter = (chapterId: string | null) => {
    currentChapter.value = chapterId
  }

  const progressPercentage = computed(() => {
    // Total estimated files across all chapters (approximate)
    const totalFiles = 50 // Approximate total from the guide
    return Math.round((completedFiles.value.length / totalFiles) * 100)
  })

  const completedCount = computed(() => {
    return completedFiles.value.length
  })

  const resetProgress = () => {
    completedFiles.value = []
    currentChapter.value = null
    notes.value = {}
  }

  return {
    completedFiles,
    currentChapter,
    notes,
    markAsCompleted,
    markAsIncomplete,
    isCompleted,
    toggleCompletion,
    addNote,
    getNote,
    setCurrentChapter,
    progressPercentage,
    completedCount,
    resetProgress
  }
})
