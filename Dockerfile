FROM nginx:alpine

# Salin konfigurasi Nginx kustom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Salin semua file statis ke direktori default Nginx
COPY . /usr/share/nginx/html

# Ekspos port 80 (HTTP)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
