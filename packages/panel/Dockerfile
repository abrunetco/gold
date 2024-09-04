# development image (STAGE 1/1)
# FROM node:18-alpine AS development
FROM oven/bun:alpine AS development
WORKDIR /app/packages/web
CMD ["bun", "run", "dev"]

# # production image (STAGE 1/2)
# FROM node:18-alpine as build
# WORKDIR /app
# COPY . .
# RUN yarn install --production
# RUN yarn build

# # production image (STAGE 2/2)
# FROM node:18-alpine
# WORKDIR /app
# COPY --from=build package.json yarn.lock dist ./
# RUN yarn install --production
# CMD ["node", "./dist/index.js"]
# EXPOSE 3000