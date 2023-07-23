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

type _DebugFunction = () => string | undefined;
type _AsyncDebugFunction = () => Promise<string | undefined>;
function registerRenderers(
  render: _DebugFunction,
  unrender: _DebugFunction,
  _asyncRender: _AsyncDebugFunction
): void {
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
