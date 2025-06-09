#!/usr/bin/env bash

set -eo pipefail

if [[ -z "${BWS_PROJECT_ID:-}" ]]; then
  echo "error: environment variable 'BWS_PROJECT_ID' must be defined"
  exit 1
fi

SECRET_DEV_VAL="$(cat .env)"
if [[ -z "${DEV:-}" ]]; then
  bws secret create "DEV" "${SECRET_DEV_VAL}" "${BWS_PROJECT_ID}"
else
  SECRET_ID="$(bws secret list "${BWS_PROJECT_ID}" | jq -rc --arg k "DEV" 'first(.[] | select(.key == $k)).id')"
  bws secret edit --value "${SECRET_DEV_VAL}" --project-id "${BWS_PROJECT_ID}" "${SECRET_ID}"
fi
