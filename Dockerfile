FROM node:18-alpine3.15

WORKDIR /teletalk-server

RUN npm i -g npm

RUN npm i -g yarn --force

COPY package.json ./
COPY tsconfig.json ./

RUN yarn

COPY environments/ environments/
COPY configs/ configs/
COPY modules/ modules/
COPY public/ public/
COPY index.ts ./
COPY loader.js ./

COPY src/ src/
COPY testSrc/ testSrc/

RUN npm run build

USER node

CMD npm run start:production:local
# CMD npm run test:production:local && npm run start:production:local

EXPOSE 9000
