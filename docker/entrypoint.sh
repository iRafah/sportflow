#!/bin/sh
set -e

echo "[entrypoint] Caching configuration..."
mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache storage/logs bootstrap/cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "[entrypoint] Configuring nginx port ${PORT:-80}..."
sed -i "s/\${PORT}/${PORT:-80}/" /etc/nginx/conf.d/default.conf

echo "[entrypoint] Starting server..."
exec "$@"
