# Usa una imagen base con Node.js
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json a la carpeta de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos de la aplicación al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]
