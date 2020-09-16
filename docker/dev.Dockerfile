FROM node:lts-alpine
ENV PORT 5050
RUN npm i -g ts-node-dev typescript
WORKDIR /app
VOLUME /app
CMD ["ts-node-dev", "--respawn", "--no-notify", "--ignore-watch", "node_modules", "./src/server.ts"]
EXPOSE $PORT
