#!/bin/sh
set -e

echo "[entrypoint] Waiting for database..."
until php -r "
try {
    new PDO(
        'pgsql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE') . ';sslmode=require',
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
    );
} catch (Exception \$e) {
    exit(1);
}
" 2>/dev/null; do
    echo "[entrypoint] Database not ready, retrying in 3s..."
    sleep 3
done

echo "[entrypoint] Running migrations..."
php artisan migrate --force

echo "[entrypoint] Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "[entrypoint] Configuring nginx port ${PORT:-80}..."
sed -i "s/\${PORT}/${PORT:-80}/" /etc/nginx/conf.d/default.conf

echo "[entrypoint] Starting server..."
exec "$@"
