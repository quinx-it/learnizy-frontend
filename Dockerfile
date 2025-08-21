FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock* .yarnrc.yml* ./
COPY .yarn ./.yarn

RUN corepack enable && yarn install --immutable

FROM node:22-alpine AS builder
WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarn ./.yarn

RUN corepack enable && yarn build

FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]