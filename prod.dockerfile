FROM node:18

RUN npm install -g @nestjs/cli nx

WORKDIR /usr/src/app

COPY package*.json ./
COPY nx.json ./

RUN npm install --legacy-peer-deps

COPY eslint.config.mjs ./
COPY jest.config.ts ./
COPY jest.preset.js ./
COPY tsconfig.base.json ./
COPY ./apps ./apps

RUN mkdir /tmp/vault

EXPOSE 80
EXPOSE 4200

ENV APP_NAME=app1

CMD sh -c "npx nx serve $APP_NAME"