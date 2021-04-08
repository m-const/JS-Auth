FROM node:14.16.0-alpine3.13
ARG APP_NAME="Anura"
ARG APP_PORT=3000

#this is insecure - should be done via docker secrets using swarm
ARG ARG_ACCESS_TOKEN_SECRET
ARG ARG_REFRESH_TOKEN_SECRET

ENV PORT=$APP_PORT
ENV ACCESS_TOKEN_SECRET=$ARG_ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$ARG_REFRESH_TOKEN_SECRET

#Create app location and set working directory
WORKDIR /var/www/$APP_NAME
COPY build/* /


#start the app
CMD ['npm','startProd']