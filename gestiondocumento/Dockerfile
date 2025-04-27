FROM node:23-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:23-slim

WORKDIR /usr/src/app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /usr/src/app ./

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo de Vite
CMD ["yarn", "dev", "--host", "0.0.0.0"]