FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json tailwind.config.ts postcss.config.mjs next.config.ts* next-env.d.ts* ./
COPY src ./src/

ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
