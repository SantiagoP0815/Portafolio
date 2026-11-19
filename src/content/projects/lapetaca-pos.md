---
titulo: "Sistema POS para La Petaca Club Campestre"
descripcion: "Sistema de punto de venta en red local para un restaurante, implementado y en uso. Los meseros toman pedidos desde el celular, la caja trabaja en un PC y todo funciona sin internet. Stack: Node.js, TypeScript, Fastify, SQLite, React."
fecha: 2026-11-03
herramientas: ["Node.js", "TypeScript", "Fastify", "SQLite", "React", "Vite", "SSE", "ESC/POS", "node:test"]
categoria: desarrollo
destacado: true
estado: completado
---

## Overview

Sistema de **punto de venta (POS)** hecho a la medida de La Petaca Club Campestre. Está **implementado y en uso** en el restaurante, y sigue recibiendo mejoras. Funciona en la **red WiFi local, sin internet**: los meseros usan el celular y la caja trabaja en un PC.

## Arquitectura

```
Celulares (meseros) ─┐
                     ├─ WiFi local ─> Servidor Fastify + SQLite (PC de caja)
PC de caja ──────────┘                      │
                                            ├─ SSE: actualización en vivo
                                            ├─ Impresora de cocina (red, ESC/POS)
                                            └─ Impresora de caja (USB, ESC/POS)
```

## Funcionalidades

- Toma de pedidos por mesa desde el celular, con envío directo a cocina
- **Actualización en vivo** entre dispositivos con Server-Sent Events
- **Impresión ESC/POS** en cocina por red y en caja por USB, con cola y reintentos si la impresora falla
- **Roles** de usuario, **cierre de caja** y **auditoría** de operaciones
- **Respaldos** de la base de datos
- **Pruebas automatizadas** con `node:test`

## Seguridad y confiabilidad

- Acceso por roles: cada usuario solo ve y hace lo que le corresponde
- Registro de auditoría para saber quién hizo cada operación
- Funciona sin internet, así que una caída del servicio no detiene el restaurante
