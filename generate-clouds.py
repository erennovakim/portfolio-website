#!/usr/bin/env python3
"""The braille-dot cloud masks are retired.

The visual system now follows the Aromal Ashok / Eemon Roy / Cindy Huang
references: gallery paper, hairline rules, and no atmospheric sky art.
Running this script writes empty SVG placeholders so leftover mask paths
do not 404. It does not generate clouds.
"""

import os

OUT_DIR = "art"
PLACEHOLDERS = ("cloud-bank", "cloud-crest", "cloud-corner")
EMPTY_SVG = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" '
    'viewBox="0 0 1 1" fill="none"></svg>\n'
)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for name in PLACEHOLDERS:
        path = os.path.join(OUT_DIR, f"{name}.svg")
        with open(path, "w", encoding="utf-8") as handle:
            handle.write(EMPTY_SVG)
        print(f"{path}: empty placeholder (cloud art retired)")


if __name__ == "__main__":
    main()
