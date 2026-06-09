# Portafolio de Ciberseguridad

Portafolio personal de **Carlos Santiago Patiño Reyes** — Ingeniero de Sistemas especializado en Ciberseguridad, Ethical Hacking y CTF challenges.

## Stack

- [Astro 6](https://astro.build) — Static site generation
- [Tailwind CSS v4](https://tailwindcss.com) — Estilos utilitarios
- Tipado completo con TypeScript strict

## Estructura

```
/
├── src/
│   ├── components/    # ProjectCard, WriteupCard, Sidebar, Footer
│   ├── content/       # Colecciones: proyectos/ + writeups/ (Markdown)
│   ├── layouts/       # Layout.astro (shell común)
│   ├── pages/         # Rutas: index, /proyectos, /writeups, [slug]
│   └── styles/        # global.css (tema cyberpunk + utilidades)
├── public/            # favicon.svg, og-image.png
└── astro.config.mjs   # Config: site, base, Tailwind Vite plugin
```

## Comandos

| Comando             | Acción                                  |
| ------------------- | --------------------------------------- |
| `npm install`       | Instalar dependencias                   |
| `npm run dev`       | Servidor local en `localhost:4321`      |
| `npm run build`     | Build de producción a `./dist/`         |
| `npm run preview`   | Previsualizar build local               |

## Despliegue

Hosteado en GitHub Pages: [SantiagoP0815.github.io/Portafolio](https://SantiagoP0815.github.io/Portafolio)

El deploy se hace automáticamente con GitHub Actions al hacer push a `main`.

## Colecciones

### Proyectos (`src/content/proyectos/`)

Herramientas y aplicaciones de ciberseguridad:
- Scanner de Vulnerabilidades Web
- NmapScan — Wrapper de Nmap en 2 fases
- Content Discovery Toolkit
- Gestor de CVs con seguridad integrada

### Writeups (`src/content/writeups/`)

Documentación técnica de máquinas resueltas en HackTheBox, TryHackMe y CTFs.
Incluye reconocimiento, explotación y escalada de privilegios con enfoque OSCP-style.

---

Hecho con Astro + Tailwind · Tema cyberpunk/terminal
