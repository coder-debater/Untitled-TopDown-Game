import { DEBUG } from "./config.js";
import { log } from "./debug.js";
import { map } from "./initData.js";
import {
  Arrows,
  TilePos,
  LandPos,
  Pos,
  TileData,
  PlayerType,
} from "./types.js";
log("movePlayer.js start");

// Player

// Position on land
let playerTilePos: TilePos = { x: 0, y: 14 };
// Which land are we in?
let playerLandPos: LandPos = { x: 0, y: 0 };
// Player data interface
const player: PlayerType = {
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
    set pos(newPos: TilePos) {
      playerTilePos = newPos;
    },
    shiftX(dx: number) {
      playerTilePos.x += dx;
    },
    shiftY(dy: number) {
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
    set pos(newPos: LandPos) {
      playerLandPos = newPos;
    },
    shiftX(dx: number) {
      playerLandPos.x += dx;
    },
    shiftY(dy: number) {
      playerLandPos.y += dy;
    },
  },
};
// More data on our current land
function getLand(landPos: LandPos): TileData {
  for (let land of Object.values(map)) {
    if (equivPos(land.landPos, landPos)) {
      return land;
    }
  }
  throw Error("Player on nonexistent land x=" + landPos.x + " y=" + landPos.y);
}
// Access player debug mode
if (DEBUG) {
  Object.defineProperty(window, "player", {
    get() {
      return player;
    },
  });
}

// Position helpers

// Check position to position equivalence
function equivPos(a: Pos, b: Pos): boolean {
  return a.x === b.x && a.y === b.y;
}
// Check position to X-Y equivalence
function equivXY(a: Pos, x: number, y: number): boolean {
  return a.x === x && a.y === y;
}

// Player movement

let canMove: {
  ArrowLeft: boolean;
  ArrowRight: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
} = {
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true,
  ArrowDown: true,
};
const baseMoveInterval: number = 30;
async function moved(key: Arrows) {
  canMove[key] = false;
  setTimeout(function () {
    canMove[key] = true;
  }, baseMoveInterval);
}
document.body.addEventListener("keydown", function (evt) {
  const key = evt.key;
  switch (key) {
    case "ArrowRight":
      player.tile.shiftX(1);
      break;
    case "ArrowLeft":
      player.tile.shiftX(-1);
      break;
    case "ArrowDown":
      player.tile.shiftY(1);
      break;
    case "ArrowUp":
      player.tile.shiftY(-1);
      break;
    default:
      return;
  }
  evt.preventDefault();
  moved(key);
});
// document.body.addEventListener("keyup", function (evt) {
//   // something
// });
log("movePlayer.js end");

export { equivPos, equivXY, getLand, player };
