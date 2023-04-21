import data, { get_parameter } from "./data.js";
import { $draw } from "./draw.js";

export const $canvas = document.createElement("canvas");
const ctx = $canvas.getContext("2d");
$canvas.width = 480; $canvas.height = 480;
document.getElementById("image").append($canvas);

const image_canvas = document.createElement("canvas");
const ctx_i = image_canvas.getContext("2d");
image_canvas.width = 480; image_canvas.height = 480;

const $guesses = document.getElementById("guesses");

function loadingIcon() {
    let html = `<li class="loading">
        <svg class="loading-icon">
            <use href="./asset/loading.svg#loading"></use>
        </svg>
        <p class="loading-text">AI is starting...</p>
    </li>`
    if(html != $guesses.innerHTML) $guesses.innerHTML = html;
}

export function writeGuesses(guesses) {
    let html = "";
    for(let guess of guesses) {
        html += `<li>
            <var class="guess-score">${Math.round(guess.confidence * 1000)/10}%</var>
            <p class="guess-name">${guess.label}</p>
        </li>`;
    }
    if(html != $guesses.innerHTML) $guesses.innerHTML = html;
}


function placeImage(image, fit_mode) {
    const ar = (image.width || image.videoWidth) / (image.height || image.videoHeight);
    let w, h;
    if((fit_mode == "fit" && ar < 1) || (fit_mode == "fill" && ar > 1)) {
        w = 480 * ar; h = 480;
    } else {
        w = 480; h = 480 / ar;
    }
    ctx_i.clearRect(0, 0, 480, 480);
    ctx_i.drawImage(image, (480 - w)/2, (480 - h)/2, w, h);
    ctx.drawImage(image_canvas, 0, 0);
    if(get_parameter("repeat")) {
        for(let i = -15; i <= 15; i++) {
        for(let j = -15; j <= 15; j++) {
            ctx.drawImage(image_canvas, i*480, j*480);
        }
        }
    }
}

function placeFilters() {
    ctx.globalCompositeOperation = "color";
    ctx.fillStyle = "white";
    ctx.globalAlpha = get_parameter("grayscale");
    ctx.fillRect(0, 0, 480, 480);

    if(get_parameter("invert")) {
        ctx.globalCompositeOperation = "difference";
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, 480, 480);
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage($draw, 0, 0);
}

function placeTransforms() {
    ctx.translate(240, 240);
    ctx.translate(get_parameter("translate-x"), get_parameter("translate-y"))
    ctx.rotate(get_parameter("rotate") * Math.PI / 180);
    ctx.scale(get_parameter("scale-x"), get_parameter("scale-y"));
    ctx.translate(-240, -240);
}

// The display loop (60 fps)
let t0 = new Date().getTime(), t1, dt = 1000/60;
function displayLoop() {
    if(data.init) {
        writeGuesses(data.guesses);
    } else {
        loadingIcon();
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, 480, 480);
    ctx.save();
    
    placeTransforms();
    if(data.mode == "file" && data.image.src != "") {
        placeImage(data.image, get_parameter("fit_mode"));
    } else if(data.mode == "camera" && data.video.srcObject) {
        placeImage(data.video, get_parameter("fit_mode"));
    }
    ctx.restore();

    placeFilters();

    t1 = new Date().getTime();
    dt = t1 - t0;
    t0 = t1;
}

setInterval(displayLoop, 1000/60);
