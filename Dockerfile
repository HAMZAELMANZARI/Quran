# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@12.11.2 --activate

# Copy package files and scripts (needed for preinstall)
COPY package.json pnpm-lock.yaml .npmrc ./
COPY scripts ./scripts
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .
RUN pnpm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config for SPA with security headers
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always; \
    add_header Content-Security-Policy "default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\''; style-src '\''self'\'' '\''unsafe-inline'\''; img-src '\''self'\'' data: https:; font-src '\''self'\'' data:; connect-src '\''self'\'' https://api.cms.itqan.dev https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev; media-src '\''self'\'' https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev; object-src '\''none'\''; base-uri '\''self'\''; form-action '\''self'\''" always; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(js|css|svg|png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$ { \
        expires 30d; \
        add_header Cache-Control "public, immutable"; \
        add_header X-Content-Type-Options "nosniff" always; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
