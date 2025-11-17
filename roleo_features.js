console.log("Script loaded!");

const slides = document.querySelector(".slides");
const details = document.querySelectorAll(".details");
const dotsContainer = document.querySelector(".dots");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

console.log("Slides element:", slides);
console.log("Details count:", details.length);
console.log("Prev button:", prevBtn);
console.log("Next button:", nextBtn);

let currentIndex = 0;
const totalSlides = details.length;

// Create dots
details.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    console.log("Dot clicked:", i);
    moveToSlide(i);
  });
  dotsContainer.appendChild(dot);
});

function moveToSlide(index) {
  console.log("Moving to slide:", index);
  currentIndex = index;
  slides.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".dots span").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function nextSlide() {
  console.log("Next button clicked!");
  const nextIndex = (currentIndex + 1) % totalSlides;
  moveToSlide(nextIndex);
}

function previousSlide() {
  console.log("Previous button clicked!");
  const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  moveToSlide(prevIndex);
}

// Event listeners for arrow buttons
if (nextBtn) {
  nextBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Next clicked via event listener");
    nextSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Prev clicked via event listener");
    previousSlide();
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    previousSlide();
  }
});

console.log("Slider initialized successfully!");
