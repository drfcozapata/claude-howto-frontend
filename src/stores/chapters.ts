import { defineStore } from 'pinia'

export interface Chapter {
  id: string
  number: number
  title: string
  titleEn: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  timeEstimate: string
  files: ChapterFile[]
  icon: string
}

export interface ChapterFile {
  id: string
  title: string
  path: string
  type: 'markdown' | 'code' | 'config'
}

export const useChaptersStore = defineStore('chapters', () => {
  const chapters: Chapter[] = [
    {
      id: '01-slash-commands',
      number: 1,
      title: 'Comandos de Barra (Slash Commands)',
      titleEn: 'Slash Commands',
      description: 'Atajos invocados por el usuario para flujos de trabajo comunes',
      level: 'beginner',
      timeEstimate: '30 min',
      icon: 'command',
      files: [
        { id: 'readme', title: 'Introducción', path: '01-slash-commands/README.md', type: 'markdown' },
        { id: 'optimize', title: 'Optimizar Código', path: '01-slash-commands/optimize.md', type: 'markdown' },
        { id: 'pr', title: 'Pull Request', path: '01-slash-commands/pr.md', type: 'markdown' },
        { id: 'generate-api-docs', title: 'Generar Docs API', path: '01-slash-commands/generate-api-docs.md', type: 'markdown' },
        { id: 'commit', title: 'Commit Messages', path: '01-slash-commands/commit.md', type: 'markdown' },
        { id: 'setup-ci-cd', title: 'Configurar CI/CD', path: '01-slash-commands/setup-ci-cd.md', type: 'markdown' },
        { id: 'push-all', title: 'Push Todos los Cambios', path: '01-slash-commands/push-all.md', type: 'markdown' },
        { id: 'unit-test-expand', title: 'Expandir Tests', path: '01-slash-commands/unit-test-expand.md', type: 'markdown' },
        { id: 'doc-refactor', title: 'Refactorizar Docs', path: '01-slash-commands/doc-refactor.md', type: 'markdown' }
      ]
    },
    {
      id: '02-memory',
      number: 2,
      title: 'Memoria (Memory)',
      titleEn: 'Memory',
      description: 'Contexto persistente y estándares del proyecto entre sesiones',
      level: 'beginner',
      timeEstimate: '45 min',
      icon: 'brain',
      files: [
        { id: 'readme', title: 'Introducción', path: '02-memory/README.md', type: 'markdown' },
        { id: 'project', title: 'Memoria de Proyecto', path: '02-memory/project-CLAUDE.md', type: 'markdown' },
        { id: 'directory', title: 'Memoria de Directorio', path: '02-memory/directory-api-CLAUDE.md', type: 'markdown' },
        { id: 'personal', title: 'Memoria Personal', path: '02-memory/personal-CLAUDE.md', type: 'markdown' }
      ]
    },
    {
      id: '03-skills',
      number: 3,
      title: 'Habilidades (Skills)',
      titleEn: 'Skills',
      description: 'Capacidades reutilizables y auto-invocadas con scripts',
      level: 'intermediate',
      timeEstimate: '1 hora',
      icon: 'sparkles',
      files: [
        { id: 'readme', title: 'Introducción', path: '03-skills/README.md', type: 'markdown' },
        { id: 'code-review', title: 'Code Review', path: '03-skills/code-review/SKILL.md', type: 'markdown' },
        { id: 'brand-voice', title: 'Brand Voice', path: '03-skills/brand-voice/SKILL.md', type: 'markdown' },
        { id: 'doc-generator', title: 'Generador de Docs', path: '03-skills/doc-generator/SKILL.md', type: 'markdown' },
        { id: 'refactor', title: 'Refactorización', path: '03-skills/refactor/SKILL.md', type: 'markdown' },
        { id: 'claude-md', title: 'CLAUDE.md', path: '03-skills/claude-md/SKILL.md', type: 'markdown' },
        { id: 'blog-draft', title: 'Blog Draft', path: '03-skills/blog-draft/SKILL.md', type: 'markdown' }
      ]
    },
    {
      id: '04-subagents',
      number: 4,
      title: 'Subagentes (Subagents)',
      titleEn: 'Subagents',
      description: 'Asistentes de IA especializados con contextos aislados',
      level: 'intermediate',
      timeEstimate: '1.5 horas',
      icon: 'users',
      files: [
        { id: 'readme', title: 'Introducción', path: '04-subagents/README.md', type: 'markdown' },
        { id: 'code-reviewer', title: 'Code Reviewer', path: '04-subagents/code-reviewer.md', type: 'markdown' },
        { id: 'test-engineer', title: 'Test Engineer', path: '04-subagents/test-engineer.md', type: 'markdown' },
        { id: 'documentation-writer', title: 'Documentation Writer', path: '04-subagents/documentation-writer.md', type: 'markdown' },
        { id: 'secure-reviewer', title: 'Secure Reviewer', path: '04-subagents/secure-reviewer.md', type: 'markdown' },
        { id: 'implementation-agent', title: 'Implementation Agent', path: '04-subagents/implementation-agent.md', type: 'markdown' },
        { id: 'debugger', title: 'Debugger', path: '04-subagents/debugger.md', type: 'markdown' },
        { id: 'data-scientist', title: 'Data Scientist', path: '04-subagents/data-scientist.md', type: 'markdown' },
        { id: 'clean-code-reviewer', title: 'Clean Code Reviewer', path: '04-subagents/clean-code-reviewer.md', type: 'markdown' }
      ]
    },
    {
      id: '05-mcp',
      number: 5,
      title: 'Protocolo MCP',
      titleEn: 'MCP Protocol',
      description: 'Model Context Protocol para acceder a herramientas externas y APIs',
      level: 'intermediate',
      timeEstimate: '1 hora',
      icon: 'plug',
      files: [
        { id: 'readme', title: 'Introducción', path: '05-mcp/README.md', type: 'markdown' }
      ]
    },
    {
      id: '06-hooks',
      number: 6,
      title: 'Ganchos (Hooks)',
      titleEn: 'Hooks',
      description: 'Automatización dirigida por eventos que se ejecuta automáticamente',
      level: 'intermediate',
      timeEstimate: '1 hora',
      icon: 'link',
      files: [
        { id: 'readme', title: 'Introducción', path: '06-hooks/README.md', type: 'markdown' }
      ]
    },
    {
      id: '07-plugins',
      number: 7,
      title: 'Plugins',
      titleEn: 'Plugins',
      description: 'Colecciones empaquetadas de comandos, agentes, MCP y hooks',
      level: 'advanced',
      timeEstimate: '2 horas',
      icon: 'puzzle',
      files: [
        { id: 'readme', title: 'Introducción', path: '07-plugins/README.md', type: 'markdown' },
        { id: 'pr-review', title: 'PR Review', path: '07-plugins/pr-review/README.md', type: 'markdown' },
        { id: 'devops', title: 'DevOps Automation', path: '07-plugins/devops-automation/README.md', type: 'markdown' },
        { id: 'documentation', title: 'Documentation', path: '07-plugins/documentation/README.md', type: 'markdown' }
      ]
    },
    {
      id: '08-checkpoints',
      number: 8,
      title: 'Checkpoints y Rewind',
      titleEn: 'Checkpoints and Rewind',
      description: 'Guarda el estado de la conversación y explora diferentes enfoques',
      level: 'intermediate',
      timeEstimate: '45 min',
      icon: 'clock',
      files: [
        { id: 'readme', title: 'Introducción', path: '08-checkpoints/README.md', type: 'markdown' },
        { id: 'examples', title: 'Ejemplos', path: '08-checkpoints/checkpoint-examples.md', type: 'markdown' }
      ]
    },
    {
      id: '09-advanced-features',
      number: 9,
      title: 'Funcionalidades Avanzadas',
      titleEn: 'Advanced Features',
      description: 'Capacidades avanzadas para flujos de trabajo complejos',
      level: 'advanced',
      timeEstimate: '2-3 horas',
      icon: 'zap',
      files: [
        { id: 'readme', title: 'Introducción', path: '09-advanced-features/README.md', type: 'markdown' },
        { id: 'config-examples', title: 'Ejemplos de Configuración', path: '09-advanced-features/config-examples.json', type: 'config' },
        { id: 'planning-examples', title: 'Ejemplos Planning Mode', path: '09-advanced-features/planning-mode-examples.md', type: 'markdown' }
      ]
    },
    {
      id: '10-cli',
      number: 10,
      title: 'Referencia CLI',
      titleEn: 'CLI Reference',
      description: 'Referencia completa de la interfaz de línea de comandos',
      level: 'beginner',
      timeEstimate: '30 min',
      icon: 'terminal',
      files: [
        { id: 'readme', title: 'Introducción', path: '10-cli/README.md', type: 'markdown' }
      ]
    }
  ]

  const getChapterById = (id: string) => chapters.find(ch => ch.id === id)

  const getFileByPath = (path: string) => {
    for (const chapter of chapters) {
      const file = chapter.files.find(f => f.path === path)
      if (file) return file
    }
    return null
  }

  const getChaptersByLevel = (level: string) => chapters.filter(ch => ch.level === level)

  const totalFiles = chapters.reduce((acc, ch) => acc + ch.files.length, 0)

  return {
    chapters,
    getChapterById,
    getFileByPath,
    getChaptersByLevel,
    totalFiles
  }
})
