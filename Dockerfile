# Usa una imagen base oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Exponer el puerto que utiliza NestJS
EXPOSE 3300

RUN npm run build

CMD [ "node", "dist/main.js"]
