document.addEventListener('contextmenu', event => event.preventDefault());
const CANVAS_ID="game"
const SIZE=200

let tiles = [];
let timer = null;

let drawing = false;
let goPressed = false;

let canvas;
let ctx;

canvas = $(`#${CANVAS_ID}`)
ctx = canvas[0].getContext("2d");

timer = setInterval(draw, 40);

initializeGameArea(SIZE);
setEventListeners();
drawBackground();


function initializeGameArea(SIZE){
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            tiles.push([]);
            tiles[i][j] = {
                x_pos: i * 4,
                y_pos: j * 4,
                alive: 0,
                markedForDeath: 0,
                markedForBirth: 0
            };
        }
    }
}

function draw() {
    drawBackground();
    drawTiles();
    if (goPressed) {
        updateTiles();
    }
}

function drawBackground() {
    ctx.beginPath();
    ctx.rect(0, 0, 800, 800);
    ctx.fillStyle = "#000000";
    ctx.fill();
}

function drawTiles() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (tiles[i][j].alive == 1) {
                ctx.beginPath();
                ctx.rect(tiles[i][j].x_pos, tiles[i][j].y_pos, 4, 4);
                ctx.fillStyle = "#FFFFFF";
                ctx.fill();
            }
        }
    }
}

function updateTiles() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
                let numOfNeighbours = checkNeighbours(i,j);
                if ((numOfNeighbours < 2) || (numOfNeighbours > 3)) {
                    tiles[i][j].markedForDeath = 1;
                }
                if (numOfNeighbours === 3) {
                    tiles[i][j].markedForBirth = 1;
                }
            }
        }


    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (tiles[i][j].markedForBirth == 1) {
                tiles[i][j].markedForBirth = 0;
                tiles[i][j].alive = 1;
            }
            if (tiles[i][j].markedForDeath == 1) {
                tiles[i][j].markedForDeath = 0;
                tiles[i][j].alive = 0;
            }
        }
    }
    }

    function checkNeighbours(x,y){ 
            let numOfNeighbours=0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                        let row = (x + i + SIZE) % SIZE;
                        let col = (y + j + SIZE) % SIZE; 
                        numOfNeighbours += tiles[row][col].alive;
                }
            }
            numOfNeighbours-=tiles[x][y].alive;
            return numOfNeighbours;
    }
    
    function setEventListeners(){
        $("#go").on('mousedown', function () {
            goPressed?$("#go").attr("src", "assets/GO.png"):$("#go").attr("src", "assets/pressed.png");
            goPressed=!goPressed
        });
        
        
        canvas.mouseup(function (e) {
            drawing = false;
            canvas.off('mousemove')
        });
        
        canvas.mousedown(function(event) {
            switch (event.which) {
                case 1:
                    drawing = true;
                    $("#game").on('mousemove', function (e) {
                        if(drawing){
                            let mouseX = e.clientX;
                            let mouseY = e.clientY;
                            tiles[Math.floor(mouseX / 4) - 2][Math.floor(mouseY / 4) - 2].alive = 1;
                        }
                    })
                    break;
                case 3:
                    drawing = true;
                    $("#game").on('mousemove', function (e) {
                        if (drawing) {
                            erase(e);
                        }
                    })
                    break;
            }
        });
    }
    
    function erase (e){
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        tiles[Math.floor(mouseX / 4) - 2][Math.floor(mouseY / 4) - 2].alive = 0;
    }