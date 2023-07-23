type Arrows = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
type TilePos = { x: number; y: number };
type LandPos = { x: number; y: number };
type Pos = TilePos | LandPos;
type TileData = { name: string; landPos: LandPos; tiles: string[] };
type MapType = {
  [key: string]: TileData;
};
type PlayerPos<PosType> = {
  x: number;
  y: number;
  readonly truePos: PosType;
  pos: {
    x: number;
    y: number;
  };
  shiftX: (dx: number) => void;
  shiftY: (dy: number) => void;
};
export type { Arrows, TilePos, LandPos, Pos, TileData, MapType, PlayerPos };
