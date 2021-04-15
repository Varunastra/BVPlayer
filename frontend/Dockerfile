FROM node:14-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN yarn
COPY . /app
RUN yarn build