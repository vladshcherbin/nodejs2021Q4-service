FROM node:16-alpine

WORKDIR /home/node/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]
