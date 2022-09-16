FROM node:18-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh libc6-compat
RUN npm install -g pnpm
WORKDIR /app
COPY . /app/
RUN ls -a
ENV NEXT_TELEMETRY_DISABLED 1
RUN echo "strict-peer-dependencies=false" > .npmrc
RUN pnpm install --prod
RUN pnpm build
