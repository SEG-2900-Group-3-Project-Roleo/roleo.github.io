
/**
 * Adds a smooth hover animation using JavaScript.
 * When the user hovers over a team box, it scales up and glows slightly.
 * When the user moves the mouse away, it smoothly returns to normal size.
 */
document.querySelectorAll("#Left div, #Middle div, #Right div").forEach(box => {
  box.addEventListener("mouseenter", () => {
    box.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    box.style.transform = "scale(1.05)";
    box.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "scale(1)";
    box.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
  });
});

