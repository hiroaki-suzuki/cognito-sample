FROM nginx:1.23.1

ARG BUILD_FILES_DIR=dist/front/
COPY ${BUILD_FILES_DIR} /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf