FROM node:12-alpine

RUN apk upgrade && \
    apk update && \
    apk add --update git && \
    # apk add nano && \
    apk add --update vim && \
    # apk --no-cache add --virtual builds-deps build-base python && \
    rm -rf /var/cache/apk/*

RUN mkdir -p /home/node/app/public && mkdir -p /home/node/app/storage && mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

ARG PORT

ENV PORT $PORT

EXPOSE $PORT

# RUN npm rebuild bcrypt --build-from-source

#############################

# FROM node:12-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# COPY package*.json ./

# USER node

# # RUN npm install

# COPY --chown=node:node . .

# ARG PORT

# ENV PORT $PORT

# EXPOSE $PORT

# CMD [ "node", "server/server.js" ]
# # CMD [ "npm", "run", "dev"]