
const textArea = document.getElementById("editor-text");
const target = document.getElementById("char-counter");

export const updateCharCounter = () => {
    target.textContent = textArea.value.length;
}

textArea.addEventListener("input", updateCharCounter);

updateCharCounter()
