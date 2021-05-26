
(() => {
const sideMenu = document.querySelector("[data-side-menu]")
const button = document.querySelector("[data-button-side-menu]")

button.addEventListener("click", (event) => {
    sideMenu.classList.toggle("hidden");
    
    button.classList.toggle("fa-times");
    button.classList.toggle("fa-bars");
})
})()