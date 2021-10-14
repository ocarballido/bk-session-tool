# Gestor de sesiones programadas BKOOL

Esto es un proyecto front-end desarrolllado para gestionar las sesiones programadas en la plataforma BKOOL.

Está basado en [Bootstrap Framework](http://getbootstrap.com/) versión 5 y usa [Webpack](https://webpack.js.org/) versión 5 como module bundler.

The template is based on the [Bootstrap Framework](http://getbootstrap.com/) in version 5 and
uses [Webpack](https://webpack.js.org/) in version 5 as a flexible and modern module bundler. All common features for
front-end projects (like SCSS compilation, minifying of Assets, etc.) are included out of the box.

## Table of Contents

1. [Reuqerimientos](#1-reuqerimientos)
1. [Quick Start](#2-quick-start)
1. [Environment Configuration](#3-environment-configuration)
1. [Adding Google Fonts](#4-adding-google-fonts)
1. [Adding Responsive Images](#5-adding-responsive-images)
1. [Image Credits](#6-image-credits)

## 1. Reuqerimientos

Es necesario tener instalado [Node.js](https://nodejs.org/en/) en tu sistema.

## 2. Quick Start

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Correr webpack

   ```bash
   npm run dev
   ```

   El comando dev iniciará Webpack y le indicará que esté atento a los cambios en los archivos JS y SCSS, para volver a compilar los assets.

   If you want to compile all assets for production usage, run the following command.

   ```bash
   npm run build
   ```

   Este comando le indicará a webpack que se ejecute en modo de producción y compila todos los activos en una versión reducida.