#!/bin/sh
set -e

if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Exécution des migrations Drizzle..."
  bunx drizzle-kit migrate
fi

exec bun run start