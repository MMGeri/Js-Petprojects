let game_area;
let ga_width, ga_height;
let reset;
let hard;
let easy;
let game;

//negyzetek
let start_ex = 0;
let start_ey = 0;
let end_ey = 600;
let end_ex = 600;
let kocka_oszlop = 16;
let offset_x = (end_ex - start_ex) / kocka_oszlop;
let offset_y = (end_ey - start_ey) / kocka_oszlop;
let kocka_sor;
let kocka;
let kocka_array = [];
let timer;
let score = 0;
let clicked = 0;
let aknakszama = 40;
let osszeskocka = 0;
let zaszlok_szama = aknakszama;
let gamemode = 0;
var loaded=false;


class Minesweeper {
    constructor(gameAreaWidth,gameAreaHeight){
        this.audio={backgroundMusic: new Audio('audio_file.mp3'),youDied: new Audio('youdied.mp3')}
        this.gameArea=$('#gamearea');
    }
}
//TODO


$(document).on('click',function(){
    if(loaded==false){
        audio.play();
        audio.loop = true;
        loaded=true;}
});

fill_toplist();
reset = $('#reset');
game = $('#game');
game_area = $('#gamearea');
kocka = $('<img src="enemy.png">');
easy = $('#easy');
hard = $('#hard');
game.animate({top: 100}, 6000);
beallit();
ga_width = parseInt(game_area.css('width'));
ga_height = parseInt(game_area.css('height'));
kocka_sor = 16;
osszeskocka = kocka_oszlop * kocka_sor;

kocka.on('load', function () {
    init_kocka();
    draw_kocka();
});
$(hard).on('click', function () {
    gamemode = 1;
    $(reset).attr("src", "smile.png");
    reset_game();
    aknakszama = 99;
    zaszlok_szama = aknakszama;
    game.css({
        width: 1400,
        height: 640
    });
    game_area.css({
        width: 1200,
        height: 637
    });
    end_ey = 600;
    end_ex = 1200;
    kocka_oszlop = 30;

    offset_x = (end_ex - start_ex) / kocka_oszlop;
    offset_y = (end_ey - start_ey) / kocka_oszlop * 2;
    ga_width = parseInt(game_area.css('width'));
    ga_height = parseInt(game_area.css('height'));
    kocka_sor = 16;
    osszeskocka = kocka_oszlop * kocka_sor;
    beallit();
    init_kocka();
    draw_kocka();
});
$(easy).on('click', function () {
    gamemode = 0;
    $(reset).attr("src", "smile.png");
    reset_game();
    aknakszama = 40;
    zaszlok_szama = aknakszama;
    game.css({
        width: 800,
        height: 603
    });
    game_area.css({
        width: 600,
        height: 600
    });
    end_ey = 600;
    end_ex = 600;
    kocka_oszlop = 16;

    offset_x = (end_ex - start_ex) / kocka_oszlop;
    offset_y = (end_ey - start_ey) / kocka_oszlop;
    ga_width = parseInt(game_area.css('width'));
    ga_height = parseInt(game_area.css('height'));
    kocka_sor = 16;
    osszeskocka = kocka_oszlop * kocka_sor;
    beallit();
    init_kocka();
    draw_kocka();
});
$(game_area).on('click', click_kocka);
$(game_area).on('click', function () {
    if (clicked == 0) {
        clicked = 1;
        timer = setInterval(ido, 1000);
    }
});
$(reset).on('click', function () {
    if (gamemode == 0) {
        aknakszama = 40;
    } else aknakszama = 99;
    zaszlok_szama = aknakszama;
    reset_game();
    init_kocka();
    draw_kocka();
    beallit();
});
$(reset).on('mousedown', function () {
    $(reset).attr("src", "benyomva.png");
});
$(reset).on('mouseup', function () {
    $(reset).attr("src", "smile.png");
});
$(game_area).on('contextmenu', zaszlo);
document.addEventListener('contextmenu', event => event.preventDefault());

function zaszlo(ev) {

    let div_pos = game_area.offset();
    let mouse_posx = Math.ceil(ev.clientX - div_pos.left);
    let mouse_posy = Math.ceil(ev.clientY - div_pos.top);

    for (var e in kocka_array) {
        if (mouse_posx > kocka_array[e].x_pos && mouse_posx < kocka_array[e].x_pos + offset_x && mouse_posy > kocka_array[e].y_pos && mouse_posy < kocka_array[e].y_pos + offset_y) {
            if (kocka_array[e].zaszlo == 0 && kocka_array[e].kattintott == 0) {
                kocka_array[e].divObj.attr("src", "zaszlo.png");
                kocka_array[e].zaszlo = 1;
                zaszlok_szama--;
            } else if (kocka_array[e].zaszlo == 1 && kocka_array[e].kattintott == 0) {
                kocka_array[e].divObj.attr("src", "enemy.png");
                kocka_array[e].zaszlo = 0;
                zaszlok_szama++;
            }
        }
    }
    beallit();

}

function beallit() {
    let egyes = zaszlok_szama % 10;
    let tizes = Math.floor(zaszlok_szama / 10);
    if (zaszlok_szama > 99) {
        tizes = Math.floor(zaszlok_szama / 10) - Math.floor(parseInt(zaszlok_szama) / parseInt(100)) * 10;
    }

    switch (egyes) {
        case 0:
            $("#egyes_z").attr("src", "nulla.png");
            break;
        case 1:
            $("#egyes_z").attr("src", "egy.png");
            break;
        case 2:
            $("#egyes_z").attr("src", "ketto.png");
            break;
        case 3:
            $("#egyes_z").attr("src", "harom.png");
            break;
        case 4:
            $("#egyes_z").attr("src", "negy.png");
            break;
        case 5:
            $("#egyes_z").attr("src", "ot.png");
            break;
        case 6:
            $("#egyes_z").attr("src", "hat.png");
            break;
        case 7:
            $("#egyes_z").attr("src", "het.png");
            break;
        case 8:
            $("#egyes_z").attr("src", "nyolc.png");
            break;
        case 9:
            $("#egyes_z").attr("src", "kilenc.png");
            break;
    }
    switch (tizes) {
        case 0:
            $("#tizes_z").attr("src", "nulla.png");
            break;
        case 1:
            $("#tizes_z").attr("src", "egy.png");
            break;
        case 2:
            $("#tizes_z").attr("src", "ketto.png");
            break;
        case 3:
            $("#tizes_z").attr("src", "harom.png");
            break;
        case 4:
            $("#tizes_z").attr("src", "negy.png");
            break;
        case 5:
            $("#tizes_z").attr("src", "ot.png");
            break;
        case 6:
            $("#tizes_z").attr("src", "hat.png");
            break;
        case 7:
            $("#tizes_z").attr("src", "het.png");
            break;
        case 8:
            $("#tizes_z").attr("src", "nyolc.png");
            break;
        case 9:
            $("#tizes_z").attr("src", "kilenc.png");
            break;
    }
}

function ido() {
    score += 1;

    let egyes = score % 10;
    let tizes = Math.floor(score / 10);
    if (score > 99) {
        tizes = Math.floor(score / 10) - Math.floor(parseInt(score) / parseInt(100)) * 10;
    }
    let szazas = Math.floor(score / 100);

    switch (egyes) {
        case 0:
            $("#egyes").attr("src", "nulla.png");
            break;
        case 1:
            $("#egyes").attr("src", "egy.png");
            break;
        case 2:
            $("#egyes").attr("src", "ketto.png");
            break;
        case 3:
            $("#egyes").attr("src", "harom.png");
            break;
        case 4:
            $("#egyes").attr("src", "negy.png");
            break;
        case 5:
            $("#egyes").attr("src", "ot.png");
            break;
        case 6:
            $("#egyes").attr("src", "hat.png");
            break;
        case 7:
            $("#egyes").attr("src", "het.png");
            break;
        case 8:
            $("#egyes").attr("src", "nyolc.png");
            break;
        case 9:
            $("#egyes").attr("src", "kilenc.png");
            break;
    }
    switch (tizes) {
        case 0:
            $("#tizes").attr("src", "nulla.png");
            break;
        case 1:
            $("#tizes").attr("src", "egy.png");
            break;
        case 2:
            $("#tizes").attr("src", "ketto.png");
            break;
        case 3:
            $("#tizes").attr("src", "harom.png");
            break;
        case 4:
            $("#tizes").attr("src", "negy.png");
            break;
        case 5:
            $("#tizes").attr("src", "ot.png");
            break;
        case 6:
            $("#tizes").attr("src", "hat.png");
            break;
        case 7:
            $("#tizes").attr("src", "het.png");
            break;
        case 8:
            $("#tizes").attr("src", "nyolc.png");
            break;
        case 9:
            $("#tizes").attr("src", "kilenc.png");
            break;
    }
    switch (szazas) {
        case 0:
            $("#szazas").attr("src", "nulla.png");
            break;
        case 1:
            $("#szazas").attr("src", "egy.png");
            break;
        case 2:
            $("#szazas").attr("src", "ketto.png");
            break;
        case 3:
            $("#szazas").attr("src", "harom.png");
            break;
        case 4:
            $("#szazas").attr("src", "negy.png");
            break;
        case 5:
            $("#szazas").attr("src", "ot.png");
            break;
        case 6:
            $("#szazas").attr("src", "hat.png");
            break;
        case 7:
            $("#szazas").attr("src", "het.png");
            break;
        case 8:
            $("#szazas").attr("src", "nyolc.png");
            break;
        case 9:
            $("#szazas").attr("src", "kilenc.png");
            break;
    }

    if (osszeskocka == aknakszama) {
        nyertel();
    }
}

function torol_kocka() {
    $('.kocka').remove();
}

function init_kocka() {
    for (let i = 0; i < kocka_oszlop; i++) {
        for (let k = 0; k < kocka_sor; k++) {

            kocka_array.push({
                x_pos: start_ex + i * offset_x,
                y_pos: start_ey + k * offset_y,
                divObj: kocka.clone(),
                kocka_value: 0,
                szam: 0,
                kattintott: 0,
                lenyomva: 0,
                zaszlo: 0
            });
        }
    }
    let randomszam;
    for (let i = 0; i < aknakszama;) {
        randomszam = Math.floor(Math.random() * osszeskocka);
        if (kocka_array[randomszam].kocka_value == 0) {
            kocka_array[randomszam].kocka_value = 1;
            i++;
        }
    }
    for (var e in kocka_array) {
        kocka_array[e].szam = megszamol(e);
    }
}

function draw_kocka() {
    for (let e in kocka_array) {
        let act_kocka = kocka_array[e];
        let act_div = act_kocka.divObj;
        game_area.append(act_div);
        act_div.css({
            left: act_kocka.x_pos,
            top: act_kocka.y_pos,
            width: offset_x,
            height: offset_y
        });
        act_div.addClass('kocka');
    }
}

function click_kocka(ev) {
    let div_pos = game_area.offset();
    let mouse_posx = Math.ceil(ev.clientX - div_pos.left);
    let mouse_posy = Math.ceil(ev.clientY - div_pos.top);
    for (var e in kocka_array) {
        if (kocka_array[e].kattintott === 0 && kocka_array[e].zaszlo == 0 && mouse_posx > kocka_array[e].x_pos && mouse_posx < kocka_array[e].x_pos + offset_x && mouse_posy > kocka_array[e].y_pos && mouse_posy < kocka_array[e].y_pos + offset_y) {

            if (kocka_array[e].kocka_value === 1) {
                vesztettel();
                kocka_array[e].kattintott = 1;
                kocka_array[e].divObj.attr("src", "blowup.png");
            } else {

                switch (kocka_array[e].szam) {
                    case 0:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "ures.png");
                        kocka_lapit(e);
                        break;
                    case 1:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "1.png");
                        break;
                    case 2:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "2.png");
                        break;
                    case 3:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "3.png");
                        break;
                    case 4:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "4.png");
                        break;
                    case 5:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "5.png");
                        break;
                    case 6:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "6.png");
                        break;
                    case 7:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "7.png");
                        break;
                    case 8:
                        osszeskocka -= 1;
                        kocka_array[e].kattintott = 1;
                        kocka_array[e].divObj.attr("src", "8.png");
                        break;
                }
            }
        } else if (kocka_array[e].kattintott === 1 && kocka_array[e].zaszlo == 0 && mouse_posx > kocka_array[e].x_pos && mouse_posx < kocka_array[e].x_pos + offset_x && mouse_posy > kocka_array[e].y_pos && mouse_posy < kocka_array[e].y_pos + offset_y) {
            nagykatt(e);
        }
    }
}

function zaszlok_korul(e) {
    let zaszlok_szama = 0;
    for (var i = -1; i < 2; i++) {
        for (var k = -1; k < 2; k++) {

            sorszam = (i + parseInt(e)) + (k * kocka_sor);
            if (kocka_array[sorszam] != undefined && kocka_array[sorszam].zaszlo == 1 && Math.abs(kocka_array[sorszam].y_pos - kocka_array[e].y_pos) <= 40) {

                zaszlok_szama++;
            }
        }

    }
    return zaszlok_szama;
}

function nagykatt(e) {
    let zaszlok_szama = zaszlok_korul(e);
    for (var i = -1; i < 2; i++) {
        for (var k = -1; k < 2; k++) {

            sorszam = (i + parseInt(e)) + (k * kocka_sor);
            if (kocka_array[sorszam] != undefined && zaszlok_szama >= kocka_array[e].szam && kocka_array[sorszam].kattintott === 0 && sorszam != parseInt(e) && kocka_array[sorszam].zaszlo == 0 && Math.abs(kocka_array[sorszam].y_pos - kocka_array[e].y_pos) <= 40) {


                switch (kocka_array[sorszam].szam) {
                    case 0:
                        kocka_array[sorszam].divObj.attr("src", "ures.png");
                        kocka_array[sorszam].kattintott = 1;
                        osszeskocka -= 1;
                        kocka_lapit(sorszam);

                        break;
                    case 1:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "1.png");

                        break;
                    case 2:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "2.png");

                        break;
                    case 3:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "3.png");
                        break;
                    case 4:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "4.png");
                        break;
                    case 5:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "5.png");
                        break;
                    case 6:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "6.png");
                        break;
                    case 7:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "7.png");
                        break;
                    case 8:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "8.png");
                        break;
                }
                if (kocka_array[sorszam].kocka_value === 1) {
                    kocka_array[sorszam].kattintott = 1;
                    kocka_array[sorszam].divObj.attr("src", "blowup.png");
                    vesztettel();
                }
            }
        }

    }
}

function kocka_lapit(e) {
    for (var i = -1; i < 2; i++) {
        for (var k = -1; k < 2; k++) {

            sorszam = (i + parseInt(e)) + (k * kocka_sor);

            if (kocka_array[sorszam] != undefined && kocka_array[sorszam].kattintott === 0 && sorszam != parseInt(e) && kocka_array[sorszam].zaszlo == 0 && Math.abs(kocka_array[sorszam].y_pos - kocka_array[e].y_pos) <= 40) {

                switch (kocka_array[sorszam].szam) {
                    case 0:
                        kocka_array[sorszam].divObj.attr("src", "ures.png");
                        if (kocka_array[sorszam].kattintott == 0) {
                            kocka_array[sorszam].kattintott = 1;
                            kocka_lapit(sorszam);
                            osszeskocka -= 1;

                        }
                        break;
                    case 1:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "1.png");

                        break;
                    case 2:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "2.png");

                        break;
                    case 3:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "3.png");
                        break;
                    case 4:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "4.png");
                        break;
                    case 5:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "5.png");
                        break;
                    case 6:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "6.png");
                        break;
                    case 7:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "7.png");
                        break;
                    case 8:
                        osszeskocka -= 1;
                        kocka_array[sorszam].kattintott = 1;
                        kocka_array[sorszam].divObj.attr("src", "8.png");
                        break;
                }
            }
        }

    }
}

function megszamol(e) {
    let szam = 0;
    for (var i = -1; i < 2; i++) {
        for (var k = -1; k < 2; k++) {

            sorszam = (i + parseInt(e)) + (k * kocka_sor);

            if (kocka_array[sorszam] != undefined && Math.abs(kocka_array[sorszam].y_pos - kocka_array[e].y_pos) <= 40) {


                if (kocka_array[sorszam].kocka_value == 1) {
                    szam += 1;

                    /*if (megszamol(sorszam)==0)
                     {
                         kocka_array[sorszam].divObj.attr("src", "ures.png");
                     }*/
                }
            }


        }
    }
    return szam;
}

function reset_game() {
    youdied.currentTime = 0;
    youdied.pause();
    audio.currentTime = 0;
    audio.play();
    audio.loop = true;
    osszeskocka = kocka_oszlop * kocka_sor;
    clearInterval(timer);
    clicked = 0;
    score = 0;
    torol_kocka();
    kocka_array = [];
    $("#egyes").attr("src", "nulla.png");
    $("#tizes").attr("src", "nulla.png");
    $("#szazas").attr("src", "nulla.png");
}

function vesztettel() {
    for (let e in kocka_array) {
        if (kocka_array[e].kocka_value == 1 && kocka_array[e].kattintott == 0) {
            kocka_array[e].divObj.attr("src", "bomba.png");
            kocka_array[e].kattintott = 1;
        } else {
            kocka_array[e].kattintott = 1;
        }
    }
    youdied.play();
    audio.pause();
    $(reset).attr("src", "sadsmile.png");
    clearInterval(timer);
    console.log("vesztettel");

}

function nyertel() {
    clearInterval(timer);

    var person = prompt("Gratulálok nyertél!\nAdd meg a neved:", "anonymus");
    if (gamemode == 0)
        localStorage.setItem("e" + person, Number(score));
    else
        localStorage.setItem("h" + person, Number(score));
    fill_toplist();
}

function fill_toplist() {
    var data = [];

    $('#list_easy').html('<strong>Easy mode</strong><br><br>');
    $('#list_hard').html('<strong>Hard mode</strong><br><br>');
    for (var i = 0; i < localStorage.length; i++) {
        data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
    }
    data.sort(function (a, b) {
        return a[1] - b[1];
    });
    let hardd = 0;
    let easyy = 0;
    for (let act_data of data.keys()) {
        if (easyy < 3) {
            if (data[act_data][0].substring(0, 1) == "e" && data[act_data][0]!="enull") {
                easyy++;
                $('#list_easy').append(data[act_data][0].substring(1, data[act_data][0].length) + ' - ' + data[act_data][1] + '<br><hr>');
            }
        }
        if (hardd < 3) {
            if (data[act_data][0].substring(0, 1) == "h" && data[act_data][0]!="hnull") {
                hardd++;
                $('#list_hard').append(data[act_data][0].substring(1, data[act_data][0].length) + ' - ' + data[act_data][1] + '<br><hr>');
            }
        }
    }

}