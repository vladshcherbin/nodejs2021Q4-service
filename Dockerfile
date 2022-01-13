FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile && yarn cache clean

COPY . .

CMD ["yarn", "dev"]
