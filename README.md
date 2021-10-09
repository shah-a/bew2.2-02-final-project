# BEW 2.2: Final Project

## Description

The goal of this project is to dockerize a multi-service codebase.

The codebase I've chosen is [adhan-api](https://github.com/shah-a/bew1.3-06-adhan-api)

Note: The purpose of this repo is to demonstrate understanding of Dockerfiles and docker-compose files. Therefore, the full fileset of adhan-api is not present here (i.e. docs and other miscellaneous files). Additionally, future updates to adhan-api will not be reflected here.

## Usage

```bash
Coming
```

To test if the app is working:
`$ curl http://localhost:3000/`

To test if a connection was established with the database:
`$ curl http://localhost:3000/users`

For more documentation, see the project's [(original repo](https://github.com/shah-a/bew1.3-06-adhan-api).

## Customization

A custom port can be specified in a `.env` file:

```
PORT=yourport
```

Docker-compose will look for the file in the project's root directory and override the default port (i.e., 3000).

Note: the `PORT` variable specifies what port docker-compose should set for the app inside of its container. On the host machine, the app will be mapped to port 3000.

## Notes to self:

https://github.com/ufoscout/docker-compose-wait

```yaml
environment:
  WAIT_HOSTS: mongo:27017
```
