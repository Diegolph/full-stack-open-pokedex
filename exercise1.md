# Ejercicio 11.1: CI para un equipo de Python

Para una aplicación escrita en Python y desarrollada por seis personas, propondría
un proceso de integración continua que revise cada pull request antes de permitir
su incorporación a la rama principal. El objetivo sería detectar errores pronto
y mantener una versión que pueda publicarse de forma predecible.

Usaría Ruff para detectar problemas de estilo y errores frecuentes mediante
`ruff check`, y comprobaría el formato con `ruff format --check`. Ejecutaría las
pruebas con pytest, separando las pruebas unitarias de las que necesitan servicios
externos. Si distribuimos la aplicación como paquete, utilizaría `python -m build`
para generar las distribuciones wheel y de código fuente. Después comprobaría
que el paquete construido se instala y funciona en un entorno limpio. Las
dependencias y la versión de Python deberían quedar fijadas para reducir
diferencias entre desarrollo, integración y producción.

Además de Jenkins y GitHub Actions, podríamos considerar GitLab CI/CD, CircleCI
o Azure Pipelines. Compararía su integración con el repositorio, disponibilidad
de ejecutores, gestión de secretos, límites de ejecución y coste previsto.

Para este equipo elegiría inicialmente un servicio en la nube: evita dedicar
tiempo al mantenimiento de servidores y permite concentrarse en la aplicación.
Sin embargo, no decidiría únicamente por el tamaño del equipo. Preguntaría por
la frecuencia y duración de las pruebas, el presupuesto, las restricciones de
datos, el acceso a redes privadas y la necesidad de hardware especial.
Un ejecutor propio podría ser adecuado si existen requisitos de infraestructura
o confidencialidad que el servicio alojado no satisface. También exigiría
responsables claros para actualizarlo, aislar trabajos y recuperar el servicio
ante fallos.

## Fuentes

- [Ruff](https://docs.astral.sh/ruff/)
- [pytest](https://docs.pytest.org/en/stable/)
- [PyPA build](https://build.pypa.io/en/stable/)
- [GitLab CI/CD](https://docs.gitlab.com/ci/)
- [CircleCI](https://circleci.com/docs/)
- [Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/)
