FROM node:18-alpine
RUN apk update
RUN npm install -g pnpm
WORKDIR /app
COPY . /app/
RUN ls -a
RUN echo "strict-peer-dependencies=false" > .npmrc
RUN pnpm install --prod
RUN pnpm build
