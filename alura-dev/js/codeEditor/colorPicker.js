
(() => {
    const button = document.querySelector("[data-color-picker]");
const codeEditor = document.querySelector(".m_code_editor");

const colorClasses = ["red", "blue", "green", "white"];

let i = -1;

button.addEventListener("click", switchColors)

function switchColors(event={preventDefault: ()=>{}}) {
    event.preventDefault();

    button.classList.remove(colorClasses[i]);
    codeEditor.classList.remove(colorClasses[i]);
    i == colorClasses.length -1 ? i = 0 : i++;
    button.classList.add(colorClasses[i])
    codeEditor.classList.add(colorClasses[i]);
}

switchColors();
})()