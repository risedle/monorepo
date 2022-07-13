FROM node:18-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy source code to /app/ folder
COPY . /app/

# check files list
RUN ls -a

RUN npm install

CMD ["node", "./dist/cron.js"]
