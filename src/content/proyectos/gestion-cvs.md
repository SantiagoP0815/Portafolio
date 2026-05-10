---
titulo: "Sistema de Gestión de CVs"
descripcion: "Plataforma web full-stack para gestión centralizada de currículums vitae con autenticación segura, panel de administración y arquitectura MVC sobre Node.js y MySQL."
fecha: 2024-11-15
herramientas: ["Node.js", "Express", "MySQL", "bcrypt", "JWT", "Helmet.js", "Sequelize"]
categoria: desarrollo
destacado: true
github: "https://github.com/serpachen/cv-manager"
estado: completado
---

## Overview

Sistema web desarrollado con **Node.js + Express** siguiendo el patrón **MVC**, respaldado por **MySQL** como base de datos relacional. El proyecto fue diseñado desde el primer día con seguridad como prioridad central.

## Arquitectura

El sistema sigue un flujo MVC estricto:

```
Routes → Controllers → Models (Sequelize ORM) → MySQL
                  ↓
             Middleware (Auth, Validation, Rate-limit)
```

## Medidas de Seguridad Implementadas

### Autenticación y Autorización
- Passwords hasheadas con **bcrypt** (salt rounds: 12)
- Sesiones manejadas con **JWT** firmados con clave secreta rotativa
- Middleware de autenticación en todas las rutas protegidas

### Protección de la Aplicación
- **Helmet.js** para cabeceras HTTP seguras (CSP, HSTS, X-Frame-Options)
- **Rate limiting** con `express-rate-limit` (100 req/15min por IP)
- Validación y sanitización de inputs con `express-validator`
- Protección contra **SQL Injection** vía Sequelize ORM parametrizado

### Gestión de Datos
- Variables sensibles en `.env` (nunca en código fuente)
- Conexiones MySQL con usuario de mínimos privilegios
- Logs de acceso y errores separados para auditoría
