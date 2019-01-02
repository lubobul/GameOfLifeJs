var animationEngine = new AnimationEngine(4);

animationEngine.setAnimationFrameCallback(update);

var cHeight = canvas.height;
var cWidth = canvas.width;

var CELL_SIZE = 10;

var MATRIX_HEIGHT = Math.round(cHeight / CELL_SIZE);
var MATRIX_WIDTH = Math.round(cWidth / CELL_SIZE);

var lifeMatrix = [];
var tempMatrix = [];

var isAlive = false;

function setup(){

    for(var i=0; i<MATRIX_HEIGHT; i++) {

        lifeMatrix[i] = new Array(MATRIX_WIDTH);
    }

    for(var i =0; i< MATRIX_HEIGHT; i++){
        for(var j =0; j< MATRIX_WIDTH; j++){
            lifeMatrix[i][j] = false;
        }
    }

    for(var i=0; i<MATRIX_HEIGHT; i++) {

        tempMatrix[i] = new Array(MATRIX_WIDTH);
    }

    for(var i =0; i< MATRIX_HEIGHT; i++){
        for(var j =0; j< MATRIX_WIDTH; j++){
            tempMatrix[i][j] = false;
        }
    }

    setLeftClickCallback(mouseDown);
    drawGrid();
    animationEngine.start();
}

function mouseDown(coordinates){

    var matrix_x = Math.floor(coordinates.x / CELL_SIZE);
    var matrix_y = Math.floor(coordinates.y / CELL_SIZE);

    lifeMatrix[matrix_y][matrix_x] = !lifeMatrix[matrix_y][matrix_x];
}

function drawGrid(){

    for(var i=0; i<MATRIX_HEIGHT; i++) {
        drawLine(0, i*CELL_SIZE, cWidth, i*CELL_SIZE);
    }

    for(var i=0; i<MATRIX_WIDTH; i++) {
        drawLine(i*CELL_SIZE, 0, i*CELL_SIZE, cHeight);
    }

    for(var i =0; i< MATRIX_HEIGHT; i++){
        for(var j =0; j< MATRIX_WIDTH; j++){
            
            if(lifeMatrix[i][j]){
                fillRect(j*CELL_SIZE + 1, i*CELL_SIZE + 1, CELL_SIZE - 1, CELL_SIZE - 1);
            }           
        }
    }
}

function spread(){
    for(var i =0; i< MATRIX_HEIGHT; i++){
        for(var j =0; j< MATRIX_WIDTH; j++){
            if(lifeMatrix[i][j]){
                
                if(i>= 1){
                    tempMatrix[i - 1][j] = !lifeMatrix[i - 1][j];
                }

                if(i < MATRIX_HEIGHT -1){
                    tempMatrix[i + 1][j] = !lifeMatrix[i + 1][j];
                }

                if(j>= 1){
                    tempMatrix[i][j - 1] = !lifeMatrix[i][j - 1];
                }

                if(j < MATRIX_WIDTH -1){
                    tempMatrix[i][j + 1] = !lifeMatrix[i][j + 1];
                }                
                
            }
        }
    }

    for(var i =0; i< MATRIX_HEIGHT; i++){
        for(var j =0; j< MATRIX_WIDTH; j++){
            lifeMatrix[i][j] = tempMatrix[i][j];
        }
    }

    for(var i =0; i< MATRIX_HEIGHT; i++){
        for(var j =0; j< MATRIX_WIDTH; j++){
            tempMatrix[i][j] = false;
        }
    }
}

//update is assigned to the animation engine, called ~ 1/60 sec
function update(){

    clearCanvas();
    drawGrid();
    
    if(isAlive){
        spread();
    }
    
}

function startLife(){
    isAlive = true;
}

setup();