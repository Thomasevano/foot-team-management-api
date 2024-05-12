FROM node:lts-alpine3.18 as base

RUN npm i -g pnpm
# All deps stage
FROM base as deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Build stage
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV TZ=UTC
ENV PORT=8088
ENV HOST=0.0.0.0
ENV LOG_LEVEL=info
ENV APP_KEY=Apb-FnrW3heMTMqJ7_we5_MO2zicpmHD
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
