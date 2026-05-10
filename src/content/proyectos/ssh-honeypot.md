---
titulo: "Honeypot SSH con Dashboard"
descripcion: "Honeypot SSH de baja interacción que registra intentos de acceso y los visualiza en un dashboard en tiempo real con mapas de calor geográficos."
fecha: 2024-07-10
herramientas: ["Python", "asyncssh", "Flask", "MaxMind GeoIP", "Chart.js", "SQLite"]
categoria: red
destacado: false
github: "https://github.com/serpachen/ssh-honeypot"
estado: completado
---

## Descripción

Honeypot SSH desplegado en VPS que captura intentos de fuerza bruta, registra credenciales usadas, IPs de origen y las geolocaliza para análisis de amenazas.

## Características

- Captura de credenciales y comandos ejecutados
- Dashboard web con estadísticas en tiempo real
- Exportación a CSV/JSON para análisis forense
- Alertas por Telegram cuando se detectan IPs maliciosas conocidas
