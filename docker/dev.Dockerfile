FROM node:lts-alpine
ENV PORT 5050
RUN npm i -g ts-node-dev typescript
WORKDIR /app
VOLUME /app
#--poll appears to be necesarry in Windows environments, though it adds cpu resource usage
CMD ["ts-node-dev", "--poll", "--respawn", "--no-notify", "--ignore-watch", "node_modules", "./src/server.ts"]
EXPOSE $PORT
