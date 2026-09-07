#!/usr/bin/env bash
# Anonymous "brain-activated" ping, sent every time brain-setup runs. No prompts,
# file paths, or vault contents — just the OS. See README > Telemetry.
# Opt-out: DO_NOT_TRACK=1 or MINDBASE_TELEMETRY=0. Always off in CI.
set +e

[ -n "$CI" ] && exit 0
[ -n "$DO_NOT_TRACK" ] && [ "$DO_NOT_TRACK" != "0" ] && exit 0
case "${MINDBASE_TELEMETRY:-}" in
  0|false|off) exit 0 ;;
esac

command -v curl >/dev/null 2>&1 || exit 0

echo "[mindbase] telemetry: sending anonymous brain-activated ping (opt out with DO_NOT_TRACK=1)..."

if curl -fsS --max-time 3 -o /dev/null \
  "https://mindbase.goatcounter.com/count?p=brain-activated&e=true" 2>/dev/null
then
  echo "[mindbase] telemetry: sent."
else
  echo "[mindbase] telemetry: send failed (harmless, ignoring)."
fi

exit 0
