---
titulo: "Keeper"
descripcion: "Explotación de credenciales por defecto en Request Tracker, acceso SSH y extracción de credenciales KeePass desde un volcado de memoria."
fecha: 2024-10-05
dificultad: easy
herramientas: ["nmap", "KeePass", "keepass-dump-masterkey", "python3", "ssh"]
categoria: htb
plataforma: HackTheBox
puntos: 20
completado: true
---

## Reconocimiento

```bash
nmap -sC -sV -oA keeper 10.10.11.227
```

Puertos abiertos: **22/tcp (SSH)**, **80/tcp (HTTP)**

## Foothold

El servidor web corre **Request Tracker 4.4.4**. Credenciales por defecto `root:password` dan acceso al panel de administración. En la sección de tickets encontramos una contraseña en texto plano en los comentarios.

## Escalada de Privilegios

El usuario `lnorgaard` tiene en su home un archivo `KeePassDumpFull.dmp`. Usando `keepass-dump-masterkey` extraemos la master password parcialmente y la completamos con el contexto del volcado.

```bash
python3 keepass_dump.py -f KeePassDumpFull.dmp
# Output: rødgrød med fløde
```

Con la base de datos KeePass desbloqueada obtenemos la clave privada SSH de root.

## Flags

| Flag | Hash |
|------|------|
| User | `3e92ad...` |
| Root | `7f1b9c...` |
