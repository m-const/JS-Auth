#FROM node:14.16-alpine3.13
FROM node:lts
ARG APP_NAME="app"
ARG APP_PORT=3000
ARG BUILD_TAR
#this is insecure - should be done via docker secrets using swarm
ARG ARG_ACCESS_TOKEN_SECRET
ARG ARG_REFRESH_TOKEN_SECRET

ENV PORT=$APP_PORT
ENV ACCESS_TOKEN_SECRET=$ARG_ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$ARG_REFRESH_TOKEN_SECRET

#copy the app
WORKDIR /usr/src/$APP_NAME/
COPY $BUILD_TAR ./

#start the app
RUN npm install /usr/src/$APP_NAME/$BUILD_TAR
COPY package*.json ./
CMD npm run start