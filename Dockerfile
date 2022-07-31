# Install dependencies only when needed
FROM node:18-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh libc6-compat
WORKDIR /monorepo
COPY . .
RUN npm install
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

