# Build stage - use debian-based node for better compatibility
FROM node:22-slim AS builder
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc ./
COPY scripts ./scripts

# Install pnpm globally using npm, then use pnpm for dependencies
RUN npm install -g pnpm@12 && pnpm install --frozen-lockfile || npm install

# Copy source
COPY . .
RUN npm run build

# Copy source
COPY . .
RUN pnpm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/Quran

# Nginx config for SPA with security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
