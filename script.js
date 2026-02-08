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

  // Schritt 1: Startposition setzen
  const rect = letter.getBoundingClientRect();
  letter.style.top = rect.top + "px"; // aktuelle Position fixieren

  // Schritt 2: Transition vorbereiten (vorher keine Transition)
  letter.style.transition = "none";

  // Schritt 3: kleiner Delay, damit Browser den Style übernimmt
  setTimeout(() => {
    letter.style.transition = "top 2s ease"; // langsam nach oben
    letter.style.top = "10px";               // Zielposition
  }, 20); // 20ms reichen meistens

  // Schritt 4: nach oben → vergrößern
  letter.addEventListener("transitionend", function grow(e) {
    if (e.propertyName !== "top") return;
    letter.removeEventListener("transitionend", grow);
    letter.style.transition = "all 0.5s ease"; // schnell vergrößern
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

