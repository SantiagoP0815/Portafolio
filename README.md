# Portafolio de Ciberseguridad

Portafolio personal de **Carlos Santiago Patiño Reyes** — Ingeniero de Sistemas especializado en Ciberseguridad, Ethical Hacking y CTF challenges.

## Stack

- [Astro 6](https://astro.build) — Static site generation (+ `@astrojs/sitemap`)
- [Tailwind CSS v4](https://tailwindcss.com) — Estilos utilitarios
- Tipado completo con TypeScript strict
- Fuentes autoalojadas (Inter y JetBrains Mono vía Fontsource)

## Estructura

```
/
├── src/
│   ├── components/    # ProjectCard, WriteupCard, Sidebar
│   ├── content/       # Colecciones: projects/ + writeups/ (Markdown)
│   ├── layouts/       # Layout.astro (shell común)
│   ├── pages/         # Rutas: index, /cv, /projects, /writeups, [slug], 404
│   └── styles/        # global.css (tema cyberpunk + utilidades)
├── public/            # favicon.svg, og-image.png, perfil.jpg
└── astro.config.mjs   # Config: site, base, Tailwind, sitemap
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

### Projects (`src/content/projects/`)

Herramientas y aplicaciones de ciberseguridad:
- Scanner de Vulnerabilidades Web
- NmapScan — Wrapper de Nmap en 2 fases
- Content Discovery Toolkit
- Gestor de CVs con seguridad integrada

### Writeups (`src/content/writeups/`)

Documentación técnica de máquinas de HackTheBox (track Starting Point + máquinas retiradas):
reconocimiento, explotación y escalada de privilegios. Las flags no se publican.

Marca `startingPoint: true` en el frontmatter de las máquinas del track Starting Point;
los conteos de la portada y el CV se calculan a partir de ese campo.

---

Hecho con Astro + Tailwind · Tema cyberpunk/terminal
