var animationEngine0 = new AnimationEngine(24);

var animationEngine1 = new AnimationEngine(4);


var cHeight = canvas.height;
var cWidth = canvas.width;

var CELL_SIZE = 10;

var MATRIX_HEIGHT = Math.round(cHeight / CELL_SIZE);
var MATRIX_WIDTH = Math.round(cWidth / CELL_SIZE);

var lifeMatrix = [];
var tempMatrix = [];

var isAlive = false;

function setup() {

    for (var i = 0; i < MATRIX_HEIGHT; i++) {

        lifeMatrix[i] = new Array(MATRIX_WIDTH);
    }

    for (var i = 0; i < MATRIX_HEIGHT; i++) {
        for (var j = 0; j < MATRIX_WIDTH; j++) {
            lifeMatrix[i][j] = false;
        }
    }

    for (var i = 0; i < MATRIX_HEIGHT; i++) {

        tempMatrix[i] = new Array(MATRIX_WIDTH);
    }

    for (var i = 0; i < MATRIX_HEIGHT; i++) {
        for (var j = 0; j < MATRIX_WIDTH; j++) {
            tempMatrix[i][j] = false;
        }
    }

    setLeftClickCallback(mouseDown);
    drawGrid();

    animationEngine0.setAnimationFrameCallback(update0);
    animationEngine1.setAnimationFrameCallback(update1);
    animationEngine0.start();
    animationEngine1.start();
}

function mouseDown(coordinates) {

    var matrix_x = Math.floor(coordinates.x / CELL_SIZE);
    var matrix_y = Math.floor(coordinates.y / CELL_SIZE);

    lifeMatrix[matrix_y][matrix_x] = !lifeMatrix[matrix_y][matrix_x];
}

function drawGrid() {

    for (var i = 0; i < MATRIX_HEIGHT; i++) {
        drawLine(0, i * CELL_SIZE, cWidth, i * CELL_SIZE);
    }

    for (var i = 0; i < MATRIX_WIDTH; i++) {
        drawLine(i * CELL_SIZE, 0, i * CELL_SIZE, cHeight);
    }

    for (var i = 0; i < MATRIX_HEIGHT; i++) {
        for (var j = 0; j < MATRIX_WIDTH; j++) {

            if (lifeMatrix[i][j]) {
                fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 1, CELL_SIZE - 1);
            }
        }
    }
}

// if(i>= 1){
//     tempMatrix[i - 1][j] = !lifeMatrix[i - 1][j];
// }

// if(i < MATRIX_HEIGHT -1){
//     tempMatrix[i + 1][j] = !lifeMatrix[i + 1][j];
// }

// if(j>= 1){
//     tempMatrix[i][j - 1] = !lifeMatrix[i][j - 1];
// }

// if(j < MATRIX_WIDTH -1){
//     tempMatrix[i][j + 1] = !lifeMatrix[i][j + 1];
// } 

function checkAround(x0, y0) {
    let aliveAround = 0;

    for (var y1 = y0 - 1; y1 <= y0 + 1; y1++) {
        for (var x1 = x0 - 1; x1 <= x0 + 1; x1++) {

            if (lifeMatrix[y1][x1]) {
                aliveAround++;
            }
        }
    }

    if (!lifeMatrix[y0][x0]) {

        if (aliveAround === 3) {
            tempMatrix[y0][x0] = true;
        }
    
    }else{
        
        aliveAround -=1;

        if(aliveAround === 2 || aliveAround === 3){
            tempMatrix[y0][x0] = true;
        }else{
            tempMatrix[y0][x0] = false;
        }
    }
}

function spread() {
    for (var y0 = 1; y0 < MATRIX_HEIGHT-1; y0++) {
        for (var x0 = 1; x0 < MATRIX_WIDTH-1; x0++) {

            checkAround(x0, y0);
        }
    }

    for (var y0 = 0; y0 < MATRIX_HEIGHT; y0++) {
        for (var x0 = 0; x0 < MATRIX_WIDTH; x0++) {
            lifeMatrix[y0][x0] = tempMatrix[y0][x0];
        }
    }

    for (var y0 = 0; y0 < MATRIX_HEIGHT; y0++) {
        for (var x0 = 0; x0 < MATRIX_WIDTH; x0++) {
            tempMatrix[y0][x0] = false;
        }
    }
}

//update is assigned to the animation engine
function update0() {

    clearCanvas();
    drawGrid();
}

function update1() {

    if (isAlive) {
        spread();
    }
}

function startLife() {
    isAlive = true;
}

function stopLife() {
    isAlive = false;
}

setup();