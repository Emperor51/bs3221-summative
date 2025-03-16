FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY dist/apps/website /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

