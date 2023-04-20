import data, { loadImage, add_parameter, add_hr } from "./data.js";
import { classifier_ready, classify } from "./ai.js";
import { $canvas } from "./ui.js";
import "./io.js";

loadImage("./asset/placeholder.webp");

const parameters = await fetch("./script/parameters.json").then(r => r.json());

parameters.forEach(param => {
    if(param == "hr") {
        add_hr();
        return;
    }
    add_parameter(...Object.values(param))
});
console.log(data);

(async function() {
    await classifier_ready;
    const img = new Image();
    try {
        setInterval(async function() {
            if(data.pause) return;
            img.src = $canvas.toDataURL("image/png");
            data.guesses = await classify(img);
            data.init = true;
        }, 1000/3);
    } catch(e) {
        console.error(e);
    }
})();
