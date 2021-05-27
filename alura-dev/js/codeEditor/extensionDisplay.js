(() => {
    const extensionSpan = document.getElementById("extension");
    const selectExtension = document.getElementById("lang-selector");

    const codePreview = document.querySelector(".m_code_editor_code-preview ");

    function changeClassCodePreview() {
        const oldLang = (Array.from(codePreview.classList)).indexOf(("language-" + extensionSpan.textContent.substr(1)));

        const newLang = "language-" + selectExtension.value;

        codePreview
            .classList
            .replace(codePreview.classList[oldLang], newLang);
    }

    function updateExtension() {
        extensionSpan.textContent = "." + selectExtension.value;
    }

    selectExtension.addEventListener("change", () => {
        changeClassCodePreview();
        updateExtension();
    });

    updateExtension();
})();