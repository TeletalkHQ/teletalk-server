FROM node:16-alpine

WORKDIR /teletalk-server

COPY package*.json ./
COPY jsconfig.json ./
COPY environments/production.env environments/
COPY src/ src/
COPY public/ public/

RUN npm install
RUN npm run build

USER node

CMD [ "npm","run","start:production" ]

EXPOSE 8080