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

// Carousel functionality
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.createElement("button");
const prevButton = document.createElement("button");
const dotsNav = document.createElement("div");

// Setup carousel
function setupCarousel() {
  // Add buttons
  nextButton.classList.add("carousel-button", "next");
  prevButton.classList.add("carousel-button", "prev");
  nextButton.innerHTML = "&#10095;"; // Right arrow
  prevButton.innerHTML = "&#10094;"; // Left arrow

  // Add dots
  dotsNav.classList.add("carousel-nav");

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);
  });

  const carousel = document.querySelector(".carousel");
  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);
  carousel.appendChild(dotsNav);

  // Set initial position
  slides.forEach((slide, index) => {
    slide.style.left = index * 100 + "%";
  });
}

let currentSlide = 0;
const slideInterval = 3000; // Mengubah interval menjadi 3 detik
let slideTimer;

function moveToSlide(targetIndex) {
  if (targetIndex < 0) targetIndex = slides.length - 1;
  if (targetIndex >= slides.length) targetIndex = 0;

  track.style.transform = `translateX(-${targetIndex * 100}%)`;

  // Update dots
  document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === targetIndex);
  });

  currentSlide = targetIndex;
}

function autoSlide() {
  moveToSlide(currentSlide + 1);
}

function startSlideTimer() {
  stopSlideTimer();
  slideTimer = setInterval(autoSlide, slideInterval);
}

function stopSlideTimer() {
  if (slideTimer) clearInterval(slideTimer);
}

// Event listeners
nextButton.addEventListener("click", () => {
  moveToSlide(currentSlide + 1);
  startSlideTimer(); // Restart timer after manual navigation
});

prevButton.addEventListener("click", () => {
  moveToSlide(currentSlide - 1);
  startSlideTimer(); // Restart timer after manual navigation
});

dotsNav.addEventListener("click", (e) => {
  const dot = e.target.closest("button");
  if (!dot) return;

  const targetIndex = Array.from(dotsNav.children).indexOf(dot);
  moveToSlide(targetIndex);
  startSlideTimer(); // Restart timer after manual navigation
});

// Initialize carousel
setupCarousel();
startSlideTimer(); // Start automatic sliding

// Pause on hover
track.addEventListener("mouseenter", stopSlideTimer);
track.addEventListener("mouseleave", startSlideTimer);

// Restart carousel when tab becomes visible
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    startSlideTimer();
  } else {
    stopSlideTimer();
  }
});
