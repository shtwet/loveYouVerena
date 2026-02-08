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

  let offsetX, offsetY;
  let isExpanded = false;

  // Desktop: Drag & Drop
  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") startDrag(e, false);
  });

  // Mobile: Touch zum Öffnen & Vergrößern
  letter.addEventListener("touchstart", (e) => {
    if (!isExpanded && e.target.tagName !== "BUTTON") {
      e.preventDefault();
      expandLetter(letter);
    } else {
      startDrag(e, true);
    }
  });

  function startDrag(e, isTouch) {
    const rect = letter.getBoundingClientRect();
    letter.style.position = "fixed";
    letter.style.left = `${rect.left}px`;
    letter.style.top = `${rect.top}px`;
    letter.style.zIndex = zIndexCounter++;

    if (isTouch) {
      const touch = e.touches[0];
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      const onTouchMove = (touchEvent) => {
        const t = touchEvent.touches[0];
        moveAt(t.clientX, t.clientY);
      };

      const onTouchEnd = () => {
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };

      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
    } else {
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      const onMouseMove = (moveEvent) => moveAt(moveEvent.clientX, moveEvent.clientY);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    function moveAt(posX, posY) {
      letter.style.left = `${posX - offsetX}px`;
      letter.style.top = `${posY - offsetY}px`;
    }
  }

  function expandLetter(letter) {
    isExpanded = true;
    letter.style.transition = "all 0.4s ease";
    letter.style.position = "fixed";
    letter.style.left = "50%";
    letter.style.top = "10px";
    letter.style.transform = "translateX(-50%)";
    letter.style.width = "90%";
    letter.style.height = "90vh";
    letter.style.zIndex = zIndexCounter++;

    // Optional: Scrollbar aktivieren
    letter.style.overflow = "auto";

    // Beim Schließen zurücksetzen
    const closeBtn = letter.querySelector(".closeLetter");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        isExpanded = false;
        letter.style.transition = "all 0.4s ease";
        letter.style.width = ""; // ursprüngliche Breite
        letter.style.height = "";
        letter.style.left = `${center}px`;
        letter.style.top = "1rem";
        letter.style.transform = "";
      }, { once: true });
    }
  }
});

// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});

// Briefe schließen (für Desktop & fallback)
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) letter.style.display = "none";
  });
});
