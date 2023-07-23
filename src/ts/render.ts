import { IMAGE_TYPE, stopTime, DEBUG } from "./config.js";
import { canvas, c } from "./initData.js";
import { log, s, registerRenderers } from "./debug.js";
import { getLand, player } from "./movePlayer.js";
import { ImagePos } from "./types.js";
log("render.js start");

// Tiles

const CANVAS_MIN_DIM: number = Math.min(canvas.width, canvas.height);
// Size of one tile
const getTileSize: (maxTileDim: number) => number = (maxTileDim: number) =>
  CANVAS_MIN_DIM / maxTileDim;
function img(name: string): (size: number) => HTMLImageElement {
  return function (size: number): HTMLImageElement {
    // Get image
    const imgMaybe: HTMLImageElement | null = document.querySelector(
      "#" + name + IMAGE_TYPE
    );
    // Ensure it exists
    if (!imgMaybe) {
      throw new Error(`Image ${name} not found`);
    }
    const img: HTMLImageElement = imgMaybe as HTMLImageElement;

    // Set dimensions
    img.width = size;
    img.height = size;

    return img;
  };
}
const player_image: (size: number) => HTMLImageElement = img("player");
const tile_images: {
  [key: string]: (size: number) => HTMLImageElement;
} = {
  " ": img("grass"),
  "-": img("path"),
  G: img("grassSide"),
  C: img("cobblestone"),
  S: img("stone"),
  B: img("stoneBricks"),
};
const TILE_TYPES: string[] = Object.keys(tile_images);
function toTilePos(startX: number, startY: number, size: number): ImagePos {
  return [startX * size, startY * size, size, size];
}

// Render

function _render(): string | undefined {
  let currentTiles: string[] = getLand(player.land.truePos).tiles;
  // Get tiles height
  const size = getTileSize(
    Math.max(currentTiles.length, ...currentTiles.map((row) => row.length))
  );
  for (let y: number = 0; y < currentTiles.length; y++) {
    let row: string = currentTiles[y];
    for (let x: number = 0; x < row.length; x++) {
      const tilePosition: ImagePos = toTilePos(x, y, size);
      let tileTextContent: string = row[x];
      c.clearRect(...tilePosition);
      if (TILE_TYPES.includes(tileTextContent)) {
        c.drawImage(tile_images[tileTextContent](size), ...tilePosition);
      }
    }
    c.drawImage(
      player_image(size),
      ...toTilePos(player.tile.x, player.tile.y, size)
    );
  }
  return s`Finished rendering`;
}
// Same as _render() but asynchronous
async function _asyncRender(): Promise<string | undefined> {
  return _render();
}
// Note that _timestamp starts with _ to avoid warnings
let renderCallback: (_timestamp: number) => void;
let rendering: boolean = false;
if (stopTime > 0) {
  let start: number | null = null;
  let prevTimestamp: number | null = null;
  renderCallback = function (_timestamp: number) {
    if (start === null) {
      start = _timestamp;
    }
    // Stop animation after stopTime seconds
    if (_timestamp - start >= stopTime) {
      rendering = false;
    }
    if (rendering) {
      // Only render if time has passed
      if (prevTimestamp !== _timestamp) {
        _render();
      }
      // Update for next call
      prevTimestamp = _timestamp;
      window.requestAnimationFrame(renderCallback);
    } else {
      // Reset variables
      start = null;
      prevTimestamp = null;
    }
  };
} else {
  renderCallback = function (_timestamp: number) {
    if (rendering) {
      _render();
      window.requestAnimationFrame(renderCallback);
    }
  };
}
function render(): string | undefined {
  if (rendering) {
    return s`Already starting rendering`;
  }
  rendering = true;
  window.requestAnimationFrame(renderCallback);
  return s`Starting rendering`;
}
function unrender(): string | undefined {
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
  (window as any).start; // defined in debug.ts registerRenderers()
  // use "as any" to silence errors
  // TODO: silence errors properly
}

log("render.js end");
