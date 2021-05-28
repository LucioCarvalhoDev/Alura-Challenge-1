
(() => {
    const picker = document.getElementById("color-picker");
    const bg = document.getElementById("bg-color-picker");
    const codeEditor = document.querySelector(".m_code_editor");

    picker.onchange = updateView;

    function updateView() {
        codeEditor.style.background = picker.value;
        bg.style.background = picker.value;
    }

    updateView();
})();