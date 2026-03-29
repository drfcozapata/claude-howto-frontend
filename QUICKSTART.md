# 🚀 Guía de Inicio Rápido

## Prerrequisitos

Asegúrate de tener instalado:
- **Node.js 18+** ([descargar](https://nodejs.org/))
- **npm** (viene con Node.js)
- **Git** ([descargar](https://git-scm.com/))

## Instalación en 5 Minutos

### Paso 1: Navega al directorio del frontend

```bash
cd claude-howto-frontend
```

### Paso 2: Instala dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias (~30 segundos).

### Paso 3: Copia el contenido Markdown

```bash
npm run copy-content
```

Este script copia todos los archivos `.md` del repositorio principal al frontend.

### Paso 4: Inicia el servidor de desarrollo

```bash
npm run dev
```

¡Listo! La aplicación se abrirá automáticamente en **http://localhost:3000**

---

## Primeros Pasos

### 1. Explora la Ruta de Aprendizaje

Ve a `/roadmap` para ver todos los módulos organizados por nivel:
- **Principiante**: Slash Commands, Memory, CLI Basics
- **Intermedio**: Skills, Hooks, MCP, Subagents, Checkpoints
- **Avanzado**: Advanced Features, Plugins

### 2. Comienza con el Primer Módulo

Haz clic en **"Módulo 1: Slash Commands"** y explora los archivos:
- Introducción
- Optimizar Código
- Pull Request
- Generar Docs API
- etc.

### 3. Marca tu Progreso

Cuando completes un archivo, haz clic en **"Marcar como completado"** para guardar tu progreso.

### 4. Usa la Búsqueda

Presiona **Ctrl+K** (o Cmd+K en Mac) para buscar rápidamente en toda la documentación.

### 5. Cambia a Modo Oscuro

Haz clic en el ícono de luna/sol en el header para alternar entre modo claro y oscuro.

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Vista previa del build |
| `npm run copy-content` | Copia contenido Markdown |
| `npm run lint` | Lint del código |

---

## Solución de Problemas

### Error: "npm no se encuentra"

Instala Node.js desde [nodejs.org](https://nodejs.org/)

### Error: "Cannot find module"

Ejecuta `npm install` nuevamente.

### Los archivos Markdown no se ven

Ejecuta `npm run copy-content` para copiar los archivos.

### El puerto 3000 ya está en uso

Edita `vite.config.ts` y cambia `port: 3000` por otro puerto.

---

## Siguiente Paso: Backend API (Opcional)

Para habilitar funcionalidades avanzadas como:
- Generación de EPUB bajo demanda
- Análisis de complejidad de código
- Detección de code smells

Consulta la sección **Backend API** en el README principal.

---

**¿Listo para comenzar? ¡Ejecuta `npm run dev` y explora la guía!** 🎉
