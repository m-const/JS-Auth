FROM node:14.16-alpine3.13
ARG APP_NAME="app"
ARG APP_PORT=3000

#this is insecure - should be done via docker secrets using swarm
ARG ARG_ACCESS_TOKEN_SECRET
ARG ARG_REFRESH_TOKEN_SECRET

ENV PORT=$APP_PORT
ENV ACCESS_TOKEN_SECRET=$ARG_ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$ARG_REFRESH_TOKEN_SECRET

#copy the app
WORKDIR /usr/src/$APP_NAME/
COPY package/ ./



#start the app
RUN npm ci --only=production
CMD node server.js