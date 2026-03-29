<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Herramientas
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Utilidades de análisis de código y generación de contenido
        </p>

        <!-- Tools Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- EPUB Generator -->
          <div class="card p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <BookOpen class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generador EPUB</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Genera un libro electrónico EPUB con toda la guía para leer sin conexión.
            </p>
            <button 
              @click="generateEpub"
              :disabled="isGenerating"
              class="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Download v-if="!isGenerating" class="w-5 h-5" />
              <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              {{ isGenerating ? 'Generando...' : 'Descargar EPUB' }}
            </button>
          </div>

          <!-- Code Complexity Analyzer -->
          <div class="card p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
                <Activity class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Analizador de Complejidad</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Analiza la complejidad de tu código y obtén métricas de mantenibilidad.
            </p>
            <RouterLink to="/tools/complexity" class="btn-secondary w-full flex items-center justify-center gap-2">
              <Code2 class="w-5 h-5" />
              Abrir Analizador
            </RouterLink>
          </div>

          <!-- Code Smell Detector -->
          <div class="card p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle class="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Detector de Code Smells</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Detecta problemas de calidad de código basados en el catálogo de Martin Fowler.
            </p>
            <RouterLink to="/tools/smells" class="btn-secondary w-full flex items-center justify-center gap-2">
              <Search class="w-5 h-5" />
              Abrir Detector
            </RouterLink>
          </div>

          <!-- Documentation Generator -->
          <div class="card p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <FileText class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generador de Docs</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Genera documentación API automáticamente desde tu código Python.
            </p>
            <RouterLink to="/tools/docs" class="btn-secondary w-full flex items-center justify-center gap-2">
              <Edit3 class="w-5 h-5" />
              Abrir Generador
            </RouterLink>
          </div>
        </div>

        <!-- Info Box -->
        <div class="mt-8 card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div class="flex items-start gap-4">
            <Info class="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Herramientas Python
              </h3>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                Estas herramientas utilizan los scripts de Python del repositorio. Para usarlas localmente, 
                necesitas tener Python 3.10+ instalado y ejecutar el backend API.
                Consulta el <RouterLink to="/roadmap" class="underline">README</RouterLink> para instrucciones de configuración.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  BookOpen, Activity, AlertTriangle, FileText, 
  Download, Code2, Search, Edit3, Info 
} from 'lucide-vue-next'

const isGenerating = ref(false)

const generateEpub = async () => {
  isGenerating.value = true
  
  try {
    // In production, this would call the backend API
    // For now, simulate with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Trigger download of pre-generated EPUB or show message
    alert('Para generar el EPUB, ejecuta: uv run scripts/build_epub.py')
  } catch (error) {
    console.error('Error generating EPUB:', error)
    alert('Error al generar EPUB. Asegúrate de tener el backend configurado.')
  } finally {
    isGenerating.value = false
  }
}
</script>
