import { log } from "./debug.js";
import { MapType } from "./types.js";
log("initData.js start");

// Constants

const canvas: HTMLCanvasElement =
  document.querySelector<HTMLCanvasElement>("canvas#game")!;
const c: CanvasRenderingContext2D = canvas.getContext("2d")!;

// Map

function _toTiles(s: string): string[] {
  return s.slice(1, -1).replace(/\./g, "").split("\n");
}
// TODO stop hardcoding tile as ASCII and make a level editor
// * then use level editor to store base tiles of level
let map: MapType = {
  ragni: {
    name: "Ragni",
    landPos: { x: 0, y: 0 },
    tiles: _toTiles(`
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
  ????--            ???   BC.
  ????--??? ?? ???? ???    C.
      --??? ?? ???? ???    C.
  ---------------------    C.
  ---------------------   BC.
                         BBC.
BB   B   B   B   B   B  BBSC.
BSBBBSBBBSBBBSBBBSBBBSBBBSC?.
CCCCCCCCCCCCCCCCCCCCCCCCCC??.
`),
  },
  trail: {
    name: "Emerald Trail",
    landPos: { x: 1, y: 0 },
    tiles: _toTiles(`
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
`),
  },
};

log("initData.js end");
export { canvas, c, map };
