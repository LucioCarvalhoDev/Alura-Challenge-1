
(() => {
    const textArea = document.getElementById("editor-text");
let lastKeyPressed;

const tabStr = "  ";

const insertTab = () => {
    const caretPosition = [textArea.selectionStart, textArea.selectionEnd]

    textArea.focus();

    let newText = textArea.value.split('')
    newText.splice(caretPosition[0], 0, tabStr);

    textArea.value = newText.join("");

    //Posiciona cursor corretamente
    textArea.selectionStart = caretPosition[0] + tabStr.length;
    textArea.selectionEnd = caretPosition[1] + tabStr.length;
}

textArea.addEventListener("keydown", (event) => {
    if (event.key != "Tab") return;
    event.preventDefault();
    insertTab();
});
})()