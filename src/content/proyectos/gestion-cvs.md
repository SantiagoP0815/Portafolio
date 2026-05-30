---
titulo: "Sistema de Gestión de CVs"
descripcion: "Plataforma web full-stack para gestión y generación de hojas de vida con autenticación segura, panel de administración, subida de documentos y exportación a PDF. Stack: Node.js, Express, MySQL, Passport.js."
fecha: 2024-11-15
herramientas: ["Node.js", "Express", "MySQL", "Passport.js", "bcrypt", "Helmet.js", "Multer", "pdfmake"]
categoria: desarrollo
destacado: true
github: "https://github.com/santiagop0815/hojadevida"
estado: completado
---

## Overview

Aplicación web desarrollada con **Node.js + Express** siguiendo arquitectura **MVC**, respaldada por **MySQL** como base de datos relacional. Permite a usuarios registrarse, diligenciar su hoja de vida y exportarla en PDF. Incluye panel de administrador para listar personas registradas.

## Arquitectura

```
Routes → Controllers → Services → Repositories (SQL) → MySQL
                  ↓
             Middleware (Auth, Validation, Rate-limit, CSRF)
```

## Funcionalidades

- Registro con verificación por vereda y junta de presidentes
- Diligenciamiento de datos personales, académicos, laborales e idiomas
- Subida de documentos soporte (PDF/imagen) por sección con **Multer**
- Generación y descarga de hoja de vida en **PDF** (pdfmake + pdf-lib)
- Panel de administrador para listar y descargar CVs de todos los usuarios

## Medidas de Seguridad

### Autenticación y Autorización
- Passwords hasheadas con **bcrypt**
- Sesiones con **express-session** + almacenamiento en MySQL
- Autenticación con **Passport.js** (local strategy)
- Middleware de autenticación en todas las rutas protegidas

### Protección de la Aplicación
- **Helmet.js** para cabeceras HTTP seguras (CSP, HSTS, X-Frame-Options)
- Protección **CSRF** en formularios
- **Rate limiting** por IP
- Validación y sanitización de inputs con `express-validator` + XSS clean
- Queries SQL parametrizadas contra SQL Injection

### Gestión de Datos
- Variables sensibles en `.env` (nunca en código fuente)
- `NODE_ENV=production` activa cookies seguras y `trust proxy`
