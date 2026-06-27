<div align="center">

# ⛏️ DM-DARKMINEX

**Dark fantasy toolkit for Dungeon Masters · Toolkit de fantasía oscura para Dungeon Masters**

*Procedural generation of mines, encounters & treasures · Generación procedural de minas, encuentros y tesoros*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

A dark fantasy toolkit for Dungeon Masters focusing on subterranean exploration, twisted mining lore, and grim encounters — powered by procedural AI generation.

> Toolkit de fantasía oscura para Dungeon Masters centrado en exploración subterránea, lore minero retorcido y encuentros sombríos — impulsado por generación procedural con IA.

---

## ✨ Features / Características

- 🏛️ **Chamber Generator** — Procedurally generate dark mine chambers with evocative sensory descriptions, lighting conditions, and hazards. / Genera cámaras de mina con descripciones sensoriales, condiciones de luz y peligros.
- ⚔️ **Grim Encounters** — Manifest subterranean threats from low-risk nuisances to extreme boss encounters. / Amenazas subterráneas de intensidad variable, desde molestias menores hasta jefes extremos.
- 📜 **Treasure & Ore** — Extract rare materials, crystals, and artifacts with rarity scales and mechanical effects. / Extrae materiales raros, cristales y artefactos con escalas de rareza y efectos mecánicos.
- ⏱️ **Battle Order** — Initiative tracker with the "ticking clock of destiny" for underground combat. / Rastreador de iniciativa con el "reloj del destino" para combates subterráneos.
- 🎨 **Sub-Surface UI** — Dark, immersive interface optimized for night sessions. / Interfaz oscura e inmersiva optimizada para sesiones nocturnas.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 6 |
| Styling | Tailwind CSS 4 — *Sub-surface* aesthetic |
| Animation | Motion |
| AI Generation | Gemini Flash |
| Icons | Lucide React |
| Language | TypeScript 5.x |

## 🚀 Quick Start / Inicio Rápido

### Prerequisites / Prerequisitos

- Node.js 20+
- API Key from / de [Google AI Studio](https://ai.google.dev/)

### Installation / Instalación

```bash
git clone https://github.com/jacxas/DM-DARKMINEX.git
cd DM-DARKMINEX
npm install
```

### Configuration / Configuración

```bash
cp .env.example .env.local
```

```env
VITE_GEMINI_API_KEY=your_key_here
```

### Run / Ejecutar

```bash
npm run dev
```

## 📦 Scripts

```bash
npm run dev      # Local development / Desarrollo local
npm run build    # Production build / Build de producción
npm run preview  # Build preview / Preview del build
npm run lint     # Linter
```

## 🎮 Usage / Uso

1. **Generate Chamber / Generar Cámara** — Set depth and mine type → get AI-generated description / Configurá profundidad y tipo de mina → obtenés descripción generada por IA
2. **Invoke Encounter / Invocar Encuentro** — Select difficulty → system generates monster and stats / Seleccioná nivel de dificultad → el sistema genera el monstruo y sus stats
3. **Extract Treasure / Extraer Tesoro** — Explore the mine to find materials with random rarity / Explorá la mina para encontrar materiales con rareza aleatoria
4. **Battle / Batalla** — Use the initiative tracker to manage combat / Usá el tracker de iniciativa para gestionar el combate

## 📄 License / Licencia

MIT © [jacxas](https://github.com/jacxas)
