########################################
# Stage 1: Node builder (Vite assets)
########################################
FROM node:20-alpine AS node-builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY vite.config.js postcss.config.js tailwind.config.js ./
COPY resources/ resources/
COPY public/ public/

RUN npm run build

########################################
# Stage 2: PHP base (shared extensions)
########################################
FROM php:8.4-fpm AS base

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

########################################
# Stage 3: Development
########################################
FROM base AS development

RUN apt-get update && apt-get install -y nodejs npm \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

RUN composer install --no-interaction
RUN npm install && npm run build
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]

########################################
# Stage 4: Production (docker-compose VPS)
########################################
FROM base AS production

COPY . .

# Copy pre-built frontend assets from node-builder stage
COPY --from=node-builder /app/public/build public/build

# Ensure required directories exist before composer post-install scripts run
RUN mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Install PHP deps without dev dependencies
RUN composer install --no-dev --no-interaction --optimize-autoloader

RUN chown -R www-data:www-data storage bootstrap/cache

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]

########################################
# Stage 5: Render (nginx + php-fpm, single container)
########################################
FROM production AS render

RUN apt-get update && apt-get install -y nginx supervisor \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /var/log/supervisor \
    && rm -f /etc/nginx/sites-enabled/default

COPY docker/nginx/render.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
