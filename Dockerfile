# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Development: Node + install + Nuxt dev server (use with docker-compose)
# -----------------------------------------------------------------------------
FROM node:22-bookworm-slim AS development

# better-sqlite3 (Nuxt Content) may compile from source if a prebuild is unavailable
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV HOST=0.0.0.0
ENV NODE_ENV=development

EXPOSE 3000

# Bind-mounted project: postinstall runs `nuxt prepare`; then dev on all interfaces
CMD ["sh", "-c", "npm install && exec npm run dev -- --host 0.0.0.0 --port 3000"]

# -----------------------------------------------------------------------------
# Production: build Nuxt Nitro output and run the Node server
# -----------------------------------------------------------------------------
FROM node:22-bookworm-slim AS deps

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

FROM deps AS builder

COPY . .

RUN npm run build

FROM node:22-bookworm-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nuxt

COPY --from=builder --chown=nuxt:nodejs /app/.output /app/.output

USER nuxt

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
