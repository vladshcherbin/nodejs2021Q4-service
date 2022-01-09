# REST service

To run the project, follow the steps below. Docker with docker compose needs to be installed.

## Install dependencies

First, install dependencies:

```console
npm i
```

## Start server using docker

Create and run docker container:

```console
docker-compose up
```

Server should be up and running on 4000 port.

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
