<template>
  <footer class="mt-20 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img src="/resources/logos/logo.svg" alt="Domina Claude Code" class="w-52" />
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Guía completa y gratuita para dominar Claude Code.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Enlaces Rápidos</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/roadmap" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Ruta de Aprendizaje
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/catalog" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Catálogo
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/quick-reference" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Referencia Rápida
              </RouterLink>
            </li>
            <!-- <li>
              <RouterLink to="/tools" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Herramientas
              </RouterLink>
            </li> -->
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Recursos</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="https://code.claude.com/docs" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1">
                Documentación Oficial
                <ExternalLink class="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://github.com/drfcozapata/domina-claude-code" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1">
                GitHub Repository
                <ExternalLink class="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1">
                MCP Protocol
                <ExternalLink class="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        <!-- License -->
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Licencia</h4>
          <div class="flex items-center gap-2 mb-2">
            <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" class="h-5" />
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            MIT License - Libre para usar, modificar y distribuir.
          </p>
          <!-- <div class="mt-4 flex items-center gap-2">
            <a href="https://github.com/drfcozapata/domina-claude-code/stargazers" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/github/stars/drfcozapata/domina-claude-code?style=flat" alt="GitHub Stars" class="h-5" />
            </a>
          </div> -->
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Todos los derechos reservados © {{ new Date().getFullYear() }} Creado con ❤️ para la comunidad por <a href="https://franciscozapata.dev" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">Francisco Zapata</a>
        </p>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Última actualización: Marzo 2026
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
</script>
