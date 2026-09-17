#!/usr/bin/env python3
"""Generate the cloud dot art the mockup uses for decoration.

Every piece is a union of soft ellipse lobes sampled onto a fixed grid. A dot
is either there or it is not, and every dot is the same 4px circle, so the art
reads as one material no matter where it appears. Tone comes from dot density:
edges are dithered with an ordered Bayer matrix, which is what lets a cloud
fade out instead of stopping on an outline.

The SVGs are consumed as CSS masks, not as images. That is what allows the
same piece to be filled with flat white in one place and with the fixed sunset
photograph in another.

Run from the mockups directory:  python3 generate-clouds.py
"""

import math
import os

DOT_DIAMETER = 4  # the size asked for; do not scale the SVG in CSS
SPACING = 7  # centre-to-centre, so dots stay separate at every size

BAYER = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
]

# Lobes are (centre x, centre y, radius x, radius y) in grid cells.
# Wide, flat lobes read as cirrus streaks; round ones read as cumulus.
#
# `feather` sets how much of a lobe is dithered rather than solid: a high
# value keeps almost the whole piece in halftone, which is what makes a mass
# of dots read as vapour instead of as a block.
#
# `fade` thins the piece out along an axis, so an edge bank is dense where it
# leaves the page and dissolves as it reaches the reading column.
PIECES = {
    # Tall bank meant to bleed off the side edge of a section, the way the
    # botanical art does on the reference sites.
    "cloud-bank": {
        "cols": 34,
        "rows": 92,
        "feather": 1.15,
        "fade": ("x", 1.0, 0.22),
        "lobes": [
            (0, 8, 16, 7),
            (10, 5, 11, 4),
            (18, 10, 13, 4.5),
            (4, 15, 15, 5),
            (22, 17, 17, 1.8),
            (-2, 25, 13, 6),
            (8, 30, 17, 5.5),
            (19, 26, 11, 4),
            (14, 36, 13, 4),
            (24, 39, 15, 1.6),
            (0, 45, 15, 6.5),
            (12, 50, 13, 5),
            (21, 45, 10, 3.5),
            (25, 56, 14, 1.5),
            (2, 61, 14, 6),
            (14, 66, 16, 5),
            (23, 61, 9, 3.5),
            (22, 73, 16, 1.7),
            (0, 79, 14, 6),
            (10, 84, 13, 4.5),
            (18, 90, 13, 1.4),
        ],
    },
    # Small wide wisp that replaces the rule above each section heading.
    "cloud-heading": {
        "cols": 38,
        "rows": 9,
        "feather": 0.6,
        "lobes": [
            (13, 4, 7, 2.8),
            (20, 3.2, 5.5, 2.2),
            (26, 4.6, 4.5, 1.8),
            (19, 6, 15, 1.1),
            (6, 6.2, 7, 0.9),
            (31, 5.8, 6, 0.9),
        ],
    },
    # Crest that sits above the hero name.
    "cloud-crest": {
        "cols": 40,
        "rows": 12,
        "feather": 0.55,
        "lobes": [
            (20, 6, 7.5, 3.4),
            (13, 7, 5.5, 2.6),
            (27, 7, 5.5, 2.6),
            (20, 9, 16, 1.2),
            (5, 9.6, 6, 0.9),
            (35, 9.6, 6, 0.9),
        ],
    },
    # Corner cluster, densest toward the top-left of its own box.
    "cloud-corner": {
        "cols": 36,
        "rows": 20,
        "feather": 1.05,
        "fade": ("corner", 1.0, 0.18),
        "lobes": [
            (2, 3, 13, 5),
            (12, 7, 13, 5),
            (22, 3, 10, 3.5),
            (6, 13, 11, 4),
            (20, 15, 15, 2.4),
            (30, 9, 8, 3),
        ],
    },
}

# The menu icon is spelled out by hand: a dithered cloud would not read as a
# control. Same dot size as everything else, so it belongs to the same set.
GRIDS = {
    "menu-open": [
        "#####",
        ".....",
        "#####",
        ".....",
        "#####",
    ],
    "menu-close": [
        "#...#",
        ".#.#.",
        "..#..",
        ".#.#.",
        "#...#",
    ],
}


def fade_factor(x, y, cols, rows, fade):
    if fade is None:
        return 1.0
    axis, near, far = fade
    if axis == "x":
        t = x / max(cols - 1, 1)
    else:  # distance from the top-left corner of the piece
        t = min(1.0, math.hypot(x / max(cols - 1, 1), y / max(rows - 1, 1)))
    return near + (far - near) * t


def density(x, y, cols, rows, lobes, feather, fade):
    """Coverage at a cell: 1 inside the cloud, tapering to 0 past its edge."""
    field = 0.0
    for cx, cy, rx, ry in lobes:
        t = math.sqrt(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2)
        field = max(field, 1.0 - t)
    if field <= 0:
        return 0.0
    # A slow ripple keeps the dithered edge from reading as a regular screen.
    ripple = 0.86 + 0.28 * math.sin(x * 0.7) * math.cos(y * 0.55)
    coverage = field / feather * ripple * fade_factor(x, y, cols, rows, fade)
    return min(1.0, coverage)


def dots_from_lobes(cols, rows, lobes, feather, fade):
    for row in range(rows):
        for col in range(cols):
            threshold = (BAYER[row % 8][col % 8] + 0.5) / 64.0
            if density(col, row, cols, rows, lobes, feather, fade) > threshold:
                yield col, row


def dots_from_grid(grid):
    for row, line in enumerate(grid):
        for col, char in enumerate(line):
            if char != ".":
                yield col, row


def write_svg(name, cols, rows, dots):
    width = cols * SPACING
    height = rows * SPACING
    radius = DOT_DIAMETER / 2
    offset = SPACING / 2

    circles = "".join(
        f'<circle cx="{col * SPACING + offset:g}" cy="{row * SPACING + offset:g}" '
        f'r="{radius:g}"/>'
        for col, row in dots
    )

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}">'
        f'<g fill="#000">{circles}</g>'
        f"</svg>"
    )

    path = os.path.join("art", f"{name}.svg")
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(svg + "\n")
    return path, width, height, svg.count("<circle")


def main():
    os.makedirs("art", exist_ok=True)

    for name, spec in PIECES.items():
        dots = list(
            dots_from_lobes(
                spec["cols"],
                spec["rows"],
                spec["lobes"],
                spec["feather"],
                spec.get("fade"),
            )
        )
        path, width, height, count = write_svg(
            name, spec["cols"], spec["rows"], dots
        )
        print(f"{path}: {width}x{height}px, {count} dots")

    for name, grid in GRIDS.items():
        dots = list(dots_from_grid(grid))
        path, width, height, count = write_svg(
            name, len(grid[0]), len(grid), dots
        )
        print(f"{path}: {width}x{height}px, {count} dots")


if __name__ == "__main__":
    main()
