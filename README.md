# Gestor de sesiones programadas BKOOL

Esto es un proyecto front-end desarrolllado para gestionar las sesiones programadas en la plataforma BKOOL.

- Listar sesiones programadas
- Editar sesión programada
- Eliminar una ronda en una sesión programada
- Eliminar una sesión programada
- Añadir nueva sesión programada
- Filtrar:
  - Por fecha
  - Por usuario destacado
  - Por evento

Está basado en [Bootstrap Framework](http://getbootstrap.com/) versión 5 y usa [Webpack](https://webpack.js.org/) versión 5 como module bundler.

## 1. Reuqerimientos

Es necesario tener instalado [Node.js](https://nodejs.org/en/) en tu sistema.

## 2. Instalación
- [npm](https://www.npmjs.com/get-npm)

```sh
$ cd ../folder
$ npm install
$ npm run dev
```

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Correr webpack

   ```bash
   npm run dev
   ```

   El comando dev iniciará Webpack y le indicará que esté atento a los cambios en los archivos JS y SCSS, para volver a compilar los assets.

   ```bash
   npm run build
   ```

## Compilar carpeta /dist
Se creará la carpeta dist con toda la estructura de la app.
```sh
$ npm run build
```
Este comando le indicará a webpack que se ejecute en modo de producción y compila todos los activos en una versión reducida.