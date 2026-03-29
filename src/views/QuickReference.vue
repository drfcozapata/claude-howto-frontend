<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Referencia Rápida
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Comandos esenciales y atajos para comenzar rápidamente
        </p>

        <!-- Installation Commands -->
        <div class="card p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Download class="w-6 h-6" />
            Instalación Rápida
          </h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Slash Commands</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>cp 01-slash-commands/*.md .claude/commands/</code></pre>
            </div>

            <div>
              <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Memory</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>cp 02-memory/project-CLAUDE.md ./CLAUDE.md</code></pre>
            </div>

            <div>
              <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Skills</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>cp -r 03-skills/code-review ~/.claude/skills/</code></pre>
            </div>

            <div>
              <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Subagents</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>cp 04-subagents/*.md .claude/agents/</code></pre>
            </div>
          </div>
        </div>

        <!-- Common Commands -->
        <div class="card p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Command class="w-6 h-6" />
            Comandos Comunes
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Comando</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4"><code class="text-primary-600 dark:text-primary-400">/optimize</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Analizar y optimizar código</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4"><code class="text-primary-600 dark:text-primary-400">/pr</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Preparar pull request</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4"><code class="text-primary-600 dark:text-primary-400">/generate-api-docs</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Generar documentación API</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4"><code class="text-primary-600 dark:text-primary-400">/review-pr</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Revisar pull request completo</td>
                </tr>
                <tr>
                  <td class="py-3 px-4"><code class="text-primary-600 dark:text-primary-400">/deploy</code></td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Desplegar a producción</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Feature Comparison -->
        <div class="card p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Table class="w-6 h-6" />
            Comparación de Funcionalidades
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Funcionalidad</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Invocación</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Persistencia</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Ideal Para</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Slash Commands</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Manual (/cmd)</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Solo sesión</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Atajos rápidos</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Memory</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Auto-cargado</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Entre sesiones</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Aprendizaje largo plazo</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Skills</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Auto-invocado</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Sistema de archivos</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Flujos automatizados</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-3 px-4 font-medium">Subagents</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Auto-delegado</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Contexto aislado</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Distribución de tareas</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium">Hooks</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Por evento</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Configurado</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Automatización</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Command, Table } from 'lucide-vue-next'
</script>
