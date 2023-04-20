import { get_parameter } from "./data.js";

export const $draw = document.createElement("canvas");
const ctx = $draw.getContext("2d");
$draw.width = 480; $draw.height = 480;
// document.getElementById("image").append($draw);

ctx.fillStyle = "none";
ctx.lineCap = "round";


let is_drawing = false;
let last = {x: 0, y: 0};

export function penClear() {
    ctx.clearRect(0, 0, 480, 480);
}

export function penDown(x, y) {
    is_drawing = true;
    last = {x, y};
}

export function penMove(x, y) {
    ctx.strokeStyle = get_parameter("pen-color");
    ctx.lineWidth = get_parameter("pen-size");
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last = {x, y};
}

export function penUp(x, y) {
    is_drawing = false;
}
