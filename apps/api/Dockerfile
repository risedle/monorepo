# syntax=docker/dockerfile:1.4

### Stage 1: Deployment
FROM node:18-alpine AS deployer
RUN apk update
RUN npm install -g pnpm
WORKDIR /app
COPY . /app/
RUN ls -a
RUN pnpm --filter api --prod deploy deployment

### Stage 2: Copy
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deployer /app/deployment .
