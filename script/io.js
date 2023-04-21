import data, { loadImage, reset_all, set_parameter } from "./data.js";
import { penClear, penDown, penMove, penUp } from "./draw.js";

import { $canvas } from "./ui.js";

const $upload = document.getElementById("upload");
const $webcam = document.getElementById("webcam");
const $pause = document.getElementById("pause");
const $clear = document.getElementById("clear");
const $reset = document.getElementById("reset");
const $close = document.getElementById("popup-close");
const $open = document.getElementById("popup-open");

$upload.addEventListener("click", e => {
    const input = document.createElement("input");
    input.type = "file";
    const reader = new FileReader();
    reader.addEventListener("load", e => {
        loadImage(reader.result);
        if(data.video_track && data.video_track.stop) data.video_track.stop();
        data.mode = "file";
    })
    input.addEventListener("input", () => {
        reader.readAsDataURL(input.files[0]);
    })
    input.click();
});

$webcam.addEventListener("click", async e => {
    const media = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: 'environment'
        }
    });
    data.video.setAttribute('autoplay',true);
    data.video.srcObject = media;
    data.video_track = media.getTracks()[0];
    data.mode = "camera";
});

$pause.addEventListener("click", e => {
    data.pause = !data.pause;
    $pause.dataset["value"] = `${data.pause}`;
});

$clear.addEventListener("click", e => {
    penClear();
});
$reset.addEventListener("click", e => {
    reset_all();
});

$close.addEventListener("click", e => {
    document.getElementById("popup-screen").classList.add("hidden");
});

$open.addEventListener("click", e => {
    document.getElementById("popup-screen").classList.remove("hidden");
})

$canvas.addEventListener("touchstart", e => {
    const rect = e.target.getBoundingClientRect();
    const rw = rect.right - rect.left;
    const rh = rect.bottom - rect.top;
    const px = e.changedTouches[0].clientX - rect.left;
    const py = e.changedTouches[0].clientY - rect.top;
    const x = px * 480 / rw;
    const y = py * 480 / rh;
    penDown(x, y);
});
$canvas.addEventListener("touchend", e => {
    const rect = e.target.getBoundingClientRect();
    const rw = rect.right - rect.left;
    const rh = rect.bottom - rect.top;
    const px = e.changedTouches[0].clientX - rect.left;
    const py = e.changedTouches[0].clientY - rect.top;
    const x = px * 480 / rw;
    const y = py * 480 / rh;
    penUp(x, y);
});
$canvas.addEventListener("touchcancel", e => {
    const rect = e.target.getBoundingClientRect();
    const rw = rect.right - rect.left;
    const rh = rect.bottom - rect.top;
    const px = e.changedTouches[0].clientX - rect.left;
    const py = e.changedTouches[0].clientY - rect.top;
    const x = px * 480 / rw;
    const y = py * 480 / rh;
    penUp(x, y);
});
$canvas.addEventListener("touchmove", e => {
    const rect = e.target.getBoundingClientRect();
    const rw = rect.right - rect.left;
    const rh = rect.bottom - rect.top;
    const px = e.changedTouches[0].clientX - rect.left;
    const py = e.changedTouches[0].clientY - rect.top;
    const x = px * 480 / rw;
    const y = py * 480 / rh;
    penMove(x, y);
});

$canvas.addEventListener("mousedown", e => {
    const rect = e.target.getBoundingClientRect();
    const rw = rect.right - rect.left;
    const rh = rect.bottom - rect.top;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = px * 480 / rw;
    const y = py * 480 / rh;
    penDown(x, y);
});
document.addEventListener("mouseup", e => {
    const rect = e.target.getBoundingClientRect();
    const rw = rect.right - rect.left;
    const rh = rect.bottom - rect.top;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = px * 480 / rw;
    const y = py * 480 / rh;
    penUp(x, y);
});
$canvas.addEventListener("mousemove", e => {
    const rect = e.target.getBoundingClientRect();
    const rw = rect.right - rect.left;
    const rh = rect.bottom - rect.top;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = px * 480 / rw;
    const y = py * 480 / rh;
    penMove(x, y);
})