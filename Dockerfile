FROM node:16-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

RUN git config --global user.email "dev@example.com" && \
    git config --global user.name "dev"

COPY package*.json ./
RUN npm install

COPY client/package*.json ./client/
RUN npm install --prefix client && \
    npm install --prefix client sass@1.32.13 --save-exact

COPY . .

RUN git init && git add -A && git commit -m "init" || true

RUN npm run build:client && \
    npm run build:tsc

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/client/build ./public
COPY package*.json ./
RUN npm install --production

RUN mkdir -p /app/data

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "build/server.js"]
