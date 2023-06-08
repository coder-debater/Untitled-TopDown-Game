import { IMAGE_TYPE, stopTime, DEBUG } from "./config.js";
import { canvas, c } from "./initData.js";
import { log, s, registerRenderers } from "./debug.js";
import { getLand, player } from "./movePlayer.js";
log("render.js start");

// Tiles

// Size of one tile
const TILE_SIZE = Math.min(canvas.width, canvas.height) / 28;
// get image and set correct dimensions
function _img(name) {
  // Get image
  const img = document.querySelector("#" + name + IMAGE_TYPE);

  // Set dimensions
  img.width = TILE_SIZE;
  img.height = TILE_SIZE;

  return img;
}
const PLAYER_IMAGE = _img("player");
const TILE_IMAGES = {
  " ": _img("grass"),
  "-": _img("path"),
  G: _img("grassSide"),
  C: _img("cobblestone"),
  S: _img("stone"),
  B: _img("stoneBricks"),
};

// Render

function _render() {
  let currentTiles = getLand(player.land.truePos).tiles;
  for (let y = 0; y < currentTiles.length; y++) {
    let row = currentTiles[y];
    for (let x = 0; x < row.length; x++) {
      const tilePosition = [x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE];
      let tileTextContent = row[x];
      c.clearRect(...tilePosition);
      const tileImg = TILE_IMAGES[tileTextContent];
      if (tileImg) {
        c.drawImage(tileImg, ...tilePosition);
      }
    }
    c.drawImage(
      PLAYER_IMAGE,
      player.tile.x * TILE_SIZE,
      player.tile.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
  }
  return s`Finished rendering`;
}
// Same as _render() but asynchronous
async function _asyncRender() {
  return _render();
}
let renderCallback;
let rendering = false;
if (stopTime > 0) {
  let start = null;
  let prevTimestamp = null;
  renderCallback = function (timestamp) {
    if (start === null) {
      start = timestamp;
    }
    // Stop animation after stopTime seconds
    if (timestamp - start >= stopTime) {
      rendering = false;
    }
    if (rendering) {
      // Only render if time has passed
      if (prevTimestamp !== timestamp) {
        _render();
      }
      // Update for next call
      prevTimestamp = timestamp;
      window.requestAnimationFrame(renderCallback);
    } else {
      // Reset variables
      start = null;
      prevTimestamp = null;
    }
  };
} else {
  renderCallback = function () {
    if (rendering) {
      _render();
      window.requestAnimationFrame(renderCallback);
    }
  };
}
function render() {
  if (rendering) {
    return s`Already starting rendering`;
  }
  rendering = true;
  window.requestAnimationFrame(renderCallback);
  return s`Starting rendering`;
}
function unrender() {
  if (rendering) {
    rendering = false;
    return s`Stopping rendering`;
  }
  return s`Already stopped rendering`;
}
/*
let interval = null;
function render() {
        if (interval === null) {
            interval = setInterval(_render, 100);
            return s`Starting rendering`;
        }
        return s`Already starting rendering`;
    }
});
function unrender() {
        if (interval === null) {
            return s`Already stopped rendering`;
        }
        clearInterval(interval);
        interval = null;
        return s`Stopped rendering`;
    }
});
*/
if (DEBUG) {
  registerRenderers(render, unrender, _asyncRender);
  start;
}

log("render.js end");

export default render;