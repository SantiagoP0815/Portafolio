---
titulo: "Meow"
descripcion: "Acceso a servicio Telnet expuesto con login root sin contraseña para extraer flag directamente del sistema."
fecha: 2026-05-11
dificultad: easy
herramientas: ["nmap", "telnet"]
categoria: htb
plataforma: HackTheBox
completado: true
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.193.172
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p23 10.129.193.172 -sCV
```

Puerto abierto: **23/tcp (telnet)**

## Foothold

Telnet expuesto sin autenticación. Login directo como `root` sin contraseña:

```bash
telnet 10.129.193.172
# login: root
# password: (vacío)
```

Extracción del flag:

```bash
cat flag.txt
```

## Flags

| Flag | Hash |
|------|------|
| Root | `b40abdfe23665f766f9c61ecba8a4c19` |
