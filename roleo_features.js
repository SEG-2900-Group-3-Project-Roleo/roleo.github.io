const container = document.getElementById("cardContainer");
const swipeLeft = document.querySelector(".swipe-indicator.left");
const swipeRight = document.querySelector(".swipe-indicator.right");

const cardImages = [
  "https://via.placeholder.com/400x500?text=Job+1",
  "https://via.placeholder.com/400x500?text=Job+2",
  "https://via.placeholder.com/400x500?text=Job+3"
];

cardImages.forEach((src, index) => {
  const card = document.createElement("div");
  card.className = "job-card";
  const img = document.createElement("img");
  img.src = src;
  card.appendChild(img);
  container.appendChild(card);
});

let isDragging = false;
let startX = 0;
let currentCard = null;

function getTopCard() {
  return container.lastElementChild;
}

container.addEventListener("mousedown", (e) => {
  currentCard = getTopCard();
  if (!currentCard) return;
  isDragging = true;
  startX = e.clientX;
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.clientX - startX;
  currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 10}deg)`;
  swipeLeft.style.opacity = deltaX < -50 ? 1 : 0;
  swipeRight.style.opacity = deltaX > 50 ? 1 : 0;
});

container.addEventListener("mouseup", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.clientX - startX;
  isDragging = false;
  swipeLeft.style.opacity = 0;
  swipeRight.style.opacity = 0;
  handleSwipe(deltaX);
});

function handleSwipe(deltaX) {
  if (Math.abs(deltaX) > 50) {
    currentCard.style.transition = "transform 0.5s, opacity 0.5s";
    currentCard.style.transform = `translateX(${deltaX * 5}px) rotate(${deltaX / 2}deg)`;
    currentCard.style.opacity = 0;
    setTimeout(() => {
      currentCard.remove();
    }, 500);
  } else {
    currentCard.style.transition = "transform 0.3s";
    currentCard.style.transform = "translateX(0px) rotate(0deg)";
  }
}


