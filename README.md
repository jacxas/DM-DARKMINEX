<div align="center">

# ⛏️ DM-DARKMINEX

**Toolkit de fantasía oscura para Dungeon Masters — Generación procedural de minas, encuentros y tesoros**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 🦤 ¿Qué es DM-DARKMINEX?

DM-DARKMINEX es una herramienta de generación procedural para Dungeon Masters enfocada en exploración subterránea, minería oscura y encuentros sombríos. Usa **Gemini Flash** para generar descripciones envolventes, monstruos y tesoros on-the-fly.

## ✨ Características

- 🏛️ **Generador de Cámaras** — Genera minas subterráneas con descripciones sensoriales, condiciones de iluminación y peligros
- ⚔️ **Encuentros Oscuros** — Amenazas subterráneas con intensidad variable: desde molestias menores hasta jefes extremos
- 📜 **Tesoros y Minerales** — Materiales raros, cristales y artefactos con escalas de rareza y efectos mecánicos
- ⏱️ **Orden de Batalla** — Tracker de iniciativa especializado con "reloj del destino" para combates
- 🎨 Estética **Sub-Surface** — UI oscura e inmersiva optimizada para sesiones nocturnas

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React 19, TypeScript, Vite |
| Estilos | Tailwind CSS 4 (tema Sub-Surface) |
| Animaciones | Motion (Framer Motion) |
| IA | Gemini Flash (Google AI) |
| Iconos | Lucide React |

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 20+
- API Key de [Google AI Studio](https://ai.google.dev/)

### Instalación

```bash
git clone https://github.com/jacxas/DM-DARKMINEX.git
cd DM-DARKMINEX
npm install
```

### Configuración

```bash
cp .env.example .env.local
```

```env
VITE_GEMINI_API_KEY=tu_clave_aqui
```

### Ejecutar

```bash
npm run dev
```

## 📦 Scripts

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter
```

## 🎮 Uso

1. **Generar Cámara**: Configurá profundidad y tipo de mina → obtenés descripción generada por IA
2. **Invocar Encuentro**: Seleccioná nivel de dificultad → el sistema genera el monstruo y sus stats
3. **Extraer Tesoro**: Explorá la mina para encontrar materiales con rareza aleatoria
4. **Batalla**: Usá el tracker de iniciativa para gestionar el combate

## 📄 Licencia

MIT © [jacxas](https://github.com/jacxas)
