# Full Stack Open — Parte 11: CI/CD

Soluciones sobre la Pokédex oficial del curso de la Universidad de Helsinki.

- [Guía de configuración, pruebas y entrega](docs/SETUP.md)
- [Estado de los ejercicios](docs/EXERCISES.md)
- [Ejercicio 11.1](exercise1.md)
- **Aplicación propia (11.20–11.21):** [phonebook-backend](https://github.com/Diegolph/phonebook-backend)
- [Pull request de la aplicación propia](https://github.com/Diegolph/phonebook-backend/compare/main...feat/part11-cicd)

El pipeline comprueba lint, Jest, salud, build y Playwright. Los PR solo ejecutan
verificaciones. Los pushes a main pueden desplegar a Render y crear un tag patch
cuando el SHA probado está disponible en producción. `#skip` omite despliegue y tag.
El despliegue y Discord requieren secretos y variables descritos en la guía.

## Proyecto de origen

This repository is used for the CI/CD module of the Full stack open course

Fork the repository to complete course exercises

## Commands

Start by running `npm install` inside the project folder

`npm start` to run the webpack dev server
`npm test` to run tests
`npm run eslint` to run eslint
`npm run build` to make a production build
`npm run start-prod` to run your production build
