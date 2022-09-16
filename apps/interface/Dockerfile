FROM node:18-alpine
RUN apk update
RUN npm install -g pnpm
WORKDIR /app
COPY . /app/
RUN ls -a
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm install --prod
RUN pnpm build
