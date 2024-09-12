# Documentación de la API QuickbetMovies

## Introducción

Proporcione una breve descripción de su API. Explique su propósito y los problemas que soluciona.

## Tecnologías Usadas

A continuación, se presentan las tecnologías utilizadas en el desarrollo de esta API, junto con enlaces a su documentación oficial:

- **[Node.js](https://nodejs.org/en/docs/)**: Entorno de ejecución para JavaScript en el servidor, que permite construir aplicaciones escalables y de alto rendimiento.
- **[Docker](https://docs.docker.com/)**: Plataforma que permite empaquetar aplicaciones y sus dependencias en contenedores, facilitando el despliegue y la gestión de entornos.
- **[NestJS](https://docs.nestjs.com/)**: Framework para desarrollar aplicaciones del lado del servidor utilizando TypeScript y Node.js, con un enfoque modular y basado en componentes.
- **[TypeScript](https://www.typescriptlang.org/docs/)**: Lenguaje de programación que extiende JavaScript con tipos estáticos, lo que ayuda a detectar errores en tiempo de compilación y mejorar la calidad del código.
- **[MongoDB](https://www.mongodb.com/docs/manual/)**: Base de datos NoSQL orientada a documentos, que permite almacenar datos en formato JSON y realizar consultas flexibles.


**Ejemplo:**

Base URL: `http://http://localhost:3000/v1`

## URL Base

Especifique la URL base para los puntos finales de la API.

## Autenticación y Autorización

### Autenticación

La API utiliza JSON Web Tokens (JWT) para la autenticación. Todos los puntos finales requieren un token JWT válido en el encabezado `Authorization`.

- **Encabezado:** `Authorization: Bearer <token>`
- **Obtención del Token:** El token JWT se obtiene al iniciar sesión en [nuestro sitio web](https://example.com/login). Debe enviar sus credenciales para recibir un token.

### Autorización

Dependiendo del endpoint, el token JWT puede necesitar permisos específicos. Asegúrese de que el token esté asociado con los permisos requeridos para acceder a ciertos recursos.

## Puntos Finales

### 1. **Obtener Usuarios**

- **Endpoint:** `/users`
- **Método:** `GET`
- **Descripción:** Recupera una lista de usuarios.
- **Encabezado de Solicitud:**
  ```http
  Authorization: Bearer TU_TOKEN_JWT

- **400 Bad Request:** La solicitud está mal formada o falta algún parámetro requerido.
- **401 Unauthorized:** La clave API está ausente o es inválida.
- **404 Not Found:** El recurso solicitado no existe.
- **500 Internal Server Error:** Ocurrió un error inesperado en el servidor.

Para soporte, por favor contáctenos en [stiven23ospina@gmail.com](mailto:stiven23ospina@gmail.com).

