# Configuración y comprobación de los ejercicios

## Entorno local

Node 24.19.0, npm y Git. El material mezcla ejemplos de Node 16 y 20;
este repositorio se verifica con Node 24 y fija la misma versión en Render y CI.

```sh
npm ci
npm run eslint
npm test -- --runInBand
node --test scripts/check-health.test.cjs
npm run build
npx playwright install chromium
npm run test:e2e
npm run start-prod
```

La aplicación de producción escucha en el puerto 5000 por defecto.
Para desarrollo: `npm start`.
En Windows PowerShell, si la política bloquea npm.ps1, usa `npm.cmd` y `npx.cmd`.
Los tests de navegador usan respuestas controladas para PokeAPI; verifican el
servidor y el bundle reales, sin depender de la disponibilidad del proveedor.

## Render (11.10–11.12)

Crear un Web Service asociado a este fork, rama `main`, usando `render.yaml`
como referencia. Elegir el plan Free si está disponible en la cuenta.

| Opción | Valor |
| --- | --- |
| Root Directory | vacío |
| Build Command | `npm ci --include=dev && npm run build` |
| Start Command | `npm run start-prod` |
| NODE_VERSION | `24.19.0` |
| Health Check Path | `/health` |
| Auto-Deploy | Off |

Realizar primero un despliegue manual y comprobar `/`, `/health` y `/version`.
`/version` devuelve `RENDER_GIT_COMMIT` para identificar el código desplegado.

En GitHub → Settings → Secrets and variables → Actions:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| Secret | `RENDER_DEPLOY_HOOK_URL` | Deploy Hook completo de Render |
| Variable | `APP_URL` | URL HTTPS pública, sin `/health` |
| Variable | `DEPLOY_ENABLED` | `true`, después del despliegue manual |
| Secret | `DISCORD_WEBHOOK_URL` | Webhook del canal autorizado |
| Variable | `NOTIFICATIONS_ENABLED` | `true`, cuando el webhook esté configurado |

No poner secretos en archivos, commits, capturas ni mensajes.
Si `DEPLOY_ENABLED` no está activo, CI prueba el código pero NO despliega ni crea
tags. Esto permite preparar el repositorio sin aparentar un despliegue exitoso.
`workflow_dispatch` solo comprueba el código; el despliegue requiere un push a main.

El script fija el SHA en el deploy hook y espera tanto `/health = ok` como
`/version = SHA probado`. Recibir HTTP 200 de una versión anterior no basta.
El trabajo de versionado depende del éxito del despliegue y sube un tag patch.

Para la demostración del 11.12, después de tener un despliegue sano, hacer un
commit temporal que devuelva 503 en `/health`; verificar en Render que falla y
que se conserva la versión anterior. Revertir ese commit y verificar recuperación.
Esta demostración remota queda pendiente hasta conectar Render; el test local
`scripts/check-health.test.cjs` ya simula 503, contenido erróneo y versión antigua.

## Pull requests, #skip y protección (11.13–11.17)

Los PR hacia main ejecutan lint, pruebas, build y navegador, sin desplegar ni
crear tags. Para demostrar el bloqueo, introducir un error en una rama,
comprobar el fallo de CI y corregirlo antes de fusionar.

Si algún mensaje del conjunto de commits recibido en el push contiene `#skip`,
se omiten despliegue y tag, conservando las verificaciones. Usar **Create a merge
commit** para conservar los mensajes de la rama. Con squash, incluir `#skip`
en el mensaje final de squash porque se reemplazan los mensajes originales.

Settings → Branches → Add classic branch protection rule → `main`:

- Require a pull request before merging.
- Require approvals: 1.
- Require status checks to pass: **Quality checks**.
- Require branches to be up to date before merging.

Para 11.21 activar además **Do not allow bypassing the above settings** en el
repositorio de la agenda. No fusionar ese PR antes de recibir la revisión.

## Notificaciones y tareas periódicas (11.18–11.19)

Discord recibe éxito solo después de un despliegue verificado y versionado;
los fallos incluyen SHA, rama y enlace a los logs. Hace falta configurar el
webhook y comprobar un caso exitoso y otro fallido para completar la actividad.

`health.yml` hace una comprobación diaria a las 15:17 UTC (09:17 en Ciudad de
México). También se puede ejecutar manualmente desde Actions. Una URL inválida,
un HTTP no exitoso o un cuerpo distinto de `ok` hace fallar el trabajo.
No se ha creado ninguna automatización adicional fuera de GitHub Actions.

## Aplicación propia y entrega (11.20–11.21)

Repositorio: https://github.com/Diegolph/phonebook-backend

El pipeline de esa aplicación está en la rama `feat/part11-cicd` y se entrega
mediante PR. Su frontend ya estaba compilado en `dist`; el build valida sus
referencias y ensambla el backend y frontend en `release`, sin inventar fuentes
React que no existen en ese repositorio. Las pruebas E2E usan su API real.

Invitar a `mattiluukkainen` como colaborador de la agenda y pedir revisión del PR.
Avisar en Discord con el enlace de invitación de colaborador, según el curso.
Después de la aprobación, fusionar y comprobar el despliegue. En la entrega del
curso usar este repositorio de Pokédex, que enlaza al segundo repositorio.

Fuentes: [curso](https://fullstackopen.com/es/part11/),
[despliegues Render](https://render.com/docs/deploys),
[Playwright](https://playwright.dev/docs/test-webserver).
