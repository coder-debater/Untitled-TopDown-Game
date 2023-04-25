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
