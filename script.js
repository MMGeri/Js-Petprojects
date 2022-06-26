var kocka_array = [];

var c;
var ctx;
var timer;
var isDraw = false;
var go = false;
$(document).ready(function () {
    c = document.getElementById("game");
    ctx = c.getContext("2d");
    timer = setInterval(draw, 40);

    $("#go").on('mousedown', function () {
        $("#go").attr("src", "benyomva.png");
    });
    $("#go").on('mouseup', function () {
        $("#go").attr("src", "smile.png");
    });

    $("#go").on("click", function () {
        if(go)
            go=false;
        else
            go=true;

    });
    background();
    for (var i = 0; i < 200; i++) {
        for (var j = 0; j < 200; j++) {
            kocka_array.push([]);
            kocka_array[i][j] = {
                x_pos: i * 4,
                y_pos: j * 4,
                alive: 0,
                halaljelolt: 0,
                szulesjelolt: 0
            };

        }
    }


    c.addEventListener('mousedown', function (e) {
        isDraw = true;
        $("#game").on('mousemove', function (e) {
            if (isDraw) {
                let mouseX = e.clientX;
                let mouseY = e.clientY;
                kocka_array[Math.floor(mouseX / 4) - 2][Math.floor(mouseY / 4) - 2].alive = 1;
            }
        })
    });
    c.addEventListener('mouseup', function (e) {
        isDraw = false;
    });
	c.addEventListener('contextmenu', function (e) {
       
       
           
                let mouseX = e.clientX;
                let mouseY = e.clientY;
                kocka_array[Math.floor(mouseX / 4) - 2][Math.floor(mouseY / 4) - 2].alive = 0;
            
        
    });

});
document.addEventListener('contextmenu', event => event.preventDefault());

function draw() {
	let ido=0;
    background();
    draw_kockak();
    if (go) {
        update_kockak(ido);
		ido++;
    }
}

function background() {
    ctx.beginPath();
    ctx.rect(0, 0, 800, 800);
    ctx.fillStyle = "#000000";
    ctx.fill();
}

function draw_kockak() {

    for (var i = 0; i < 200; i++) {
        for (var j = 0; j < 200; j++) {
            if (kocka_array[i][j].alive == 1) {
                ctx.beginPath();
                ctx.rect(kocka_array[i][j].x_pos, kocka_array[i][j].y_pos, 4, 4);
                ctx.fillStyle = "#FFFFFF";
                ctx.fill();
            }
        }
    }
}

function update_kockak(ido) {
    for (var h = 0; h < 200; h++) {
        for (var j = 0; j < 200; j++) {
            var around = 0;
			if(h<10 || h>195 || j>195 || j<10 && ido%10==0){
				kocka_array[h][j].alive = 0;
			}
            for (var i = -1; i < 2; i++) {
                for (var k = -1; k < 2; k++) {

                    var sorszami = h + i;
                    var sorszamk = j + k;
                    if (kocka_array[sorszami] != undefined && kocka_array[sorszami][sorszamk] != undefined && !(sorszami === h && sorszamk === j)) {
                        if (kocka_array[sorszami][sorszamk].alive === 1) {
                            around++;
                        }
                    }
                }
            }
            if ((around < 2) || (around > 3)) {
                kocka_array[h][j].halaljelolt = 1;
            }
            if (around === 3) {
                kocka_array[h][j].szulesjelolt = 1;
            }
        }
    }
    for (var h = 0; h < 200; h++) {
        for (var j = 0; j < 200; j++) {
            if (kocka_array[h][j].szulesjelolt == 1) {
                kocka_array[h][j].szulesjelolt = 0;
                kocka_array[h][j].alive = 1;
            }
            if (kocka_array[h][j].halaljelolt == 1) {
                kocka_array[h][j].halaljelolt = 0;
                kocka_array[h][j].alive = 0;
            }


        }
    }

}
