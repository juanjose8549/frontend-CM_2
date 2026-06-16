#!/bin/sh
set -e

# 1. Sustituir el puerto en la configuración de Nginx (igual que hacía el template)
export PORT=${PORT:-8080}
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# 2. Inyectar la URL de la API en un archivo JS que servirá el frontend
echo "window.__API_URL__ = '${REACT_APP_API_URL}';" > /usr/share/nginx/html/config.js

# 3. Arrancar Nginx en primer plano (no en segundo plano)
nginx -g "daemon off;"