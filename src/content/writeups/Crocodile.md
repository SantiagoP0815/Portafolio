---
titulo: "Crocodile"
descripcion: "FTP anónimo expone credenciales. Directory enumeration revela panel de login oculto. Acceso con credenciales cruzadas entre servicios."
fecha: 2026-06-04
dificultad: easy
herramientas: ["nmap", "ftp", "gobuster"]
categoria: htb
plataforma: HackTheBox
completado: true
fases: ["Reconocimiento", "Foothold"]
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.51.216
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p21,80 10.129.51.216 -sCV
```

Puertos abiertos: **21/tcp (vsFTPd 3.0.3)** y **80/tcp (Apache 2.4.41)**

## Foothold

### FTP — acceso anónimo

vsFTPd 3.0.3 permite login anónimo. Archivos sensibles expuestos:

```bash
ftp -p 10.129.51.216
# Name: anonymous
# Password: (vacío)
ftp> ls
ftp> get allowed.userlist
ftp> get allowed.userlist.passwd
```

Contenido recuperado:

| Usuario | Contraseña |
|---------|------------|
| aron  | `root` |
| pwnmeow | `Supersecretpassword1` |
| egotisticalsw | `@BaASD&9032123sADS` |
| admin | `rKXM59ESxesUFHAd` |

### HTTP — directory enumeration

Raíz del sitio no expone login. Enumeración con gobuster:

```bash
gobuster dir -u http://10.129.51.216/ -w /usr/share/dirb/wordlists/common.txt
```

Directorio descubierto: `/dashboard/` — panel de login.

### Acceso al dashboard

Credenciales alineadas por línea en ambos archivos. Login exitoso con:

- **Usuario:** `admin`
- **Contraseña:** `rKXM59ESxesUFHAd`

## Flags

| Flag | Hash |
|------|------|
| Root | `c7110277ac44d78b6a9fff2232434d16` |

## Lecciones

- FTP anónimo en producción es misconfiguration crítica — expone archivos del servidor directamente
- Superficie de ataque HTTP no se limita a la raíz; siempre enumerar directorios
- Credenciales entre servicios se reutilizan — cruzar información de todos los vectores encontrados
