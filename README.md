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
$ cd ../carpeta
```

1. Instalar dependencias

```sh
$ npm install
```

2. Correr webpack

```sh
$ npm run dev
```

El comando dev iniciará Webpack y le indicará que esté atento a los cambios en los archivos JS y SCSS, para volver a compilar los assets.

## 3. Configuración del entorno
El plugin dotenv-webpack se incluye en este proyecto. Este le permite almacenar toda su información confidencial en un archivo .env.

El archivo .env debe contener todas las variables de entorno que necesita la aplicación, pero sin los datos reales y debe contener variables vacías o valores predeterminados que puedan ser utilizados por todos. Las variables se reemplazarán durante la compilación de activos para que solo se agreguen aquellas variables a las que se hace referencia en el código.

Es un esquema común usar una sintaxis en mayúsculas para las variables de entorno, como puede ver en el siguiente Los comentarios dentro de los archivos .env comienzan con un hash (#).

Para acceder a las variables hacerlo de la siguiente forma:

```sh
`${process.env.SCHEDULED_SESSIONS_SERVER_ROUNDS}`
```

## 4. Compilar carpeta /dist
Se creará la carpeta dist con toda la estructura de la app.
```sh
$ npm run build
```
Este comando le indicará a webpack que se ejecute en modo de producción y compila todos los activos en una versión reducida.