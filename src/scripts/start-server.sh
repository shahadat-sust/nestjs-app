#!/bin/bash

set -e
set -x

if [ "$RUN_MIGRATIONS" ]; then
  echo "... RUNNING MIGRATIONS ...";
  npm run typeorm:migration:run
fi

echo "... STARTING SERVER ...";
npm run build
npm run start:dev

