---
titulo: "Content Discovery Tool"
descripcion: "Herramienta CLI en Python para descubrimiento de contenido web: brute-force de rutas, enumeración de subdominios, extracción de endpoints en JS y crawling recursivo multihilo."
fecha: 2026-05-29
herramientas: ["Python", "requests", "BeautifulSoup", "argparse", "threading"]
categoria: web
destacado: true
github: "https://github.com/SantiagoP0815/content-discovery"
estado: completado
---

## Descripción

Herramienta de línea de comandos modular para reconocimiento web en pruebas de penetración autorizadas. Combina cuatro técnicas de descubrimiento de contenido en una sola ejecución, con soporte multihilo y reporte en JSON.

```bash
# Ejecutar todos los módulos
python discover.py -u https://objetivo.com

# Módulos específicos con wordlist personalizada
python discover.py -u https://objetivo.com -m directory,js-scraper -w /path/to/wordlist.txt -o reporte.json
```

## Módulos

- **directory** — Brute-force de rutas y extensiones de archivo contra el objetivo con soporte de wordlists personalizadas
- **subdomain** — Enumeración de subdominios mediante resolución DNS + HTTP probing
- **js-scraper** — Extrae endpoints de archivos JS externos, scripts inline y HTML de la página
- **crawler** — Crawling recursivo BFS de links del mismo dominio, multihilo

## Arquitectura

```
content-discovery/
├── discover.py           # Punto de entrada CLI (argparse)
├── modules/              # Un archivo por módulo de descubrimiento
│   ├── directory.py
│   ├── subdomain.py
│   ├── js_scraper.py
│   └── crawler.py
├── utils/
│   ├── http.py           # Cliente HTTP + normalización de URLs
│   └── reporter.py       # Salida en consola con colores + JSON
└── wordlists/
    ├── directories.txt
    └── subdomains.txt
```

## Opciones CLI

| Flag | Default | Descripción |
|------|---------|-------------|
| `-u`, `--url` | requerido | URL objetivo |
| `-m`, `--modules` | `all` | Módulos separados por coma |
| `-o`, `--output` | — | Guardar reporte JSON |
| `-t`, `--threads` | `10` | Hilos por módulo |
| `-w`, `--wordlist` | integrada | Wordlist para directory brute-force |
| `--max-pages` | `50` | Máx páginas para el crawler |

## Salida

Resultados con códigos HTTP coloreados en consola y exportación opcional a JSON.

```
[200] https://objetivo.com/admin/        [12345B]
      Path: admin/
[403] https://objetivo.com/.env          [512B]
      Path: .env
```
