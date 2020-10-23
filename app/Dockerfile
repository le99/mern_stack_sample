# https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/


FROM node:10 as build

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install --loglevel verbose

COPY ./client .

RUN npm run build


FROM node:10

WORKDIR /usr/src/app

COPY ./server/package*.json ./

RUN npm install --loglevel verbose

COPY ./server .
COPY --from=build /app/build/ ./public


# COPY --from=build /app/package.json ./public/

EXPOSE 3001

CMD [ "node", "bin/www" ]
