const textArea = document.getElementById("editor-text");
let lastKeyPressed;

const recordKeyPressed = (event) => {    
    lastKeyPressed = event.keyCode;
}

const refocusEditor = () => {
    if (lastKeyPressed != 9) return;
    textArea.focus();
    textArea.value += "  ";
}

textArea.addEventListener("keydown", recordKeyPressed);
textArea.addEventListener("blur", refocusEditor);