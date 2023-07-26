import { DEBUG } from "./config.js";
log("debug.js start");

// Debug mode

function log(...args: any[]): void {
  if (DEBUG) {
    console.log(...args);
  }
}
function s(x: TemplateStringsArray): string | undefined {
  // return s`Data`
  if (DEBUG) {
    return x.raw[0];
  }
}

// Debugging helpers

log("debug.js end");
export { log, s };
