FROM nginx:alpine

# Salin semua file statis ke direktori default Nginx
COPY . /usr/share/nginx/html

# Ekspos port 80 (HTTP)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
