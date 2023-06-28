type Arrows = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
type TilePos = { x: number; y: number };
type LandPos = { x: number; y: number };
type Pos = TilePos | LandPos;
type TileData = { name: string; landPos: LandPos; tiles: string[] };
type MapType = {
  [key: string]: TileData;
};
export type { Arrows, TilePos, LandPos, Pos, TileData, MapType };
