<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
    <Header />
    
    <main class="flex-1 pb-0">
      <RouterView />
    </main>
    
    <Footer class="shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

// Initialize dark mode based on system preference
useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})
</script>

<style>
/* Global styles are in main.css */
</style>
