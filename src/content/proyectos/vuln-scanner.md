---
titulo: "Scanner de Vulnerabilidades Web"
descripcion: "Herramienta CLI automatizada para detección de vulnerabilidades OWASP Top 10 en aplicaciones web: XSS, SQLi, CSRF, Open Redirects y más."
fecha: 2024-09-20
herramientas: ["Python", "requests", "BeautifulSoup", "argparse", "SQLMap"]
categoria: web
destacado: false
github: "https://github.com/serpachen/vuln-scanner"
estado: completado
---

## Descripción

Scanner automatizado que realiza pruebas de seguridad sobre aplicaciones web objetivo, detectando las vulnerabilidades más comunes del OWASP Top 10.

## Módulos

- **XSS Detector**: Inyecta payloads en formularios y URLs
- **SQLi Tester**: Pruebas de error-based y time-based blind SQLi
- **Header Analyzer**: Valida cabeceras de seguridad HTTP
- **Directory Fuzzer**: Descubre endpoints ocultos con wordlists
