const letter = document.querySelector("#letter1");
const flap = document.querySelector(".envelope-flap");

// Brief anklicken
letter.addEventListener("click", () => {
  flap.classList.add("behind");
  letter.classList.add("up");
  setTimeout(() => {
    letter.classList.add("big");
  }, 1000);
});

// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});
