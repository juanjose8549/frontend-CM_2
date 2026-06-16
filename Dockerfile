FROM node:18-alpine AS build
ARG REACT_APP_API_URL=$_REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos un archivo de configuración base con un marcador de posición para el puerto.
# El directorio /etc/nginx/templates/ es una característica estándar de la imagen nginx:alpine.
# Los archivos .template que se coloquen aquí se procesan automáticamente al iniciar el contenedor.
RUN mkdir -p /etc/nginx/templates
RUN echo 'server { listen ${PORT}; server_name localhost; location / { root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html; } }' > /etc/nginx/templates/default.conf.template

# Exponemos el puerto (esto es solo informativo, no afecta la configuración)
EXPOSE ${PORT}
