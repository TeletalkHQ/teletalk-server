FROM node:20-bookworm
# FROM node:18-alpine3.15

WORKDIR /teletalk-server

RUN npm i -g pnpm

COPY package.json ./
COPY tsconfig.json ./

RUN pnpm i

COPY configs/ configs/
COPY environments/ environments/
COPY modules/ modules/
COPY public/ public/
COPY index.ts ./
COPY loader.js ./

COPY src/ src/

RUN npm run build

USER node

CMD npm run start:production:local

EXPOSE 9000
