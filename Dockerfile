FROM node:16-alpine

WORKDIR /teletalk-server

RUN npm install -g yarn --force

COPY package*.json ./
COPY yarn* ./

RUN yarn

COPY jsconfig.json ./

COPY environments/ environments/

COPY src/ src/
COPY test/ test/
COPY public/ public/
COPY startupRequirements/ startupRequirements/
COPY index.js ./
COPY esbuildEntryPoint.js ./

RUN npm run build

USER node

CMD [ "npm","run","start:production" ]

EXPOSE 8080
