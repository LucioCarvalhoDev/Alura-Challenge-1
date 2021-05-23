const textArea = document.getElementById("editor-text");
let lastKeyPressed;

const recordKeyPressed = (event) => {    
    lastKeyPressed = event.keyCode;
}

const tabStr = "  "

const refocusEditor = () => {
    //Ultima tecla pressionada foi TAB?
    if (lastKeyPressed != 9) return;

    const caretPosition = [textArea.selectionStart, textArea.selectionEnd]

    textArea.focus();

    let newText = textArea.value.split('')
    newText.splice(caretPosition[0], 0, tabStr);

    textArea.value = newText.join("");

    //Posiciona cursor corretamente
    textArea.selectionStart = caretPosition[0] + tabStr.length;
    textArea.selectionEnd = caretPosition[1] + tabStr.length;
}

textArea.addEventListener("keydown", recordKeyPressed);
textArea.addEventListener("blur", refocusEditor);