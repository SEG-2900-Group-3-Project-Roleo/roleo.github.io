const slides = document.querySelector(".slides");
const details = document.querySelectorAll(".details");
const dotsContainer = document.querySelector(".dots");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

let currentIndex = 0;


details.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => moveToSlide(i));
  dotsContainer.appendChild(dot);
});

function moveToSlide(index) {
  currentIndex = index;
  slides.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".dots span").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}


nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % details.length;
  moveToSlide(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + details.length) % details.length;
  moveToSlide(currentIndex);
});
