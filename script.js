const letter = document.querySelector(".letter"); // nur ein Brief
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Brief zentrieren
const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
letter.style.left = `${center}px`;
letter.classList.add("center");

let isExpanded = false;

letter.addEventListener("click", (e) => {
 let distanceMoved = 0;
  const step = 2;
  const targetDistance = 50;

  const moveInterval = setInterval(() => {
    if (distanceMoved >= targetDistance) {
      clearInterval(moveInterval);

      // 2. Box auf fast die ganze Bildschirmhöhe vergrößern
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      letter.style.width = (screenWidth * 0.9) + 'px'; // 90% der Bildschirmbreite
      letter.style.height = (screenHeight * 0.9) + 'px'; // 90% der Bildschirmhöhe
      letter.style.left = (screenWidth * 0.05) + 'px';  // zentrieren
      letter.style.top = (screenHeight * 0.05) + 'px';  // zentrieren
    }

    let currentTop = parseInt(letter.style.top);
    letter.style.top = (currentTop - step) + 'px';
    distanceMoved += step;
  }, 20);
});


// Umschlag öffnen
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});



