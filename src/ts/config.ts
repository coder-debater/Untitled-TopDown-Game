/*
? Configuration
*/

//* Tile type
//* "PNG" or "SVG"
//* Does not apply to player image
const IMAGE_TYPE: "PNG" | "SVG" = "PNG";

//* Time until rendering stops (in milliseconds)
//* Values that are not positive will result in it not stopping
//* Affects render, unrender, start, stop
const stopTime: number = 0;

//* Debug mode
//* Turns on console.log (may cause lag!)
//* Turns on redundant function return values
//* Turns on 'start', 'stop', 'reload'
const DEBUG: boolean = true;

export { IMAGE_TYPE, stopTime, DEBUG };
