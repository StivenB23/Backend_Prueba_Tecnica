## Iniciar la Aplicación

### Con NestJS

Para iniciar la aplicación localmente utilizando NestJS, sigue estos pasos:

1. **Instalar Dependencias**: Asegúrate de tener todas las dependencias necesarias instaladas. Corre el siguiente comando en la raíz del proyecto:

    ```bash
    npm install
    ```

2. **Iniciar el Servidor de Desarrollo**: Para iniciar el servidor de desarrollo de NestJS, utiliza el siguiente comando:

    ```bash
    npm run start:dev
    ```

    Esto iniciará la aplicación en modo de desarrollo y estará disponible en [http://localhost:3000](http://localhost:3000).

3. **Construir y Ejecutar en Producción**:

    - **Construir el Proyecto**: Ejecuta el comando para construir la aplicación para producción:

      ```bash
      npm run build
      ```

    - **Iniciar la Aplicación en Producción**: Una vez construido, puedes iniciar el servidor de producción con:

      ```bash
      npm run start:prod
      ```

    La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Con Docker Compose

Para iniciar la aplicación utilizando Docker Compose, sigue estos pasos:

1. **Asegúrate de Tener Docker y Docker Compose Instalados**: Verifica que Docker y Docker Compose estén instalados en tu máquina.

2. **Construir y Levantar Contenedores**: Navega a la raíz del proyecto y corre el siguiente comando para construir las imágenes y levantar los contenedores:

    ```bash
    docker-compose up --build
    ```

    Esto construirá las imágenes según el `Dockerfile` y levantará los contenedores definidos en el archivo `docker-compose.yml`.

3. **Verificar la Aplicación**: Una vez que los contenedores estén en ejecución, la aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

4. **Parar los Contenedores**: Para detener y eliminar los contenedores, ejecuta:

    ```bash
    docker-compose down
    ```
