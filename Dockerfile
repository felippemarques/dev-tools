# Usa a imagem oficial do PHP com Apache (já configurada para Web)
FROM php:8.2-apache

# Habilita o mod_rewrite do Apache (útil para URLs amigáveis no futuro)
RUN a2enmod rewrite

# Ajusta o Apache para ouvir na porta 3000 (igual à tua config do Coolify)
RUN sed -i 's/80/3000/g' /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf

# Copia os arquivos do projeto para a pasta pública do Apache
COPY . /var/www/html/

# Define a porta exposta
EXPOSE 3000