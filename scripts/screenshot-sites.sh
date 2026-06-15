#!/usr/bin/env bash
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

shot() {
  local url="$1" out="$2"
  echo "→ $url"
  "$CHROME" \
    --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --window-size=1400,900 \
    --virtual-time-budget=8000 \
    --screenshot="$out" \
    "$url" >/dev/null 2>&1 || true
  [[ -s "$out" ]] && echo "  wrote $(basename "$out") ($(du -h "$out" | cut -f1))" || echo "  FAILED"
}

shot https://www.freshbuyzar.com/        "$ROOT/content/featured/FreshBuyzar/demo.png"
shot https://www.qrcodecreator.io/       "$ROOT/content/featured/QRCodeCreator/demo.png"
shot https://seoplaybook.ai/             "$ROOT/content/featured/SEOPlaybookAI/demo.png"

mkdir -p "$ROOT/content/projects/images"
shot https://riderschoice.algobeat.com/  "$ROOT/content/projects/images/riders-choice.png"
shot https://www.yokeintegration.com/    "$ROOT/content/projects/images/yoke-integration.png"
