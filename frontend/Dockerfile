FROM node:alpine

RUN npm install -g pnpm

WORKDIR /app

EXPOSE 3000

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD [ "pnpm", "run", "dev" ]