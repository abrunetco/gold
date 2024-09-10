# development image (STAGE 1/1)
# FROM node:18-alpine AS development
FROM oven/bun:alpine AS development
WORKDIR /wdir/packages/api
CMD ["bun", "compile", "&&", "bun", "dev"]

# production image (STAGE 1/2)
FROM oven/bun:alpine AS build
WORKDIR /wdir
COPY . .
RUN yarn install --production
RUN yarn build

# production image (STAGE 2/2)
FROM oven/bun:alpine AS serve
WORKDIR /wdir
COPY --from=build package.json yarn.lock dist ./
RUN yarn install --production
CMD ["node", "./dist/index.js"]
EXPOSE 3000