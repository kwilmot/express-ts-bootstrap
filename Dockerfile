## Base Image
FROM node:14.17.0-alpine3.13 AS base
LABEL stage="base"
ENV PORT=80
EXPOSE $PORT
ENV NODE_ENV=production
WORKDIR /opt/express-ts-bootstrap
RUN chown node /opt/express-ts-bootstrap -R
USER node
COPY package*.json .
RUN npm ci --only=prodction --ignore-scripts \
    && npm cache clean --force
ENV PATH=/opt/express-ts-bootstrap/node_modules/.bin:$PATH

## Prep Stage
FROM base as prep
LABEL stage="prep"
ENV NODE_ENV=development
RUN npm install --only=development --ignore-scripts
WORKDIR /opt/express-ts-bootstrap/app

## Dev Stage
FROM prep as dev
LABEL stage="dev"
CMD ["ts-node-dev", "./src/server.ts"]

## Source Stage
FROM prep as source
LABEL stage="source"
COPY . .

## Test Stage
FROM source as test
LABEL stage="test"
CMD ["npm", "test"]

## Build Stage
FROM source as build
LABEL stage="build"
RUN tsc --project tsconfig.production.json

## Production Stage
FROM base as prod
LABEL stage="prod"
WORKDIR /opt/express-ts-bootstrap/app
COPY --from=build /opt/express-ts-bootstrap/app/package*.json /opt/express-ts-bootstrap/app/dist ./
CMD ["node", "server.js"]

