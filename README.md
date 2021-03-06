# express-ts-bootstrap

## Purpose
This repository is built to help quickly bootstrap new express projects written in Typescript.
It is somewhat opinionated in regard to tooling, but comes with linters, hooks, and testing framework already configured.

## Tools
* Typescript
* Jest
* Eslint
* Prettier
* Husky

## Getting Started
This repository aims to be as seamless and user-friendly as possible. For these reasons, we have provided scripts in
the package.json to run the server locally or via Docker containers.

*Don't forget to `npm install`*
### Local Dev Environment
*Local Dev will not provide you with a Postgres DB instance. You must provide and manage your own if you go this route.
We recommend checking out the Docker environment for quicker access to a DB instance*

To test code during the development cycle, use the script `start:dev`, which utilizes ts-node-dev to allow hot reloading
on changes.

To test code as it would appear in production, use the script `start`, which compiles your TS and starts the node server
traditionally.
### Docker Dev Environment
*You must have Docker installed to use these commands*

To test code during the development cycle, use the script `docker:start:dev`, which will use Dockerfiles and Docker compose
to spin up a container for your code and a container for a Postgres DB. This command also mounts your directory to the container
and runs the code via ts-node-dev, so hot reloading occurs even in the container.

To stop and remove your dev instance of the server, AND the db (including all data stored within), run `docker:teardown:dev`.

To test code as it would appear in production, use the script `docker:start`, which will use Dockerfiles and Docker compose
to spin up a container for the compiled code and a container for the PostgresDB. This command does NOT mount your directory
and instead builds your code and feeds only the built code to the container, just like a production system might.

To stop and remove your instance of the server, AND the db (including all data stored within), run `docker:teardown`.

## What's next?
* API testing framework is not provided
* API Documentation is not provided
* AuthN/AuthZ middleware or framework is not provided
* CI Pipeline tooling is not provided

*We wanted to leave certain choices up to the user of this template. Please check out the other branches on this repository
as some of them will have more tooling configured, leaving you with less choice but less initial overhead.*