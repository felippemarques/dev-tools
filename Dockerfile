# Usa a imagem oficial do PHP com Apache
FROM php:8.2-apache

# Habilita mod_rewrite (para URLs amigáveis)
RUN a2enmod rewrite

# === CORREÇÃO DA PORTA 3000 ===
# Altera a porta de escuta do Apache de 80 para 3000
RUN sed -i 's/Listen 80/Listen 3000/' /etc/apache2/ports.conf
# Altera o VirtualHost padrão para responder na porta 3000
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost *:3000>/' /etc/apache2/sites-available/000-default.conf

# === CORREÇÃO DA ORDEM DE ARQUIVOS (INDEX.HTML PRIMEIRO) ===
# Força o Apache a procurar index.html ANTES de index.php
RUN echo "DirectoryIndex index.html index.php" >> /etc/apache2/apache2.conf

# === MOSTRAR ERROS PHP (PARA DEBUGAR TELA BRANCA) ===
# Copia o arquivo de configuração de desenvolvimento (mostra erros na tela) para produção
# Quando tudo estiver 100%, você pode remover esta linha
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

# Copia os arquivos do projeto
COPY . /var/www/html/

# === CORREÇÃO DE PERMISSÕES ===
# O Docker copia como 'root', mas o Apache roda como 'www-data'.
# Isso corrige a "Tela Branca" causada por falta de permissão de leitura.
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# Expõe a porta para o Coolify
EXPOSE 3000