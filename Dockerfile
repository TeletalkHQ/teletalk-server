FROM node:16-alpine

WORKDIR /teletalk-server

COPY package*.json ./

RUN npm install

COPY jsconfig.json ./

COPY environments/development.env environments/

COPY src/ src/
COPY test/ test/
COPY public/ public/
COPY startupRequirements/ startupRequirements/
COPY index.js ./

USER node

CMD [ "npm","run","start:dev" ]

EXPOSE 8080
