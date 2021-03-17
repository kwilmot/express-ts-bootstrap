## PREP STAGE
FROM node:lts-alpine AS prep
LABEL stage=builder
WORKDIR /app
COPY . /app
RUN npm i

## TEST STAGE
FROM prep AS test
LABEL stage=builder
RUN npm run test

## BUILD STAGE
FROM prep AS build
LABEL stage=builder
RUN npm run build

## PRODUCTION STAGE
FROM node:lts-alpine
ENV PORT 5050
WORKDIR /app
COPY --from=build /app/package-lock.json /app
COPY --from=build /app/package.json /app
COPY --from=build /app/dist /app
RUN npm ci --only=production
CMD ["node", "server.js"]
EXPOSE $PORT
