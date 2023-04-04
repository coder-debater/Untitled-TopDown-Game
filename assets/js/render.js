/* render.js */



// Player

// Position on land
let playerTilePos = {"x": 0, "y": 14};
// Which land are we in?
let playerLandPos = {"x": 0, "y": 0};

// Check position to position equivalence
function equivPos(a, b) {
    return (a.x === b.x && a.y === b.y);
}

// Check position to X-Y equivalence
function equivXY(a, x, y) {
    return (a.x === x && a.y === y);
}

function getPlayerLand() {
    for (let land of Object.values(map)) {
        if (equivPos(land.landPos, playerLandPos)) {
            return land;
        }
    }
}



// Tiles

// Size of one tile
const TILE_SIZE = Math.min(canvas.width, canvas.height) / 28;

// 'grass' => <img id='grass' width=TILE_SIZE etc />
function _img(name){
    // Get image
    const img = document.querySelector('#' + name + IMAGE_TYPE);

    // Set dimensions
    img.width = TILE_SIZE;
    img.height = TILE_SIZE;

    return img;
};

const PLAYER_IMAGE = '/assets/images/svg/player.svg';
const TILE_IMAGES = {
    ' ': _img('grass'),
    '-': _img('path'),
    '#': _img('grass_side')
};
// TODO: real wall texture // TODO: real wall texture // TODO: real wall texture //
// TODO: real wall texture // TODO: real wall texture // TODO: real wall texture //
// TODO: real wall texture // TODO: real wall texture // TODO: real wall texture //



// Render

function _render() {
    console.log("_render(): start");

    let currentTiles = getPlayerLand().tiles;
    for (let y = 0; y < currentTiles.length; y++) {
        let row = currentTiles[y];
        for (let x = 0; x < row.length; x++) {
            const tilePosition = [
                x * TILE_SIZE, y * TILE_SIZE,
                TILE_SIZE, TILE_SIZE
            ];
            let tileTextContent = row[x];
            c.clearRect(...tilePosition);
            c.drawImage(TILE_IMAGES[tileTextContent], ...tilePosition);
            if (equivXY(playerTilePos, x, y)) {
                c.drawImage(PLAYER_IMAGE, ...tilePosition);
            }
        }
    }
    console.log("_render(): finished");
    return "Finished rendering";
}

// Same as _render() but with Promise()
async function _asyncRender() {
    return _render();
}

let renderCallback;
let rendering = false;
if (stoptime > 0) {
    let start = null;
    let prevTimestamp = null;
    renderCallback = function(timestamp) {
        if (start === null) {
            start = timestamp;
        }
        
        // Stop animation after stopTime seconds
        if (((timestamp - start) >= stopTime)) {
            rendering = false;
        }
        
        if (rendering) {
            // Only render if time has passed
            if (prevTimestamp !== timestamp) {
                _render();
            }
            // Update for next call
            prevTimestamp = timestamp;
            window.requestAnimationFrame(renderCallback);
        } else {
            // Reset variables
            start = null;
            prevTimestamp = null;
        }
    };
} else {
    renderCallback = function(timestamp) {
        _render()
        if (rendering) {
            window.requestAnimationFrame(renderCallback);
        }
    };
}
function render() {
    if (rendering) {
        return "Already starting rendering";
    }
    rendering = true;
    window.requestAnimationFrame(renderCallback)
    return "Starting rendering";
}
function unrender() {
    if (rendering) {
        rendering = false;
        return "Stopping rendering"
    }
    return "Already stopped rendering";
}

/*
let interval = null;
function render() {
        if (interval === null) {
            interval = setInterval(_render, 100);
            return "Starting rendering";
        }
        return "Already starting rendering";
    }
});
function unrender() {
        if (interval === null) {
            return "Already stopped rendering";
        }
        clearInterval(interval);
        interval = null;
        return "Stopped rendering"
    }
});
*/



// Debugging helpers

Object.defineProperty(window, 'start', { get:   render });
Object.defineProperty(window, 'stop' , { get: unrender });
Object.defineProperty(window, 'reload', {
    get: () => {
        _asyncRender();
        return "Now reloading";
    }
});