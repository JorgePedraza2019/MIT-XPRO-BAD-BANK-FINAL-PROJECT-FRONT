# Uses a base image with Node.js 18
FROM node:18-alpine

# Sets the working directory inside the container
WORKDIR /app

# Copies package.json and package-lock.json to the working directory
COPY package*.json ./

# Installs dependencies
RUN npm install

# Copies application files to the container
COPY . .

# Builds the application
RUN npm run build

# Exposes the port on which the application runs
EXPOSE 3000

# Starts the application
CMD ["npm", "start"]
