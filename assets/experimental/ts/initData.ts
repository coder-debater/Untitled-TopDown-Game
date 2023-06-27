import { log } from "./debug.js";
import { MapType } from "./types.js";
log("initData.js start");

// Constants

const canvas: HTMLCanvasElement = document.querySelector(
  "canvas#game"
) as HTMLCanvasElement;
const c: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

// Map

let map: MapType = {
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

function _toTiles(s: string) {
  const rowList = s.slice(1, -1).replace(/\./g, "").split("\n");
  console.log(rowList);
  return rowList;
}
// TODO stop hardcoding tile as ASCII and make a level editor
// * then use level editor to store base tiles of level
map.ragni.tiles = _toTiles(`
CCCCCCCCCCCCCCCCCCCCCCCCCC??.
BSBBBSBBBSBBBSBBBSBBBSBBBSC?.
BB   B   B   B   B   B  BBSC.
                         BBC.
  ---------------------   BC.
  ---------------------    C.
      --??                 C.
      --??                 C.
      --     ?????        BC.
  ????--???? ?????        B .
  ????--???? ????? ?????? BC.
  ????--???? ????? ??????  C.
  ????--???? ????? ?????? BC.
----------------------------.
----------------------------.
  ????--?????? ????  ???? BC.
  ????--?????? ????  ????  C.
  ????--?????? ????       BC.
  ????--??????      ???   B .
  ????--    ??      ???   BC.
  ????--??? ?? ???? ???    C.
      --??? ?? ???? ???    C.
  ---------------------    C.
  ---------------------   BC.
                         BBC.
BB   B   B   B   B   B  BBSC.
BSBBBSBBBSBBBSBBBSBBBSBBBSC?.
CCCCCCCCCCCCCCCCCCCCCCCCCC??.
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
----------------------------.
----------------------------.
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

log("initData.js end");
export { canvas, c, map };
