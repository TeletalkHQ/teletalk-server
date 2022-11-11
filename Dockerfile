FROM node:16-alpine

WORKDIR /teletalk-server

COPY package*.json ./

RUN npm install
COPY jsconfig.json ./

COPY environments/development.env environments/

COPY src/ src/
COPY public/ public/

USER node

CMD [ "npm","run","start:dev" ]

EXPOSE 8080
