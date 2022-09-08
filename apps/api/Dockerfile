FROM node:18-alpine

# update packages
RUN apk update

# install pnpm
RUN npm install -g pnpm

# create root application folder
WORKDIR /app

# copy source code to /app/ folder
COPY package.json /app/
COPY dist /app/

# check files list
RUN ls -a

RUN pnpm install --prod
