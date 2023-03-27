const data =  {
    mode: "file",
    image: new Image(),
    parameters: [],
    guesses: [],
};

const $parameters = document.getElementById("parameters");

export const add_parameter = (name, title, options = [], type = "select") => {
    const param = {name, title, options, value: options[0]};
    const $li = document.createElement("li");
    const $name = document.createElement("p");
    $li.append($name);

    switch(type) {
        case "select": {
            const $select = document.createElement("select");
            $name.innerText = title;
            for(let o of options) {
                const $opt = document.createElement("option");
                $opt.value = o;
                $opt.innerText = o;
                $select.append($opt);
            }
            $select.addEventListener("change", e => {
                param.value = $select.value;
            })
            $li.append($select);
        } break;
    }
    $parameters.append($li);

    data.parameters.push(param);
}

export const get_parameter = (name) => data.parameters.find(p => p.name == name).value;
export const set_parameter = (name, value) => data.parameters.find(p => p.name == name).value = value;

export function data_init(init_image) {
    loadImage(init_image);
    add_parameter("fit_mode", "Fit mode", ["fill", "fit"]);
}

export function loadImage(src) {
    const image = new Image();
    image.src = src;
    data.image = image;
}

export default data;