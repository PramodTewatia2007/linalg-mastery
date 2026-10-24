# Multi-stage production build for Linear Algebra Mastery
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production runtime container
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=10000

COPY package*.json ./
RUN npm ci --omit=dev

COPY server/ ./server/
COPY src/data/ ./src/data/
COPY --from=builder /app/dist ./dist

EXPOSE 10000

CMD ["node", "server/index.js"]
