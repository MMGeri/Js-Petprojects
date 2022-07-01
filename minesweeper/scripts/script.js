const TILE_VALUES = {
    MINE: -1,
    EMPTY: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8
}
const DIFFICULTIES = {
    EASY: {
        width: 16,
        height: 16,
        mines: 40
    },
    HARD:{
        width: 30,
        height: 16,
        mines: 99
    }
}

class Tile {
    constructor(x,y,value = TILE_VALUES.EMPTY) {
        this.x_pos = x;
        this.y_pos = y;
        this.value = value;
        this.revealed = false;
        this.flagged = false;
    }
}

class GameArea {
    
    constructor(width, height, numberOfMines) {
        this.width = width;
        this.height = height;
        this.flags=0;
        this.numberOfMines=numberOfMines;

        this.tiles = [];
        this.initializeGameArea(width, height);
    }
    
    
    initializeGameArea(width, height){
        this._createTiles();
        this._createMines();
        
        for(let tile of this.tiles){
            tile.value=_calculateTileValue(tile.x_pos,tile.y_pos);
        }
    }
    _createTiles(){
        for(let x=0;x<width;x++){
            for(let y = 0; y<height; y++){
                this.tiles[x].push(new Tile( x, y ));   
            }
        }
    }
    _createMines(){
        for (let i = 0; i < this.numberOfMines;) {
            let rand = Math.floor(Math.random() * this.tiles.length);
            if (tiles[rand].value != TILE_VALUES.MINE) {
                tiles[rand].value = TILE_VALUES.MINE;
                i++;
            }
        }
    }
    _calculateTileValue(x,y){
        if(this.tiles[x][y].value==TILE_VALUES.MINE)
            return;
        let minesAround=0;
        for (let x_offset = -1; xx_offset < 2; x_offset++) {
            for (let y_offset = -1; y_offset < 2; y_offset++) {
                let tile = this.tiles[x + x_offset][y + y_offset];
                if (tile != undefined && tile.value == TILE_VALUES.MINE) {
                    minesAround++;
                }
            }
        }
        return minesAround;
    }
    
    clickTile(x,y){
        let clickedTile = this.tiles[x][y];
        if(clickedTile.value==TILE_VALUES.MINE && !clickedTile.flagged){
            //raise event?
        }
        else if(clickedTile.value!=TILE_VALUES.EMPTY && !clickedTile.revealed && !clickedTile.flagged){
            this.revealTile(x,y);
        }
    }

    revealTile(x,y){
        this.tiles[x][y].revealed=true;
    }
    
}

class MinesweeperGame{
    constructor(width, height, difficulty){
        this.gameArea = new GameArea(width, height);
        this.difficulty = difficulty;
        this.score = 0;
        this.gameOver = false;
    }
}
class CanvasGui{
    constructor(game, resolution, rootElement){
        
    }
    create(){    }
    startTimer(){    }
    bindEvents(){    }
    
    destroy(){    }
    stopTimer(){    }
    unbindEvents(){    }
}



let game = new MinesweeperGame(...Object.values(DIFFICULTIES.EASY))
let gameGui = new CanvasGui(game, 1, $('#game-area'));
gameGui.create();



// $(gameArea).on('click', click_kocka);
// $(gameArea).on('click', function () {
//     if (clicked == 0) {
//         clicked = 1;
//         timer = setInterval(ido, 1000);
//     }
// });
// $(reset).on('click', function () {
//     if (difficulty == 0) {
//         aknakszama = 40;
//     } else aknakszama = 99;
//     zaszlok_szama = aknakszama;
//     reset_game();
//     init_kocka();
//     draw_kocka();
//     beallit();
// });
// $(reset).on('mousedown', function () {
//     $(reset).attr("src", "benyomva.png");
// });
// $(reset).on('mouseup', function () {
//     $(reset).attr("src", "smile.png");
// });
// $(gameArea).on('contextmenu', zaszlo);
// document.addEventListener('contextmenu', event => event.preventDefault());

// function zaszlo(ev) {
    
//     let div_pos = gameArea.offset();
//     let x = Math.ceil(ev.clientX - div_pos.left);
//     let y = Math.ceil(ev.clientY - div_pos.top);
    
//     for (let e in tiles) {
//         if (x > tiles[e].x_pos && x < tiles[e].x_pos + offset_x && y > tiles[e].y_pos && y < tiles[e].y_pos + offset_y) {
//             if (tiles[e].zaszlo == 0 && tiles[e].kattintott == 0) {
//                 tiles[e].divObj.attr("src", "zaszlo.png");
//                 tiles[e].zaszlo = 1;
//                 zaszlok_szama--;
//             } else if (tiles[e].zaszlo == 1 && tiles[e].kattintott == 0) {
//                 tiles[e].divObj.attr("src", "enemy.png");
//                 tiles[e].zaszlo = 0;
//                 zaszlok_szama++;
//             }
//         }
//     }
// }


//TODO: Refactor these below

// function nagykatt(e) {
//     let zaszlok_szama = zaszlok_korul(e);
//     for (let i = -1; i < 2; i++) {
//         for (let k = -1; k < 2; k++) {
            
//             index = (i + parseInt(e)) + (k * kocka_sor);
//             if (tiles[index] != undefined && zaszlok_szama >= tiles[e].szam && tiles[index].kattintott === 0 && index != parseInt(e) && tiles[index].zaszlo == 0 && Math.abs(tiles[index].y_pos - tiles[e].y_pos) <= 40) {
                
                
//                 switch (tiles[index].szam) {
//                     case 0:
//                     tiles[index].divObj.attr("src", "ures.png");
//                     tiles[index].kattintott = 1;
//                     osszeskocka -= 1;
//                     kocka_lapit(index);
                    
//                     break;
//                     case 1:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "1.png");
                    
//                     break;
//                     case 2:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "2.png");
                    
//                     break;
//                     case 3:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "3.png");
//                     break;
//                     case 4:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "4.png");
//                     break;
//                     case 5:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "5.png");
//                     break;
//                     case 6:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "6.png");
//                     break;
//                     case 7:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "7.png");
//                     break;
//                     case 8:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "8.png");
//                     break;
//                 }
//                 if (tiles[index].value === 1) {
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "blowup.png");
//                     vesztettel();
//                 }
//             }
//         }
        
//     }
// }

// function kocka_lapit(e) {
//     for (let i = -1; i < 2; i++) {
//         for (let k = -1; k < 2; k++) {
            
//             index = (i + parseInt(e)) + (k * kocka_sor);
            
//             if (tiles[index] != undefined && tiles[index].kattintott === 0 && index != parseInt(e) && tiles[index].zaszlo == 0 && Math.abs(tiles[index].y_pos - tiles[e].y_pos) <= 40) {
                
//                 switch (tiles[index].szam) {
//                     case 0:
//                     tiles[index].divObj.attr("src", "ures.png");
//                     if (tiles[index].kattintott == 0) {
//                         tiles[index].kattintott = 1;
//                         kocka_lapit(index);
//                         osszeskocka -= 1;
                        
//                     }
//                     break;
//                     case 1:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "1.png");
                    
//                     break;
//                     case 2:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "2.png");
                    
//                     break;
//                     case 3:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "3.png");
//                     break;
//                     case 4:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "4.png");
//                     break;
//                     case 5:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "5.png");
//                     break;
//                     case 6:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "6.png");
//                     break;
//                     case 7:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "7.png");
//                     break;
//                     case 8:
//                     osszeskocka -= 1;
//                     tiles[index].kattintott = 1;
//                     tiles[index].divObj.attr("src", "8.png");
//                     break;
//                 }
//             }
//         }
        
//     }
// }


// function reset_game() {
//     youdied.currentTime = 0;
//     youdied.pause();
//     audio.currentTime = 0;
//     audio.play();
//     audio.loop = true;
//     osszeskocka = kocka_oszlop * kocka_sor;
//     clearInterval(timer);
//     clicked = 0;
//     score = 0;
//     torol_kocka();
//     tiles = [];
//     $("#egyes").attr("src", "nulla.png");
//     $("#tizes").attr("src", "nulla.png");
//     $("#szazas").attr("src", "nulla.png");
// }

// function vesztettel() {
//     for (let e in tiles) {
//         if (tiles[e].value == 1 && tiles[e].kattintott == 0) {
//             tiles[e].divObj.attr("src", "MINEa.png");
//             tiles[e].kattintott = 1;
//         } else {
//             tiles[e].kattintott = 1;
//         }
//     }
//     youdied.play();
//     audio.pause();
//     $(reset).attr("src", "sadsmile.png");
//     clearInterval(timer);
//     console.log("vesztettel");
    
// }

// function nyertel() {
//     clearInterval(timer);
    
//     let person = prompt("Gratulálok nyertél!\nAdd meg a neved:", "anonymus");
//     if (difficulty == 0)
//     localStorage.setItem("e" + person, Number(score));
//     else
//     localStorage.setItem("h" + person, Number(score));
//     fill_toplist();
// }

// function fill_toplist() {
//     let data = [];
    
//     $('#list_easy').html('<strong>Easy mode</strong><br><br>');
//     $('#list_hard').html('<strong>Hard mode</strong><br><br>');
//     for (let i = 0; i < localStorage.length; i++) {
//         data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
//     }
//     data.sort(function (a, b) {
//         return a[1] - b[1];
//     });
//     let hardd = 0;
//     let easyy = 0;
//     for (let act_data of data.keys()) {
//         if (easyy < 3) {
//             if (data[act_data][0].substring(0, 1) == "e" && data[act_data][0]!="enull") {
//                 easyy++;
//                 $('#list_easy').append(data[act_data][0].substring(1, data[act_data][0].length) + ' - ' + data[act_data][1] + '<br><hr>');
//             }
//         }
//         if (hardd < 3) {
//             if (data[act_data][0].substring(0, 1) == "h" && data[act_data][0]!="hnull") {
//                 hardd++;
//                 $('#list_hard').append(data[act_data][0].substring(1, data[act_data][0].length) + ' - ' + data[act_data][1] + '<br><hr>');
//             }
//         }
//     }
    
// }