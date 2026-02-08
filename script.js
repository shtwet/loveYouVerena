const letter = document.querySelector(".letter"); // nur ein Brief
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Brief zentrieren
const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
letter.style.left = `${center}px`;
letter.classList.add("center");

let isExpanded = false;

letter.addEventListener("click", (e) => {
  flap.style.zIndex = "-1"; // Klappe nach hinten
  letter.classList.add("up");  // Hochfahren
  letter.classList.add("big"); // Vergrößern
  
});


// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");

});
















