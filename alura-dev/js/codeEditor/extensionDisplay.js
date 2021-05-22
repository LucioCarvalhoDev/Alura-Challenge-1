const extensionSpan = document.getElementById("extension");
const selectExtension = document.getElementById("lang-selector");

function updateExtension() {
    extensionSpan.textContent = "." + selectExtension.value;
}

selectExtension.addEventListener("change", updateExtension);

updateExtension();