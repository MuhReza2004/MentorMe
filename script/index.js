const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Menutup menu ketika link diklik
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Animasi Scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

// Animasi untuk benefit cards (dari kiri ke kanan)
document.querySelectorAll(".benefit-card").forEach((card, index) => {
  card.classList.add("hidden-left");
  observer.observe(card);
});

// Animasi untuk course cards (dari kanan ke kiri)
document.querySelectorAll(".course-card").forEach((card, index) => {
  card.classList.add("hidden-right");
  observer.observe(card);
});

// Animasi untuk fitur containers (dari bawah)
document.querySelectorAll(".fitur-container").forEach((container) => {
  container.classList.add("hidden-bottom");
  observer.observe(container);
});

// Animasi untuk mentor cards (bergantian kiri dan kanan)
document.querySelectorAll(".mentor-card").forEach((card, index) => {
  if (index % 2 === 0) {
    card.classList.add("hidden-left");
  } else {
    card.classList.add("hidden-right");
  }
  observer.observe(card);
});
