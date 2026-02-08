const letters = Array.from(document.querySelectorAll(".letter"));
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Sortiere die Briefe nach der numerischen ID
letters.sort((a, b) => parseInt(a.id) - parseInt(b.id));

letters.forEach((letter) => {
  lettersContainer.appendChild(letter);

  // Briefe zentrieren
  const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
  letter.style.left = `${center}px`;

  // Prüfen, ob der Brief überläuft
  function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  if (!isOverflown(letter)) {
    letter.classList.add("center");
  }

  let isExpanded = false;

  // Klick auf Brief → nach oben fahren & vergrößern
  letter.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;
    if (isExpanded) return;

    isExpanded = true;
    letter.style.transition = "all 0.5s ease"; // sanfte Animation
    letter.style.position = "fixed";
    letter.style.top = "10px";
    letter.style.left = "50%";
    letter.style.transform = "translateX(-50%)";
    letter.style.width = "90%";
    letter.style.height = "90vh";
    letter.style.zIndex = zIndexCounter++;
    letter.style.overflow = "auto"; // Scrollbar, falls Inhalt groß

    // Close-Button Event
    const closeBtn = letter.querySelector(".closeLetter");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        isExpanded = false;
        letter.style.transition = "all 0.5s ease";
        letter.style.width = "";
        letter.style.height = "";
        letter.style.left = `${center}px`;
        letter.style.top = "1rem";
        letter.style.transform = "";
      }, { once: true });
    }
  });
});

// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});
