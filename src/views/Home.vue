<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-linear-to-br from-primary-600 via-primary-700 to-secondary-700 text-white">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div class="container mx-auto px-4 py-20 relative">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-10">
            <Sparkles class="w-4 h-4" />
            <span class="text-sm font-medium">Actualizado para Claude Code 2.1.86</span>
          </div>
          
          <img src="/resources/logos/logo.svg" alt="Domina Claude Code" class="mx-auto mb-10 " />
          <!-- <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Domina Claude Code en un Fin de Semana
          </h1> -->
          
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Pasa de escribir <code class="px-2 py-1 bg-white/20 rounded">claude</code> a orquestar agentes, hooks, skills y servidores MCP con tutoriales visuales y plantillas listas para usar.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/roadmap" class="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg">
              <Play class="w-5 h-5" />
              Comenzar Ruta de Aprendizaje
            </RouterLink>
            <RouterLink to="/catalog" class="px-8 py-4 text-lg rounded-xl border-2 border-white/30 hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              <BookOpen class="w-5 h-5" />
              Explorar Catálogo
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Qué Obtienes?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Una guía estructurada y visual que te enseña a usar cada funcionalidad de Claude Code
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="card p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <component :is="feature.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Path Preview -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ruta de Aprendizaje
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            10 módulos progresivos de principiante a avanzado
          </p>
        </div>

        <div class="max-w-4xl mx-auto space-y-4">
          <div 
            v-for="chapter in featuredChapters" 
            :key="chapter.id"
            class="card p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="$router.push(`/chapter/${chapter.id}`)"
          >
            <div class="flex items-center gap-4">
              <div class="shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <span class="text-lg font-bold text-primary-600 dark:text-primary-400">{{ chapter.number }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {{ chapter.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {{ chapter.description }}
                </p>
              </div>
              <div class="shrink-0 flex items-center gap-3">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  chapter.level === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  chapter.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                ]">
                  {{ levelLabel(chapter.level) }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {{ chapter.timeEstimate }}
                </span>
                <ArrowRight class="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <RouterLink to="/roadmap" class="btn-primary inline-flex items-center gap-2">
            Ver Ruta Completa
            <ArrowRight class="w-5 h-5" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-linear-to-br from-primary-600 to-secondary-700 text-white">
            
      <!-- Stats -->
      <div class="container mx-auto px-4 pb-12">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div class="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <p class="text-3xl font-bold">10</p>
            <p class="text-sm text-primary-200">Módulos</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <p class="text-3xl font-bold">100+</p>
            <p class="text-sm text-primary-200">Archivos</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <p class="text-3xl font-bold">11-13h</p>
            <p class="text-sm text-primary-200">Duración Total</p>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-6">
          ¿Listo para Comenzar?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Ya tienes Claude Code instalado. Lo único entre tú y una productividad 10x es saber cómo usarlo.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/roadmap" class="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center gap-2">
            <Play class="w-5 h-5" />
            Comenzar Ahora
          </RouterLink>
          <!-- <RouterLink to="/tools" class="px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
            <Wrench class="w-5 h-5" />
            Ver Herramientas
          </RouterLink> -->
        </div>
      </div>
    </section>

    <footer class="py-6 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <p class="text-xs dark:text-slate-100">Todos los derechos reservados &copy; 2026 by <a href="https://franciscozapata.dev" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">Francisco Zapata</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  Sparkles, BookOpen, Play, ArrowRight,
  FileText, Users, Clock, 
  Shield, Code2, Puzzle
} from 'lucide-vue-next'
import { useChaptersStore } from '@/stores/chapters'

const chaptersStore = useChaptersStore()

const features = [
  {
    icon: FileText,
    title: '10 Módulos de Tutorial',
    description: 'Cubre cada funcionalidad de Claude Code desde slash commands hasta equipos de agentes personalizados'
  },
  {
    icon: Code2,
    title: 'Configuraciones Copia-Pega',
    description: 'Slash commands, plantillas CLAUDE.md, scripts de hook, configuraciones MCP y más'
  },
  {
    icon: Users,
    title: 'Diagramas Mermaid',
    description: 'Entiende cómo funciona cada funcionalidad internamente, no solo cómo usarla'
  },
  {
    icon: Clock,
    title: 'Ruta Guiada',
    description: 'De principiante a usuario avanzado en 11-13 horas con estimaciones de tiempo claras'
  },
  {
    icon: Shield,
    title: 'Autoevaluación',
    description: 'Cuestionarios interactivos para identificar brechas y construir tu ruta personalizada'
  },
  {
    icon: Puzzle,
    title: 'Plantillas Reales',
    description: 'Ejemplos del mundo real que puedes copiar directamente a tu proyecto hoy'
  }
]

const featuredChapters = computed(() => {
  return chaptersStore.chapters.slice(0, 5)
})

const levelLabel = (level: string) => {
  const labels = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  }
  return labels[level as keyof typeof labels]
}
</script>
