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

  // Drag & Drop Funktion
  let offsetX, offsetY;
  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") {
      const rect = e.target.getBoundingClientRect();

      letter.style.position = "fixed";
      letter.style.left = `${rect.left}px`;
      letter.style.top = `${rect.top}px`;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      letter.style.zIndex = zIndexCounter++;
      const moveAt = (posX, posY) => {
        letter.style.left = `${posX - offsetX}px`;
        letter.style.top = `${posY - offsetY}px`;
      };
      const onMouseMove = (moveEvent) => moveAt(moveEvent.clientX, moveEvent.clientY);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });
});

// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});

// Briefe schließen
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) letter.style.display = "none";
  });
});
