#!/bin/sh
set -eu

cat <<EOF >/usr/share/nginx/html/env-config.js
window.__APP_CONFIG__ = {
  FORMS_ENDPOINT: "${FORMS_ENDPOINT}"
};
EOF

exec "$@"
