let player_array = [];
let epulet_array = [];
let damage_array = [];
var kijon = 0;
var nemjon = 1;
let banan = {
    napban: false
};

let megadva = false;
var c;
var ctx;
var t = 0;
var angle = "";
var velocity = "";
var enter = 0;
var repul_a_banan = false;

var zene = new Audio('undertale.mp3');
var yeet = new Audio('yeet.mp3');
var explosion = new Audio('bomb.mp3');


var rotate = 0.5 * Math.PI;
let player_img = new Image();
player_img.src = 'monke.png';
let banan_img = new Image();
banan_img.src = 'banan.png';


$(document).ready(function () {
    c = document.getElementById("raj");
    ctx = c.getContext("2d");
    $(document).on('click', play_muzsika);
    init_buildings();
    init_players();
    scoreboard();

});
window.addEventListener('keydown', get_input, false);
let time = setInterval(draw, 50);

function draw() {
    background();
    draw_numbers();
    draw_buildings();
    draw_banana();
    draw_players();
    draw_sun();
    draw_damages();
}

function play_muzsika() {
    zene.play();
}

function get_input(e) {
    if (!repul_a_banan) {
        var key = e.which;
        if (key > 47 && key < 58 && enter == 0) {
            angle += key - 48;
        }
        if (key == 13) {
            enter += 1;
        }
        if (enter == 1 && key > 47 && key < 58) {
            velocity += key - 48;

        }
        if (enter == 2) {
            set_banan();
        }
        if (key == 8 && enter == 0) {
            angle = angle.substring(0, angle.length - 1);
        }
        if (key == 8 && enter == 1) {
            velocity = velocity.substring(0, velocity.length - 1);
        }


    }
}

function add_damage_small(x_pos, y_pos) {
    damage_array.push({
        x_pos: x_pos,
        y_pos: y_pos,
        radius: 15
    });
    ctx.beginPath();
    ctx.arc(x_pos, y_pos + 14, 17, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff0101";
    ctx.fill();
}

function add_damage_big(x_pos, y_pos) {
    damage_array.push({
        x_pos: x_pos,
        y_pos: y_pos,
        radius: 100
    });
    ctx.beginPath();
    ctx.arc(x_pos, y_pos, 100, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff0101";
    ctx.fill();
}

function background() {
    ctx.beginPath();
    ctx.rect(0, 0, 1200, 600)
    ctx.fillStyle = "#0b2f83";
    ctx.fill();
}

function draw_numbers() {
    ctx.font = "Bold 20px Arial";
    ctx.fillStyle = "#f5f5f5";
    if (kijon == 0) {
        ctx.fillText("angle:" + angle, 10, 65);
        ctx.fillText("velocity:" + velocity, 10, 85);
    } else {
        ctx.fillText("angle:" + angle, 1080, 65);
        ctx.fillText("velocity:" + velocity, 1080, 85);
    }
}

function draw_damages() {
    for (let i = 0; i < damage_array.length; i++) {
        ctx.beginPath();
        ctx.arc(damage_array[i].x_pos, damage_array[i].y_pos + 14, damage_array[i].radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#0b2f83";
        ctx.fill();
    }
}

function draw_banana() {
    if (megadva) {
        rotate += 0.1 * Math.PI;
        ctx.beginPath();
        ctx.arc(banan.x_pos, banan.y_pos, 10, rotate - (1 * Math.PI), rotate);
        ctx.strokeStyle = '#ffce17';
        ctx.lineWidth = 5;
        ctx.stroke();
        t += 0.2;
        if (player_array[nemjon].x_pos > player_array[kijon].x_pos) {
            banan.x_pos = player_array[kijon].x_pos + ((Math.cos(banan.angle * Math.PI / 180) * banan.velocity) * t) + (0.5 * (t * t));
            banan.y_pos = player_array[kijon].y_pos + (-1 * (((Math.sin(banan.angle * Math.PI / 180) * banan.velocity) * t)) + (10 * (t * t)) / 2);
        } else {
            banan.x_pos = player_array[kijon].x_pos + ((Math.cos((180 - banan.angle) * Math.PI / 180) * banan.velocity) * t) + (0.5 * (t * t));
            banan.y_pos = player_array[kijon].y_pos + (-1 * (((Math.sin((180 - banan.angle) * Math.PI / 180) * banan.velocity) * t)) + (10 * (t * t)) / 2);
        }
        if (banan.y_pos > 600) {
            t = 0;
            megadva = false;
            banan = {};
            banan.napban = false;
            repul_a_banan = false;
            if (kijon == 0) {
                kijon = 1;
                nemjon = 0;
            } else {
                kijon = 0;
                nemjon = 1;
            }
        }
        if (banan.x_pos > 580 && banan.x_pos < 620 && banan.y_pos > 0 && banan.y_pos < 50) {
            banan.napban = true;
        }
        if (banan.x_pos > player_array[nemjon].x_pos && banan.x_pos < player_array[nemjon].x_pos + 50 && banan.y_pos > player_array[nemjon].y_pos - 14 && banan.y_pos < player_array[nemjon].y_pos + 70) {
            add_damage_big(banan.x_pos, banan.y_pos);
            megadva = false;
            explosion.play();
            banan.napban = false;
            nyert(kijon);
        } else {
            for (let i = 0; i < epulet_array.length; i++) {
                if (banan.x_pos > epulet_array[i].x_pos && banan.x_pos < epulet_array[i].x_pos + epulet_array[i].width && banan.y_pos > epulet_array[i].y_pos - 14) {
                    if (banan.x_pos > player_array[kijon].x_pos && banan.x_pos < player_array[kijon].x_pos + 50 && banan.y_pos > player_array[kijon].y_pos - 14 && banan.y_pos < player_array[kijon].y_pos + 70) {
                        add_damage_big(banan.x_pos, banan.y_pos);
                        megadva = false;
                        explosion.play();
                        banan.napban = false;
                        nyert(nemjon);
                        break;
                    }
                    if (kijon == 0) {
                        kijon = 1;
                        nemjon = 0;
                    } else {
                        kijon = 0;
                        nemjon = 1;
                    }
                    repul_a_banan = false;
                    banan.napban = false;
                    console.log("collision");
                    add_damage_small(banan.x_pos, banan.y_pos);
                    megadva = false;
                    banan = {};
                    explosion.play();
                    break;
                }
            }
        }
    }

}

function draw_sun() {
    ctx.beginPath();
    ctx.arc(600, 50, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffda00";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(580, 45, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(620, 45, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(600, 70, 10, 0, Math.PI);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.stroke();
    if (banan.napban) {
        ctx.beginPath();
        ctx.arc(600, 70, 12, 0, 2 * Math.PI);
        ctx.fillStyle = "#000000";
        ctx.fill();
    }


}

function draw_buildings() {

    let szinek2 = ["#ffce66"];
    for (let i = 0; i < epulet_array.length; i++) {
        ctx.beginPath();
        ctx.rect(epulet_array[i].x_pos, epulet_array[i].y_pos, epulet_array[i].width, epulet_array[i].height);
        ctx.fillStyle = epulet_array[i].color;
        ctx.fill();
        for (let j = 0; j < epulet_array[i].width; j += epulet_array[i].width / 3) {
            for (let k = 0; k < epulet_array[i].height; k += 45) {
                ctx.beginPath();
                ctx.rect(epulet_array[i].x_pos + j + 5, epulet_array[i].y_pos + k + 5, 10, 20);
                ctx.fillStyle = szinek2[0];
                ctx.fill();
            }

        }
    }
}

function draw_players() {
    for (let i = 0; i < player_array.length; i++) {
        ctx.drawImage(player_img, player_array[i].x_pos, player_array[i].y_pos, 50, 70);
    }
    ctx.font = "20px Arial";
    ctx.fillStyle = "#f5f5f5";
    ctx.fillText("Player1", 0, 20);
    ctx.fillText("Player2", 1120, 20);
}

function set_banan() {
    t = 0;
    if (angle != undefined && velocity != undefined) {
        megadva = true;
        yeet.play('yeet.mp3');
    }

    banan = {
        x_pos: player_array[kijon].x_pos,
        y_pos: player_array[kijon].y_pos,
        angle: parseFloat(angle),
        velocity: parseFloat(velocity),
        napban: false

    };
    angle = "";
    velocity = "";
    enter = 0;
    repul_a_banan = true;
    console.log(kijon);
}

function init_players() {
    let xpos = Math.floor(Math.random() * 3);
    player_array.push({
        x_pos: epulet_array[xpos].x_pos + epulet_array[xpos].width / 2 - 25,
        y_pos: epulet_array[xpos].y_pos - 70
    });
    xpos = Math.floor(Math.random() * 3) + 10;
    player_array.push({
        x_pos: epulet_array[xpos].x_pos + epulet_array[xpos].width / 2 - 25,
        y_pos: epulet_array[xpos].y_pos - 70
    });

}

function init_buildings() {
    let rendelkezesreallo = 1200;
    let votma = 0;
    let szinek1 = ["#8094ca", "#d71f1f", "#1ade81"];
    while (rendelkezesreallo > 0) {
        let wid = Math.floor(Math.random() * 30) + 70;
        let hei = Math.floor(Math.random() * 200) + 100;
        epulet_array.push({
            x_pos: votma + 2,
            y_pos: 600 - hei,
            height: hei,
            width: wid,
            color: szinek1[Math.floor(Math.random() * 3)]
        });
        votma += wid + 2;
        rendelkezesreallo -= wid;
    }
}

function nyert(ki) {
    clearInterval(time);
    ctx.font = "bold 70px Arial";
    ctx.fillStyle = "#ff0000"
    ctx.fillText("PLAYER" + (ki + 1) + " WINS", 350, 200);
    var person = setTimeout(function(){prompt("Gratulálok nyertél!\nAdd meg a neved:", "anonymus");},1000);
    localStorage.setItem(person, Number(localStorage.getItem(person))+1);
    if(person)scoreboard();
}

function scoreboard() {
    var data = [];
    var lista=0;
    for (var j = 0; j < localStorage.length; j++) {
        data[j] = [localStorage.key(j), parseInt(localStorage.getItem(localStorage.key(j)))];
    }
    data.sort(function (a, b) {
        return b[1] - a[1];
    });
    $('#scoreb').html('<p>Leaderboard (nyeresek szama)</p>');
    for (let act_data of data.keys()) {
        lista++;
        if(lista<4)
        $('#scoreb').append(data[act_data][0]+ ' - ' + data[act_data][1] + '<br><hr>');
    }
}
