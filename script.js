const letter = document.querySelector(".letter"); // nur ein Brief
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Brief zentrieren
const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
letter.style.left = `${center}px`;
letter.classList.add("center");

let isExpanded = false;

// Klick auf Brief → langsam nach oben und vergrößern
letter.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") return;
  if (isExpanded) return;

  isExpanded = true;
  letter.style.transition = "all 2s ease"; // viel langsamer
  letter.style.position = "fixed";
  letter.style.top = "10px";           // fährt nach oben
  letter.style.left = "50%";           // mittig
  letter.style.transform = "translateX(-50%)";
  letter.style.width = "90%";          // groß
  letter.style.height = "90vh";
  letter.style.zIndex = zIndexCounter++;
  letter.style.overflow = "auto";      // Scrollbar falls Inhalt groß

  // Close-Button Event
  const closeBtn = letter.querySelector(".closeLetter");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      isExpanded = false;
      letter.style.transition = "all 1s ease"; // langsam zurück
      letter.style.width = "";
      letter.style.height = "";
      letter.style.left = `${center}px`;
      letter.style.top = "1rem";
      letter.style.transform = "";
    }, { once: true });
  }
});

// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});
