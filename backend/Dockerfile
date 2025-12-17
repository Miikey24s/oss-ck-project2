FROM php:5.6-apache
RUN docker-php-ext-install mysql mysqli pdo pdo_mysql
# Silence ServerName warning and enable rewrites
RUN echo "ServerName localhost" > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername \
    && a2enmod rewrite
COPY public/ /var/www/html/
