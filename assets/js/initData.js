/* initData.js */

// Constants

const canvas = document.getElementById("game");
const c = canvas.getContext("2d");

// Map

let map = {
  ragni: {
    name: "Ragni",
    landPos: { x: 0, y: 0 },
  },
  trail: {
    name: "Emerald Trail",
    landPos: { x: 1, y: 0 },
  },
};

// Tiles

function _toTiles(s) {
  return s.slice(1, -1).replaceAll(".", "").split("\n");
}

map.ragni.tiles = _toTiles(`
                            .
                            .
                            .
                            .
                            .
                           #.
                           #.
                           #.
                          ##.
                          # .
                          ##.
                           #.
                          ##.
----------------------------..
----------------------------..
                          ##.
                           #.
                          ##.
                          # .
                          ##.
                           #.
                           #.
                           #.
                            .
                            .
                            .
                            .
                            .
`);

map.trail.tiles = _toTiles(`
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
----------------------------..
----------------------------..
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
                            .
`);
