import data, { loadImage, add_parameter } from "./data.js";
import { classifier_ready, classify } from "./ai.js";
import { $canvas } from "./ui.js";
import "./io.js";

loadImage("./asset/placeholder.webp");
add_parameter("fit_mode", "Fit mode", ["fill", "fit"]);

(async function() {
    await classifier_ready;
    const img = new Image();
    try {
        setInterval(async function() {
            img.src = $canvas.toDataURL("image/png");
            data.guesses = await classify(img);
        }, 1000/4);
    } catch(e) {
        console.error(e);
    }
})()
