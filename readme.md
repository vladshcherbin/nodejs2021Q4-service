# REST service

To run the project, follow the steps below. Docker with docker compose needs to be installed.

## Environment variables

Create `.env` file and define environment variables (example):

```env
PORT = 4000
POSTGRES_DB = api-dev
POSTGRES_PASSWORD = api2021
JWT_SECRET = EWSN870nN2F537jf0HpynxuornOqHXA8jYfE6anS
USE_FASTIFY = false
```

## Start server using docker

Create and run docker container:

```console
docker-compose up
```

Server should be up and running on 4000 port.

## Run migrations

Once server is up, execute migrations script in docker container:

```console
docker-compose run api yarn db:latest
```

## Install dependencies

Install project dependencies:

```console
npm i
```

## Run tests

Run auth tests using:

```console
npm run test:auth
```

## Lint project

Lint the project using:

```console
npm run lint
```
