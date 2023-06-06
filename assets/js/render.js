/* render.js */

// Debug mode

function log(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}
function s(x) {
  // return s`Data`
  if (DEBUG) {
    return x.raw;
  }
}

// Tiles

// Size of one tile
const TILE_SIZE = Math.min(canvas.width, canvas.height) / 28;

// 'grass' => <img id='grass' width=TILE_SIZE etc />
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
  "#": _img("grassSide"),
};
// TODO: real wall texture // TODO: real wall texture // TODO: real wall texture //
// TODO: real wall texture // TODO: real wall texture // TODO: real wall texture //
// TODO: real wall texture // TODO: real wall texture // TODO: real wall texture //

// Render

function _render() {
  log("_render(): start");

  let currentTiles = getPlayerLand().tiles;
  for (let y = 0; y < currentTiles.length; y++) {
    let row = currentTiles[y];
    for (let x = 0; x < row.length; x++) {
      const tilePosition = [x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE];
      let tileTextContent = row[x];
      c.clearRect(...tilePosition);
      c.drawImage(TILE_IMAGES[tileTextContent], ...tilePosition);
      if (equivXY(playerTilePos, x, y)) {
        c.drawImage(PLAYER_IMAGE, ...tilePosition);
      }
    }
  }

  log("_render(): finished");
  return s`Finished rendering`;
}

// Same as _render() but with Promise()
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
  renderCallback = function (timestamp) {
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

// Debugging helpers

Object.defineProperty(window, "start", { get: render });
Object.defineProperty(window, "stop", { get: unrender });
Object.defineProperty(window, "reload", {
  get: () => {
    _asyncRender();
    return s`Now reloading`;
  },
});
