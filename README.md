# BEW 2.2: Final Project

![Docker Image Version (latest by date)](https://img.shields.io/docker/v/alishah1/adhan-api?style=for-the-badge)
![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/alishah1/adhan-api?style=for-the-badge)

[Uptime Status Page](https://statuspage.freshping.io/57429-AlisCapRoverDroplet)

## Description

The goal of this project is to dockerize a multi-service codebase.

The codebase I've chosen is [adhan-api](https://github.com/shah-a/bew1.3-06-adhan-api)

Note: The purpose of this repo is to demonstrate understanding of Dockerfiles and docker-compose files. Therefore, the full fileset of adhan-api is not present here (i.e. docs and other miscellaneous files). Additionally, future updates to adhan-api will not be reflected here.

## CapRover Deployment

An `adhan-api` container is deployed via CapRover. It's base URL is accessible:

`https://adhan-api.dev.ashah.io/`

## Setup via `docker-compose`

1. Clone the repo
2. `$ cd` into the root directory
3. `$ docker-compose up`

### Usage

Check if the API is active by sending a `GET` request:

```http
GET http://localhost:3000/
```

Check if a connection was established with the database:

```http
GET http://localhost:3000/users
```

(It should return an empty array)

For more endpoints, see the project's [original repo](https://github.com/shah-a/bew1.3-06-adhan-api).

### Browse the Database

Open `http://localhost:3100` in your browser for a web-gui you can use to interact with the database (powered by [mongoku](https://github.com/huggingface/Mongoku)).

For there to be anything to interact with, you'll first need to `POST` data. Endpoint API docs are available from the [original project's docs](https://shah-a.github.io/bew1.3-06-adhan-api/#/).

But for now, here's a quick and simple example:

```http
POST http://localhost:3000/users
Accept: application/json
Content-Type: application/json

{
  "username": "admin",
  "password": "admin"
}
```

### Customization

The default port is `3000`. You can get docker-compose to override this by placing a `.env` file in the project's root directory with the following content:

```
PORT=your_port
```

Note: The `PORT` variable specifies which port the app's container will use internally. On the host machine (i.e. your computer), the app will still be mapped to port 3000. If you want the app to be mapped to a different port on your computer, you can set the port you want in `docker-compose.yml`.

## Setup via `docker build` and `docker run`:

From the project's root directory, build the container:

```bash
$ docker build -t adhan-api-image .
```

Run the container:

```bash
$ docker run -it --rm -p 3000:3000 \
--name adhan-api-container \
-e "PORT=3000" \
-e "MONGO_URI=your_mongo_uri" \
-e "SECRET=your_jwt_secret" \
adhan-api-image
```

**Make sure to set the env variables accordingly! Especially `MONGO_URI`!**

For example, if you're running a mongo container like this:

```bash
$ docker run -d --rm --name mongo mongo:4
```

(or, for persistent data, with the additional option: `-v mongo:/data/db`)

Then you might set your env variables (and a `--link` option) like this:

```bash
$ docker run -it --rm -p 3000:3000 \
--name adhan-api-container \
--link mongo \
-e "PORT=3000" \
-e "MONGO_URI=mongodb://mongo/adhan-api" \
-e "SECRET=your_jwt_secret" \
adhan-api-image
```

Another example might be that you're running a mongo container on a CapRover server and you want to connect to your CapRover MongoDB remotely from your computer.

In that case, first go to your CapRover MongoDB app dashboard and make sure to map an available server port (e.g. `9001`) to MongoDB's container port (by default: `27017`).

And then you might set your env variables like this:

```bash
$ docker run -it --rm -p 3000:3000 \
--name adhan-api-container \
-e "PORT=3000" \
-e "MONGO_URI=mongodb://user:pass@123.123.123.123:9001/adhan-api?authSource=admin" \
-e "SECRET=your_jwt_secret" \
adhan-api-image
```

You may need to add an exception to your server's firewall rules for it to receive a connection on the port you chose (`9001` in this case).

For example, on an Ubuntu server, you might do:

```bash
$ ssh root@123.123.123.123
```

Then:

```
root@caprover:~# ufw allow 9001
```

This will add two new rules to your firewall settings. One without a label, and one with a `v6` label.

Note: If you want to revert your firewall settings back, you can easily do so. Check port `9001`'s rule numbers via `$ ufw status numbered` and delete them via `$ ufw delete #`, where `#` is the rule number.

## 📋 Project Requirements

Create a file in the root of your project named `requirements.md`, then paste the table of requirements below.

**Use the ✅ column to keep track of your progress**! Be sure to check off each requirement _**before**_ you commit and push to GitHub.

|  Category  | Requirement                                                                                          | ✅ |
|:---------- |------------------------------------------------------------------------------------------------------|:-:|
| **🐳 Docker** | Repository contains a `Dockerfile` and a `docker-compose.yml` file                               | ✅ |
| **🐳 Docker** | `Dockerfile` and `docker-compose.yml` file build without error                                   | ✅ |
| **⚙️ Deployment** | Project deployed on CapRover using your own domain                                           | ✅ |
| **⚙️ Deployment** | Uptime monitored by FreshPing or another health check service                                | ✅ |
|  **📝 Docs**  | `README` includes [badges](https://shields.io) for image size, ~~build status~~, and website monitoring | ✅ |
|  **📝 Docs**  | `README` includes instructions on how to build and run your container                               | ✅ |
