# Claude HowTo Frontend

Frontend moderno en Vue.js para la guía **Claude HowTo** - Domina Claude Code en un fin de semana.

## 🚀 Características

- **Vue.js 3** con Composition API y TypeScript
- **Vite** para build rápido y HMR
- **Tailwind CSS** para estilos modernos y responsive
- **Vue Router** para navegación SPA
- **Pinia** para gestión de estado
- **Markdown-it** + **Highlight.js** para renderizado de contenido
- **Mermaid** para diagramas interactivos
- **Modo oscuro** con toggle
- **Búsqueda full-text** con Fuse.js
- **Progreso de aprendizaje** persistente (localStorage)

## 📋 Requisitos

- Node.js 18+
- npm o pnpm
- Python 3.10+ (para herramientas backend opcionales)

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Copiar contenido Markdown

```bash
npm run copy-content
```

Este script copia todos los archivos `.md` del repositorio `claude-howto` al directorio `src/content/`.

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.vue       # Barra de navegación superior
│   │   ├── Sidebar.vue      # Menú lateral con capítulos
│   │   └── Footer.vue       # Pie de página
│   └── ui/                   # Componentes UI reutilizables
├── views/
│   ├── Home.vue             # Página de inicio
│   ├── LearningRoadmap.vue  # Ruta de aprendizaje
│   ├── Catalog.vue          # Catálogo completo
│   ├── QuickReference.vue   # Referencia rápida
│   ├── Tools.vue            # Herramientas
│   ├── Search.vue           # Búsqueda
│   ├── Chapter.vue          # Vista de capítulo
│   └── ChapterFile.vue      # Vista de archivo de capítulo
├── stores/
│   ├── chapters.ts          # Store de capítulos
│   ├── progress.ts          # Store de progreso
│   └── settings.ts          # Store de configuración
├── composables/
│   └── useSearch.ts         # Composable de búsqueda
├── utils/
│   └── markdown-parser.ts   # Parser de Markdown y Mermaid
├── router/
│   └── index.ts             # Configuración de rutas
├── assets/
│   └── styles/
│       └── main.css         # Estilos globales
├── content/                  # Archivos Markdown copiados
├── App.vue
└── main.ts
```

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar la paleta de colores:

```js
theme: {
  extend: {
    colors: {
      primary: { /* ... */ },
      secondary: { /* ... */ },
      accent: { /* ... */ }
    }
  }
}
```

### Rutas

Edita `src/router/index.ts` para agregar o modificar rutas.

### Stores

Los stores de Pinia están en `src/stores/`:
- `chapters.ts`: Define la estructura de capítulos y archivos
- `progress.ts`: Gestiona el progreso del usuario
- `settings.ts`: Configuración de UI (tema, sidebar, etc.)

## 🔧 Backend API (Opcional)

Para funcionalidades avanzadas (generación EPUB, análisis de código), necesitas el backend en Python:

### 1. Crear entorno virtual

```bash
cd ../claude-howto/scripts
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate  # Windows
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

### 3. Iniciar API (cuando esté implementada)

```bash
uvicorn api.main:app --reload
```

## 📦 Build para Producción

```bash
npm run build
```

Los archivos se generan en `dist/` y están listos para desplegar.

## 🚀 Deploy

### Vercel

1. Conecta tu repositorio a Vercel
2. Configura el build command: `npm run build`
3. Output directory: `dist`
4. ¡Listo!

### Netlify

1. Conecta tu repositorio a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. ¡Listo!

### Variables de Entorno (si usas backend)

```env
VITE_API_URL=https://tu-api.com
```

## 🧪 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Lint del código |
| `npm run copy-content` | Copia contenido Markdown |

## 📚 Recursos

- [Vue.js 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Mermaid](https://mermaid.js.org/)
- [Markdown-it](https://github.com/markdown-it/markdown-it)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](../LICENSE) en el repositorio principal.

---

**Hecho con ❤️ para la comunidad de Claude Code**
