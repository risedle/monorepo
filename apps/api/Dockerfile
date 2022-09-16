FROM node:18-alpine
RUN apk update
RUN npm install -g pnpm
WORKDIR /app
COPY . /app/
RUN ls -a
RUN pnpm install --prod

