---
titulo: "NmapScan — Wrapper de Nmap en 2 Fases"
descripcion: "Script Bash que automatiza el reconocimiento de red con Nmap: descubrimiento rápido de puertos abiertos seguido de escaneo detallado de servicios y versiones."
fecha: 2026-06-07
herramientas: ["Bash", "Nmap"]
categoria: red
destacado: true
github: "https://github.com/SantiagoP0815/NmapScan"
estado: completado
---

## Descripción

Script de línea de comandos que encadena dos fases de Nmap para acelerar el reconocimiento en pentesting y CTFs. Elimina la necesidad de recordar flags y pasar resultados manualmente entre escaneos.

```bash
sudo nmapscan <IP> [opciones]
```

## Fases de escaneo

**Fase 1 — Descubrimiento de puertos**

Escaneo completo (`-p-`) con `--min-rate 5000` para encontrar todos los puertos TCP abiertos rápidamente. Extrae automáticamente los puertos del resultado.

```bash
nmap -p- --open -sS --min-rate 5000 -n -Pn <IP>
```

**Fase 2 — Escaneo detallado**

Lanza `-sCV` únicamente sobre los puertos encontrados en fase 1: detecta versiones de servicios y ejecuta scripts NSE por defecto.

```bash
nmap -p<puertos> -sCV -Pn <IP>
```

## Opciones

| Flag | Descripción |
|---|---|
| `-o DIR` | Directorio de salida (default: `./Scan`) |
| `-r RATE` | Min-rate fase 1 (default: 5000) |
| `-p PORTS` | Saltar fase 1, escanear puertos específicos |
| `-s` | Modo lento: `-T2` sin `--min-rate` (evita drops por firewall) |
| `-u` | UDP scan top-200 puertos |
| `-6` | Objetivo IPv6 |
| `--no-syn` | Usar `-sT` (connect scan, no requiere root) |

## Salida

Guarda los resultados en archivos `.txt` con timestamp para no sobreescribir escaneos previos:

```
Scan/
├── allports_10.10.10.1_20260607_143022.txt   # Puertos encontrados
├── fullscan_10.10.10.1_20260607_143022.txt   # Scan detallado
└── udpscan_10.10.10.1_20260607_143022.txt    # (si -u activado)
```
