import { DEBUG } from "./config.js";
import { log } from "./debug.js";
import { map } from "./initData.js";
log("movePlayer.js start");

// Player

// Position on land
let playerTilePos = { x: 0, y: 14 };
// Which land are we in?
let playerLandPos = { x: 0, y: 0 };
// Player data interfacce
const player = {
  tile: {
    get x() {
      return playerTilePos.x;
    },
    get y() {
      return playerTilePos.y;
    },
    set x(newX) {
      playerTilePos.x = newX;
    },
    set y(newY) {
      playerTilePos.y = newY;
    },
    get truePos() {
      return playerTilePos;
    },
    get pos() {
      return {
        get x() {
          return playerTilePos.x;
        },
        get y() {
          return playerTilePos.y;
        },
        set x(newX) {
          playerTilePos.x = newX;
        },
        set y(newY) {
          playerTilePos.y = newY;
        },
      };
    },
    set pos(newPos) {
      playerTilePos = newPos;
    },
    shiftX: function (dx) {
      playerTilePos.x += dx;
    },
    shiftY: function (dy) {
      playerTilePos.y += dy;
    },
  },
  land: {
    get x() {
      return playerLandPos.x;
    },
    get y() {
      return playerLandPos.y;
    },
    set x(newX) {
      playerLandPos.x = newX;
    },
    set y(newY) {
      playerLandPos.y = newY;
    },
    get truePos() {
      return playerLandPos;
    },
    get pos() {
      return {
        get x() {
          return playerLandPos.x;
        },
        get y() {
          return playerLandPos.y;
        },
        set x(newX) {
          playerLandPos.x = newX;
        },
        set y(newY) {
          playerLandPos.y = newY;
        },
      };
    },
    set pos(newPos) {
      playerLandPos = newPos;
    },
    shiftX: function (dx) {
      playerLandPos.x += dx;
    },
    shiftY: function (dy) {
      playerLandPos.y += dy;
    },
  },
};
// More data on our current land
function getLand(landPos) {
  for (let land of Object.values(map)) {
    if (equivPos(land.landPos, landPos)) {
      return land;
    }
  }
}
// Access player debug mode
if (DEBUG) {
  Object.defineProperty(window, "player", {
    get: function () {
      return player;
    },
  });
  window.pl = function () {
    return player;
  };
}

// Position helpers

// Check position to position equivalence
function equivPos(a, b) {
  return a.x === b.x && a.y === b.y;
}
// Check position to X-Y equivalence
function equivXY(a, x, y) {
  return a.x === x && a.y === y;
}

// Player movement

let canMove = {
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true,
  ArrowDown: true,
};
let keyIsDown = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};
let shift = {
  get ArrowRight() {
    player.tile.shiftX(1);
  },
  get ArrowLeft() {
    player.tile.shiftX(-1);
  },
  get ArrowDown() {
    player.tile.shiftY(1);
  },
  get ArrowUp() {
    player.tile.shiftY(-1);
  },
};
const baseMoveInterval = 30;
async function moved(key) {
  canMove[key] = false;
  let moveInterval = baseMoveInterval;
  if (Object.values(keyIsDown).reduce((a, b) => a + b) == 2) {
    moveInterval *= 2;
  }
  setTimeout(function () {
    canMove[key] = true;
  }, moveInterval);
}
document.body.addEventListener("keydown", function (evt) {
  const key = evt.key;
  if (Object.keys(canMove).includes(key)) {
    keyIsDown[key] = true;
    if (canMove[key]) {
      moved(key);
      evt.preventDefault();
      shift[key];
    }
  }
});
// document.body.addEventListener("keyup", function (evt) {
//   // something
// });
log("movePlayer.js end");

export { equivPos, equivXY, getLand, player };
