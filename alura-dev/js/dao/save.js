const trigger = document.getElementById("save");

//inputs
const editor = document.getElementById("editor-text");
const langSelector = document.getElementById("lang-selector");
const name = document.getElementById("ipt-name");
const description = document.getElementById("ipt-description");
const color = document.getElementById("color-picker");


trigger.onclick = function (event) {
    event.preventDefault();

    const data = {
        text: editor.value,
        lang: langSelector.value,
        name: name.value,
        description: description.value,
        color: color.value
    };

    console.log(data);
};