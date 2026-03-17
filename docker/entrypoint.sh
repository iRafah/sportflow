#!/bin/sh
set -e

echo "[entrypoint] Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "[entrypoint] Configuring nginx port ${PORT:-80}..."
sed -i "s/\${PORT}/${PORT:-80}/" /etc/nginx/conf.d/default.conf

echo "[entrypoint] Starting server..."
exec "$@"
