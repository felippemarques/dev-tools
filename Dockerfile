# Usa imagem leve do Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nossa configuração personalizada (Porta 3000)
COPY default.conf /etc/nginx/conf.d/

# Copia os arquivos do site
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/

# Expõe a porta 3000 (Informação para o Coolify)
EXPOSE 3000

# Inicia o servidor
CMD ["nginx", "-g", "daemon off;"]