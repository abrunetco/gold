FROM nginx:1.27.1-alpine AS development
COPY default.conf /etc/nginx/conf.d/default.conf

FROM development
COPY ./public /usr/share/nginx/html