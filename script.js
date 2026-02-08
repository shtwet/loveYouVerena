const letter = document.querySelector(".letter"); // nur ein Brief
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Brief zentrieren
const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
letter.style.left = `${center}px`;
letter.classList.add("center");

let isExpanded = false;

letter.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") return;
  if (isExpanded) return;

  isExpanded = true;
  letter.style.position = "fixed";
  letter.style.left = "50%";
  letter.style.transform = "translateX(-50%)";
  letter.style.zIndex = zIndexCounter++;
  letter.style.overflow = "auto";

  // Schritt 1: langsam nach oben fahren
  letter.style.transition = "top 2s ease"; // langsam
  letter.style.top = "10px";

  // Schritt 2: nach oben-Animation fertig → schnell vergrößern
  letter.addEventListener("transitionend", function grow() {
    letter.removeEventListener("transitionend", grow);
    letter.style.transition = "all 0.5s ease"; // schnell
    letter.style.width = "90%";
    letter.style.height = "90vh";
  });
});

// Close-Button Event
const closeBtn = letter.querySelector(".closeLetter");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    isExpanded = false;
    letter.style.transition = "all 1s ease"; // zurück
    letter.style.width = "";
    letter.style.height = "";
    letter.style.left = `${center}px`;
    letter.style.top = "1rem";
    letter.style.transform = "";
  });
}

// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});
