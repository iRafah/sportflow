########################################
# PHP + Composer + Node
########################################
FROM php:8.4-fpm

WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    nodejs \
    npm \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy app source
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader

# Install frontend dependencies and build assets
RUN npm install && npm run build

# Set proper permissions
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

CMD [ "php-fpm" ]