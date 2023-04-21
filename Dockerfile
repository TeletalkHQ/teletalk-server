FROM node:16-alpine

WORKDIR /teletalk-server

RUN npm install -g yarn --force

COPY package.json ./
COPY tsconfig.json ./

RUN yarn

COPY .vscode/ .vscode/
COPY environments/ environments/
COPY esbuild/ esbuild/
COPY modules/ modules/
COPY public/ public/
COPY .mocharc.json ./
COPY index.ts ./
COPY loader.js ./

COPY src/ src/
COPY testSrc/ testSrc/

RUN npm run build

USER node

# CMD npm run start:production:local
CMD npm run test:production:local && npm run start:production:local

EXPOSE $PORT
