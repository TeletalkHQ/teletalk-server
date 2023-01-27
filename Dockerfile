FROM node:16-alpine

WORKDIR /teletalk-server

RUN npm install -g yarn --force

COPY package.json ./
COPY yarn* ./

RUN yarn

COPY jsconfig.json ./

COPY environments/ environments/

COPY requirements/ requirements/

COPY src/ src/
COPY public/ public/
COPY index.js ./

# COPY test/ test/

COPY esbuild.config.json ./
COPY esbuildEntryPoint.js ./

RUN npm run build

USER node

CMD npm run start:production:local
# CMD npm run test:production:local && npm run start:production:local

EXPOSE 8081
