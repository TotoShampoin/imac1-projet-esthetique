import { boids, updateBoids } from "./boids.js";
import data, { get_parameter } from "./data.js";

export const $canvas = document.createElement("canvas");
const ctx = $canvas.getContext("2d");
$canvas.width = 480; $canvas.height = 480;
document.getElementById("image").append($canvas);

const $guesses = document.getElementById("guesses");

function placeImage(image) {
    const ar = image.width / image.height;
    let w, h;
    if(
        (get_parameter("fit_mode") == "fit" && ar < 1) ||
        (get_parameter("fit_mode") == "fill" && ar > 1)
    ) {
        w = 480 * ar;
        h = 480;
    } else {
        w = 480;
        h = 480 / ar;
    }
    ctx.drawImage(image, (480 - w)/2, (480 - h)/2, w, h);
}

const size = 15;
function placeBoid(boid) {
    const {x, y} = boid.position;
    const angle = boid.angle;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2/size;
    ctx.fillStyle = "#888";
    ctx.save();
        ctx.transform(
            Math.cos(angle) * size, Math.sin(angle) * size,
            -Math.sin(angle) * size, Math.cos(angle) * size,
            x, y
        );
        ctx.beginPath();
            ctx.moveTo(1, 0);
            ctx.lineTo(-1, .5);
            ctx.lineTo(-1, -.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    ctx.restore();
}

export function writeGuesses(guesses) {
    let html = "";
    for(let guess of guesses) {
        html += `<li>
            <var>${Math.round(guess.confidence * 1000)/10}%</var>
            <p>${guess.label}</p>
        </li>`;
    }
    if(html != $guesses.innerHTML) $guesses.innerHTML = html;
}

// The display loop (60 fps)
function displayLoop() {
    ctx.clearRect(0, 0, 480, 480);
    if(data.image.src != "") {
        placeImage(data.image);
    }
    // updateBoids(1/60);
    // boids.forEach(placeBoid);
    writeGuesses(data.guesses);
}

setInterval(displayLoop, 1000/60);
