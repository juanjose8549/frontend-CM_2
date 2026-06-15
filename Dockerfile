FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { listen ${PORT}; server_name localhost; location / { root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/run.conf
CMD sh -c "envsubst '\${PORT}' < /etc/nginx/conf.d/run.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
EXPOSE ${PORT}