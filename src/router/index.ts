import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Inicio', description: 'Domina Claude Code en un fin de semana' }
  },
  {
    path: '/roadmap',
    name: 'roadmap',
    component: () => import('@/views/LearningRoadmap.vue'),
    meta: { title: 'Ruta de Aprendizaje', description: 'Tu camino para dominar Claude Code' }
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@/views/Catalog.vue'),
    meta: { title: 'Catálogo', description: 'Todos los recursos y ejemplos' }
  },
  {
    path: '/quick-reference',
    name: 'quick-reference',
    component: () => import('@/views/QuickReference.vue'),
    meta: { title: 'Referencia Rápida', description: 'Comandos y atajos esenciales' }
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/Tools.vue'),
    meta: { title: 'Herramientas', description: 'Analizador de código y generador EPUB' }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    meta: { title: 'Búsqueda', description: 'Busca en toda la documentación' }
  },
  {
    path: '/chapter/:chapterId',
    name: 'chapter',
    component: () => import('@/views/Chapter.vue'),
    meta: { title: 'Capítulo', description: 'Documentación detallada' }
  },
  {
    path: '/chapter/:chapterId/:fileId',
    name: 'chapter-file',
    component: () => import('@/views/Chapter.vue'),
    meta: { title: 'Archivo', description: 'Contenido del archivo' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    return { top: 0 }
  }
})

// Update document title on route change
router.beforeEach((to, _from, next) => {
  const baseTitle = 'Domina Claude Code'
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${baseTitle}`
  } else {
    document.title = baseTitle
  }
  next()
})

export default router
