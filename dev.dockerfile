FROM node:18

WORKDIR /usr/src/app

COPY eslint.config.mjs ./
COPY jest.config.ts ./
COPY jest.preset.js ./
COPY tsconfig.base.json ./
COPY ./apps ./apps

EXPOSE 80
EXPOSE 4200

ENV APP_NAME=app1

CMD sh -c "npx nx serve $APP_NAME"