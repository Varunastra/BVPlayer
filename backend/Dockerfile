FROM node:14-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn
COPY . /app
RUN yarn build