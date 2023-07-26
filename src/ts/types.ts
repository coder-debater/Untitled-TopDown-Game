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
type PlayerType = {
  tile: PlayerPos<TilePos>;
  land: PlayerPos<LandPos>;
};
type ImagePos = [number, number, number, number];
type ImageFactory = (size: number) => HTMLImageElement;
export type {
  Arrows,
  TilePos,
  LandPos,
  Pos,
  TileData,
  MapType,
  PlayerType,
  ImagePos,
  ImageFactory,
};
