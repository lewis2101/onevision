FROM node:lts-alpine as build-stage

WORKDIR .

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine as production-stage

COPY --from=build-stage /dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



#docker build -t NAME . - building image
#docker run -d -p LOCAL-PORT:IMAGE-PORT --name NAME IMAGE-NAME create container
#docker ps ACTIVE CONTAINERS
#docker images LIST IMAGES
#docker pull NAME-IMAGE - install image
