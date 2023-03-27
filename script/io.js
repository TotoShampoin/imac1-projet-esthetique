import data, { loadImage } from "./data.js";

const $upload = document.getElementById("upload");

$upload.addEventListener("click", e => {
    const input = document.createElement("input");
    input.type = "file";
    const reader = new FileReader();
    reader.addEventListener("load", e => {
        loadImage(reader.result);
    })
    input.addEventListener("input", () => {
        reader.readAsDataURL(input.files[0]);
    })
    input.click();
});
