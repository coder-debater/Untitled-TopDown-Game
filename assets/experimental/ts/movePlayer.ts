import { DEBUG } from "./config.js";
import { log } from "./debug.js";
import { map } from "./initData.js";
import { Arrows, TilePos, LandPos, Pos } from "./types.js";
log("movePlayer.js start");

// Player

// Position on land
let playerTilePos: TilePos = { x: 0, y: 14 };
// Which land are we in?
let playerLandPos: LandPos = { x: 0, y: 0 };
// Player data interfacce
const player = {
  tile: {
    get x() {
      return playerTilePos.x;
    },
    get y() {
      return playerTilePos.y;
    },
    set x(newX: number) {
      playerTilePos.x = newX;
    },
    set y(newY: number) {
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
        set x(newX: number) {
          playerTilePos.x = newX;
        },
        set y(newY: number) {
          playerTilePos.y = newY;
        },
      };
    },
    set pos(newPos) {
      playerTilePos = newPos;
    },
    shiftX: function (dx: number) {
      playerTilePos.x += dx;
    },
    shiftY: function (dy: number) {
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
    set x(newX: number) {
      playerLandPos.x = newX;
    },
    set y(newY: number) {
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
        set x(newX: number) {
          playerLandPos.x = newX;
        },
        set y(newY: number) {
          playerLandPos.y = newY;
        },
      };
    },
    set pos(newPos) {
      playerLandPos = newPos;
    },
    shiftX: function (dx: number) {
      playerLandPos.x += dx;
    },
    shiftY: function (dy: number) {
      playerLandPos.y += dy;
    },
  },
};
// More data on our current land
function getLand(landPos: LandPos) {
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
}

// Position helpers

// Check position to position equivalence
function equivPos(a: Pos, b: Pos) {
  return a.x === b.x && a.y === b.y;
}
// Check position to X-Y equivalence
function equivXY(a: Pos, x: number, y: number) {
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
    return "";
  },
  get ArrowLeft() {
    player.tile.shiftX(-1);
    return "";
  },
  get ArrowDown() {
    player.tile.shiftY(1);
    return "";
  },
  get ArrowUp() {
    player.tile.shiftY(-1);
    return "";
  },
};
const baseMoveInterval = 30;
async function moved(key: Arrows) {
  canMove[key] = false;
  let moveInterval = baseMoveInterval;
  setTimeout(function () {
    canMove[key] = true;
  }, moveInterval);
}
document.body.addEventListener("keydown", function (evt) {
  const key = evt.key;
  if (Object.keys(canMove).includes(key)) {
    keyIsDown[key] = true;
    if (canMove[key]) {
      moved(key as Arrows);
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
