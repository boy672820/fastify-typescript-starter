# 1. Install dependencies
FROM node:20 AS deps

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 100000

# 2. Rebuild the source code
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY . .
COPY .env.production .env.production

RUN yarn build

# # 3. Production image, copy all the files and run nest
FROM node:20 AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env.production ./.env.production

COPY ./docker/production/entrypoint ./entrypoint

EXPOSE 8080

ENV HOST=0.0.0.0

RUN chmod +x ./entrypoint

ENTRYPOINT ./entrypoint
