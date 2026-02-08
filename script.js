const letter = document.querySelector(".letter"); // nur ein Brief
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Brief zentrieren
const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
letter.style.left = `${center}px`;
letter.classList.add("center");

let isExpanded = false;

letter.addEventListener("click", (e) => {
  console.log("click");
  document.getElementById("letter1").classList.add("up");
});


// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});







