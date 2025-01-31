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
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

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

// Simplified carousel functionality
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
let currentSlide = 0;
const slideInterval = 3000; // 3 detik per slide

function moveToSlide(targetIndex) {
  if (targetIndex < 0) targetIndex = slides.length - 1;
  if (targetIndex >= slides.length) targetIndex = 0;

  track.style.transform = `translateX(-${targetIndex * 100}%)`;
  currentSlide = targetIndex;
}

function autoSlide() {
  moveToSlide(currentSlide + 1);
}

// Start automatic sliding
const slideTimer = setInterval(autoSlide, slideInterval);

// Pause when tab is not visible
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    clearInterval(slideTimer);
  }
});
