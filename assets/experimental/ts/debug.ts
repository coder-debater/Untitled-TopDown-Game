import { DEBUG } from "./config.js";
log("debug.js start");

// Debug mode

function log(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}
function s(x) {
  // return s`Data`
  if (DEBUG) {
    return x.raw[0];
  }
}

// Debugging helpers

function registerRenderers(render, unrender, _asyncRender) {
  Object.defineProperty(window, "start", { get: render });
  Object.defineProperty(window, "stop", { get: unrender });
  Object.defineProperty(window, "reload", {
    get: function () {
      _asyncRender();
      return s`Now reloading`;
    },
  });
}

log("debug.js end");
export { log, s, registerRenderers };
