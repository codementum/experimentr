for f in *.svg; do inkscape "$f" --export-png="${f%.svg}.png"; done
