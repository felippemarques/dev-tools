FROM php:8.2-apache

# Habilita mod_rewrite
RUN a2enmod rewrite

# === AJUSTE DE PORTA (COOLIFY) ===
RUN sed -i 's/Listen 80/Listen 3000/' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost *:3000>/' /etc/apache2/sites-available/000-default.conf

# === A MÁGICA: HABILITAR .HTACCESS ===
# Por padrão, o Apache bloqueia .htaccess na raiz. Isso libera.
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Copia os arquivos
COPY . /var/www/html/

# Ajusta permissões
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

EXPOSE 3000