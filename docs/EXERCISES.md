# Estado verificable de los ejercicios

Preparado el 26 de octubre de 2026. "Implementado" no significa que una cuenta
externa ya esté configurada. Las verificaciones remotas pendientes se indican
explícitamente para no presentar como terminadas actividades no ejecutadas.

| Ejercicio | Implementación / evidencia | Verificación pendiente |
| --- | --- | --- |
| 11.1 | `exercise1.md`: reflexión sobre Python y CI | Revisión personal del texto |
| 11.2 | Fork y clon del proyecto oficial; dependencias instaladas; pruebas, lint, build y servidor probados | Ninguna local |
| 11.3–11.4 | `hello.yml`: saludo, fecha y listado; [ejecución exitosa](https://github.com/Diegolph/full-stack-open-pokedex/actions/runs/40345473859) | Ninguna |
| 11.5 | Pipeline inicial; [fallo esperado](https://github.com/Diegolph/full-stack-open-pokedex/actions/runs/40345473799) | Ninguna |
| 11.6 | Configuración Node de ESLint, formato, import y logs corregidos | Confirmar ejecución verde en GitHub |
| 11.7 | Tests y build en pipeline; fallo local original en `evidence/initial-tests.txt` | La ejecución inicial remota se detuvo en lint; no llegó a Jest |
| 11.8 | Enlace Next corregido; 7 tests originales pasan; no se cambió ninguna aserción | Confirmar ejecución remota |
| 11.9 | Playwright: portada, detalle, navegación y endpoints; 3 tests pasan | Confirmar ejecución remota |
| 11.10 | `render.yaml` y comandos de despliegue preparados | Crear servicio y verificar despliegue manual |
| 11.11 | Deploy hook con SHA exacto y espera de salud/versión | Configurar secreto y variables; verificar push real |
| 11.12 | `/health`, `/version`, healthCheckPath; simulación local de fallo | Probar despliegue roto y recuperación en Render |
| 11.13–11.14 | Disparador PR y despliegue exclusivo de push a main | Abrir PR, comprobar CI y fusionar |
| 11.15 | Job de tag patch después del despliegue verificado | Comprobar tag remoto tras conectar Render |
| 11.16 | Condición `#skip` en los mensajes del push | Verificar fusión con y sin `#skip` |
| 11.17 | Instrucciones de protección en `SETUP.md` | Activar aprobación y checks obligatorios en GitHub |
| 11.18 | Acción Discord fijada a SHA, éxito y fallo | Configurar webhook y comprobar ambos avisos |
| 11.19 | Workflow diario separado, ejecución manual y prueba local de fallo | Ejecutar contra URL pública y demostrar fallo remoto |
| 11.20 | Pipeline de agenda en rama `feat/part11-cicd`; lint, build, 15 tests y E2E pasan localmente | PR, secretos y despliegue de agenda |
| 11.21 | Rama de agenda lista para PR y guía para invitar al profesor | Protección sin bypass, invitación, revisión y fusión |

## Notas de implementación

- Los tests originales solo recibieron una limpieza de espacios finales exigida
  por ESLint; las aserciones se conservaron.
- Las respuestas de PokeAPI se controlan en Playwright para evitar fallos ajenos
  al proyecto. La agenda sí se prueba con su API local real.
- No se añadieron tokens ni webhooks al repositorio.
- La agenda conserva el almacenamiento en memoria del proyecto original; sus
  contactos se restablecen cuando el proceso se reinicia.
