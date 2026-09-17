#!/usr/bin/env python3
"""Build the cloud dot art from the braille cloud references.

The references are screenshots of braille art, so the dots already sit on a
grid. This reads the dot centres straight out of the PNGs rather than trying
to redraw them: every dot in the reference becomes one 4px circle here, and
the spacing between braille cells (which is uneven by design) is preserved,
because that irregularity is most of what makes the art look hand-made.

The output SVGs are used as CSS masks, not as images, so a single piece can
be filled with flat white in one place and with the sunset photograph in
another.

Run from the mockups directory:  python3 generate-clouds.py
"""

import os
from collections import deque

import numpy as np
from PIL import Image

REF_DIR = "/home/ubuntu/.cursor/projects/workspace/assets"

REFS = {
    "wisps": f"{REF_DIR}/e2fa42d8-fea0-4733-92b6-942b2bfc8b34.png",
    "group": f"{REF_DIR}/a69e8fa0-dc30-4b9d-aae3-42c42eebc023.png",
    "big": f"{REF_DIR}/d12f98ed-3bd2-4975-9940-36bf5373d778.png",
}

DOT_DIAMETER = 4  # the size asked for; never scale a mask off this
OUT_PITCH = 6  # centre-to-centre in the output, so dots stay separate

# Crops in source pixels, picked by eye off the references. The two
# four-pointed sparkles in the `group` reference are deliberately left out.
CLOUDS = {
    "long": ("group", (246, 120, 494, 224)),
    "puff": ("group", (384, 239, 496, 296)),
    "mass": ("big", (2, 0, 496, 250)),
    # The wisps are cropped narrow on purpose: a side bank has to fit in the
    # page margin beside the reading column, so its widest part sets its width.
    "wisp_top": ("wisps", (0, 12, 172, 112)),
    "wisp_mid": ("wisps", (0, 138, 172, 222)),
    "wisp_low": ("wisps", (0, 208, 172, 266)),
    "wisp_bottom": ("wisps", (184, 252, 356, 302)),
    "wisp_right": ("wisps", (332, 52, 476, 148)),
    "wisp_trail": ("wisps", (232, 122, 298, 238)),
}

# Parts are (cloud, x offset in cells, gap in cells above this part, flipped).
# Y positions stack automatically, which is what "extend vertically" means
# here: the references are restacked rather than redrawn.
PIECES = {
    # Side banks: a tall column, wisps carrying between the fuller clouds.
    "cloud-bank": {
        "stack": [
            ("wisp_top", 0, 0, False),
            ("wisp_trail", 24, -4, False),
            ("puff", 2, 1, False),
            ("wisp_mid", 0, 3, False),
            ("wisp_right", 8, -2, True),
            ("wisp_low", 1, 3, False),
            ("puff", 14, 2, True),
            ("wisp_bottom", 0, 1, False),
            ("wisp_trail", 20, 2, True),
            ("wisp_top", 2, 3, True),
        ],
    },
    # Corner clusters: the single dense cloud, which has the most weight.
    "cloud-corner": {"stack": [("mass", 0, 0, False)]},
    # Crest above the hero name.
    "cloud-crest": {"stack": [("long", 0, 0, False)]},
    # Heading ornament: the smallest complete cloud, boxed to 5:2.
    "cloud-heading": {"stack": [("puff", 0, 0, False)], "ratio": 2.5},
}


def dot_centroids(path):
    """Centre of every dot in a braille screenshot, in source pixels."""
    grey = np.asarray(Image.open(path).convert("L")).astype(float)
    mask = grey > (grey.min() + grey.max()) * 0.5
    height, width = mask.shape
    seen = np.zeros_like(mask, bool)
    dots = []
    for y in range(height):
        for x in range(width):
            if not mask[y, x] or seen[y, x]:
                continue
            queue = deque([(y, x)])
            seen[y, x] = True
            pixels = []
            while queue:
                cy, cx = queue.popleft()
                pixels.append((cy, cx))
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        ny, nx = cy + dy, cx + dx
                        if (
                            0 <= ny < height
                            and 0 <= nx < width
                            and mask[ny, nx]
                            and not seen[ny, nx]
                        ):
                            seen[ny, nx] = True
                            queue.append((ny, nx))
            # Anti-aliased single pixels are noise, not dots.
            if len(pixels) >= 3:
                dots.append(
                    (
                        sum(p[1] for p in pixels) / len(pixels),
                        sum(p[0] for p in pixels) / len(pixels),
                    )
                )
    return dots


def dot_pitch(dots):
    """Median nearest-neighbour distance: the reference's own dot spacing."""
    pts = np.array(dots)
    gaps = []
    for i, p in enumerate(pts):
        d = np.hypot(pts[:, 0] - p[0], pts[:, 1] - p[1])
        d[i] = np.inf
        gaps.append(d.min())
    return float(np.median(gaps))


def load_refs():
    loaded = {}
    for name, path in REFS.items():
        dots = dot_centroids(path)
        loaded[name] = (dots, dot_pitch(dots))
    return loaded


def cloud_cells(refs, cloud):
    """A cloud's dots as grid-cell coordinates, origin at its own top left."""
    ref_name, (x0, y0, x1, y1) = CLOUDS[cloud]
    dots, pitch = refs[ref_name]
    inside = [(x, y) for x, y in dots if x0 <= x <= x1 and y0 <= y <= y1]
    if not inside:
        raise ValueError(f"crop for {cloud} caught no dots")
    cells = [((x - x0) / pitch, (y - y0) / pitch) for x, y in inside]
    width = max(c[0] for c in cells)
    height = max(c[1] for c in cells)
    return cells, width, height


def compose(refs, spec):
    placed = []
    cursor = 0.0
    for cloud, dx, gap, flip in spec["stack"]:
        cells, width, height = cloud_cells(refs, cloud)
        cursor += gap
        for cx, cy in cells:
            x = (width - cx) if flip else cx
            placed.append((x + dx, cy + cursor))
        cursor += height
    return placed


def to_svg(name, dots, ratio=None):
    xs = [d[0] for d in dots]
    ys = [d[1] for d in dots]
    x0, y0 = min(xs), min(ys)
    dots = [(x - x0, y - y0) for x, y in dots]

    radius = DOT_DIAMETER / 2
    pad = radius + 1  # keep edge dots from being clipped by the viewBox
    width = max(d[0] for d in dots) * OUT_PITCH + pad * 2
    height = max(d[1] for d in dots) * OUT_PITCH + pad * 2
    shift_x = shift_y = 0.0

    if ratio:
        # Box the piece to the asked-for aspect without distorting the dots:
        # whichever axis is short gets padding, and the art stays centred.
        if width / height > ratio:
            target = width / ratio
            shift_y = (target - height) / 2
            height = target
        else:
            target = height * ratio
            shift_x = (target - width) / 2
            width = target

    circles = "".join(
        f'<circle cx="{x * OUT_PITCH + pad + shift_x:.1f}" '
        f'cy="{y * OUT_PITCH + pad + shift_y:.1f}" r="{radius:g}"/>'
        for x, y in dots
    )
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width:.0f}" '
        f'height="{height:.0f}" viewBox="0 0 {width:.0f} {height:.0f}">'
        f'<g fill="#000">{circles}</g></svg>'
    )

    path = os.path.join("art", f"{name}.svg")
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(svg + "\n")
    return path, round(width), round(height), len(dots)


def main():
    os.makedirs("art", exist_ok=True)
    refs = load_refs()
    for name, (dots, pitch) in refs.items():
        print(f"{name}: {len(dots)} dots, source pitch {pitch:.2f}px")

    print()
    for name, spec in PIECES.items():
        dots = compose(refs, spec)
        path, width, height, count = to_svg(name, dots, spec.get("ratio"))
        print(f"{path}: {width}x{height}px, {count} dots, ratio {width / height:.2f}")


if __name__ == "__main__":
    main()
