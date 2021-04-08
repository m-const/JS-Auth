FROM node:14.16.0-alpine3.13
ARG APP_NAME="Anura"
ARG APP_PORT=3000

#this is insecure - should be done via docker secrets using swarm
ARG ARG_ACCESS_TOKEN_SECRET
ARG ARG_REFRESH_TOKEN_SECRET

ENV PORT=$APP_PORT
ENV ACCESS_TOKEN_SECRET=$ARG_ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$ARG_REFRESH_TOKEN_SECRET

#copy the app
COPY app.tar.gz /var/www/$APP_NAME

WORKDIR /var/www/$APP_NAME
#start the app
RUN npm install app.tar.gz
CMD ['npm','startProd']