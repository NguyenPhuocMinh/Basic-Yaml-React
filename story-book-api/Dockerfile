FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 7979

CMD [ "node", "server.js" ]
