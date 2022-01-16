# REST service

To run the project, follow the steps below. Docker with docker compose needs to be installed.

## Install dependencies

First, install dependencies:

```console
npm i
```

## Environment variables

Create `.env` file and define environment variables (example):

```env
PORT = 4000
POSTGRES_DB = api-dev
POSTGRES_PASSWORD = api2021
```

## Start server using docker

Create and run docker container:

```console
docker-compose up
```

Server should be up and running on 4000 port.

## Run migrations

Execute migrations scripts in docker container:

```console
docker-compose run api yarn db:latest
```

## Run tests

When the server is up, run tests:

```console
npm test
```

## Lint project

Lint the project using:

```console
npm run lint
```
