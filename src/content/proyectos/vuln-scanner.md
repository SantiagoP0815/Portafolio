---
titulo: "Scanner de Vulnerabilidades Web"
descripcion: "Herramienta CLI en Python para detección automatizada de vulnerabilidades OWASP Top 10: cabeceras de seguridad, XSS reflejado, SQL injection, open redirect y directory listing."
fecha: 2026-05-28
herramientas: ["Python", "requests", "BeautifulSoup", "argparse"]
categoria: web
destacado: true
github: "https://github.com/SantiagoP0815/vuln-scanner"
estado: completado
---

## Descripción

Herramienta de línea de comandos que automatiza la detección de vulnerabilidades web comunes del **OWASP Top 10**. Diseñada con arquitectura modular para facilitar la extensión con nuevos módulos de detección.

```bash
python3 scanner.py -u https://objetivo.com -o reporte.json
```

## Módulos de detección

- **headers** — Detecta cabeceras de seguridad ausentes: HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy y headers que revelan tecnología del servidor
- **xss** — Inyecta payloads de XSS reflejado en parámetros URL y campos de formularios (GET y POST)
- **sqli** — Detección error-based de SQL Injection en parámetros URL y formularios, con firmas de error para MySQL, PostgreSQL, Oracle y SQLite
- **redirect** — Prueba parámetros comunes de redirección (`url`, `next`, `redirect`, `goto`...) para detectar Open Redirects
- **dirlisting** — Verifica rutas sensibles expuestas: directory listing activo, `.git/`, `.env`, paneles de administración

## Arquitectura

```
vuln-scanner/
├── scanner.py          # Punto de entrada CLI (argparse)
├── modules/            # Un archivo por tipo de vulnerabilidad
│   ├── headers.py
│   ├── xss.py
│   ├── sqli.py
│   ├── redirect.py
│   └── dirlisting.py
└── utils/
    ├── http.py         # Cliente HTTP + extractor de formularios
    └── reporter.py     # Salida en consola con colores + JSON
```

## Reporte de salida

Genera reporte en consola con colores por severidad (HIGH / MEDIUM / LOW / INFO) y exportación a JSON para análisis posterior.
