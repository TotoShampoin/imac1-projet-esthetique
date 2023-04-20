const data =  {
    mode: "file",
    pause: false,
    image: new Image(),
    video: document.createElement("video"),
    video_track: null,
    parameters: [],
    guesses: [],
    init: false,
};

const $parameters = document.getElementById("parameters");

export const add_hr = () => {
    const $hr = document.createElement("hr");
    $parameters.append($hr);
}

export const add_parameter = (name, title, options = [], type = "select") => {
    const def = options[3] ?? options[0];
    const param = {name, title, options, value: def, default: def};
    const $li = document.createElement("li");
    const $name = document.createElement("p");
    $name.innerText = title;
    $li.append($name);

    let $input;
    switch(type) {
        case "select": {
            $input = document.createElement("select");
            for(let o of options) {
                const $opt = document.createElement("option");
                $opt.value = o;
                $opt.innerText = o;
                $input.append($opt);
            }
            $input.addEventListener("change", e => {
                param.value = $input.value;
            })
        } break;
        case "boolean": {
            $input = document.createElement("input");
            $input.type = "checkbox";
            $input.checked = def;
            $input.addEventListener("change", e => {
                param.value = $input.checked;
            });
        } break;
        case "range": {
            $input = document.createElement("input");
            $input.type = "range";
            $input.min = options[0] ?? 0;
            $input.max = options[1] ?? 1;
            $input.step = options[2] ?? 0.01;
            $input.value = def;
            $input.addEventListener("input", e => {
                param.value = $input.value;
            });
        } break;
        case "color": {
            $input = document.createElement("input");
            $input.type = "color";
            $input.addEventListener("input", e => {
                param.value = $input.value;
            });
        } break;
    }
    $input.classList.add("param")
    $input.value = def;
    $li.append($input);
    $parameters.append($li);
    param.$input = $input;

    data.parameters.push(param);
}

export const get_parameter = (name) => data.parameters.find(p => p.name == name)?.value;
export const set_parameter = (name, value) => data.parameters.find(p => p.name == name).value = value;

export const reset_all = () => data.parameters.forEach(p => {
    p.value = p.default;
    p.$input.value = p.default;
});

export function loadImage(src) {
    const image = new Image();
    image.src = src;
    data.image = image;
}

export default data;

window.data = data;