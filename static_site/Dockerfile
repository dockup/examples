# Stage 1: Install dependencies and compile site
FROM node:10.15.0 AS build

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# Move static site to nginx container and serve it
FROM nginx:1.15-alpine

COPY ./dockup/conf/default.conf /etc/nginx/conf.d/default.conf
COPY ./dockup/run /dockup/run
COPY --from=build /app/dist /usr/share/nginx/html

CMD /dockup/run
