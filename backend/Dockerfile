FROM php:5.6-apache
RUN docker-php-ext-install mysql mysqli pdo pdo_mysql
COPY public/ /var/www/html/
