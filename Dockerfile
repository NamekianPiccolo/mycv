FROM nginx:alpine

# Salin semua file statis ke direktori default Nginx
COPY . /usr/share/nginx/html

# Salin konfigurasi Nginx kustom untuk SSL
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ekspos port 80 (HTTP) dan 443 (HTTPS)
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
