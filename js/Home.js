// Header Bg Blur
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("blur");
  } else {
    header.classList.remove("blur");
  }
});

// Auto Write Js
document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "Mobile App Developer",
      "Web Developers",
      "UI/UX Designers",
      "Digital Marketers",
    ],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
  });
});

// Award Carousel JS
const container = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".award-badge");
const dotsContainer = document.querySelector(".carousel-dots");

let scrollSpeed = 0.5;
let position = 0;
let isManual = false;

container.innerHTML += container.innerHTML;
const totalSlides = slides.length;

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll(".dot");

function loop() {
  if (!isManual) {
    position -= scrollSpeed;
    if (Math.abs(position) >= container.scrollWidth / 2) {
      position = 0;
    }
    container.style.transform = `translateX(${position}px)`;
  }
  requestAnimationFrame(loop);
}
loop();

function showSlide(i) {
  isManual = true;
  const slideWidth = document.querySelector(".award-badge").offsetWidth;
  position = -(i * slideWidth);
  container.style.transform = `translateX(${position}px)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[i].classList.add("active");
  setTimeout(() => {
    isManual = false;
  }, 3000);
}

// Auto Number Increment JS

// Watch Slider JS
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const carousel = document.getElementById("carousel");

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  slides[index].classList.add("active");
  indicators[index].classList.add("active");

  carousel.style.transform = `translateX(-${index * 100}%)`;
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  showSlide(index);
}

setInterval(nextSlide, 8000);

function drawClock(canvasId, timezone) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2 - 10;
  ctx.translate(radius + 10, radius + 10);

  function draw() {
    const now = new Date();
    const time = new Date(now.toLocaleString("en-US", { timeZone: timezone }));

    ctx.clearRect(-radius - 10, -radius - 10, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(79, 70, 229, 0.1)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const x1 = Math.cos(angle - Math.PI / 2) * (radius * 0.9);
      const y1 = Math.sin(angle - Math.PI / 2) * (radius * 0.9);
      const x2 = Math.cos(angle - Math.PI / 2) * (radius * 0.8);
      const y2 = Math.sin(angle - Math.PI / 2) * (radius * 0.8);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourAngle = (hours * Math.PI) / 6 + (minutes * Math.PI) / 360;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      Math.cos(hourAngle - Math.PI / 2) * radius * 0.5,
      Math.sin(hourAngle - Math.PI / 2) * radius * 0.5
    );
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();

    const minuteAngle = (minutes * Math.PI) / 30;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      Math.cos(minuteAngle - Math.PI / 2) * radius * 0.7,
      Math.sin(minuteAngle - Math.PI / 2) * radius * 0.7
    );
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 3;
    ctx.stroke();

    const secondAngle = (seconds * Math.PI) / 30;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      Math.cos(secondAngle - Math.PI / 2) * radius * 0.8,
      Math.sin(secondAngle - Math.PI / 2) * radius * 0.8
    );
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  draw();
  setInterval(draw, 1000);
}

function updateDigitalTimes() {
  const timezones = {
    uaeTime: "Asia/Dubai",
    usaTime: "America/New_York",
    ukTime: "Europe/London",
    sgTime: "Asia/Singapore",
    ausTime: "Australia/Sydney",
  };

  Object.entries(timezones).forEach(([elementId, timezone]) => {
    const element = document.getElementById(elementId);
    if (element) {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        timeZone: timezone,
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      element.textContent = timeString;
    }
  });
}

function initializeClocks() {
  const clockConfigs = [
    { canvasId: "uaeClock", timezone: "Asia/Dubai" },
    { canvasId: "usaClock", timezone: "America/New_York" },
    { canvasId: "ukClock", timezone: "Europe/London" },
    { canvasId: "sgClock", timezone: "Asia/Singapore" },
    { canvasId: "ausClock", timezone: "Australia/Sydney" },
  ];

  clockConfigs.forEach((config) => {
    drawClock(config.canvasId, config.timezone);
  });

  updateDigitalTimes();
  setInterval(updateDigitalTimes, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initializeClocks, 100);

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
});

const section = document.querySelector(".section");
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 8000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

section.addEventListener("mouseenter", stopAutoPlay);
section.addEventListener("mouseleave", startAutoPlay);

startAutoPlay();

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

document.querySelectorAll(".clock-card, .step").forEach((el) => {
  observer.observe(el);
});

// NOT JUST EXPERTISE JS
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = 8 + Math.random() * 4 + "s";
    particlesContainer.appendChild(particle);
  }
}

createParticles();

document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".info-section");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  cursor.style.background = `linear-gradient(135deg, 
                hsl(${240 + x * 60}, 70%, ${60 + y * 10}%) 0%, 
                hsl(${280 + y * 40}, 60%, ${50 + x * 20}%) 100%)`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
});

document.querySelectorAll(".tagline, .cta-button").forEach((el) => {
  observer.observe(el);
});

// Footer JS
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = particle.style.height = Math.random() * 6 + 2 + "px";
    particle.style.animationDelay = Math.random() * 12 + "s";
    particle.style.animationDuration = 8 + Math.random() * 8 + "s";
    particlesContainer.appendChild(particle);
  }
}

createParticles();

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".footer-left, .footer-col, .footer-bottom")
  .forEach((el) => {
    observer.observe(el);
  });

function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".footer-container, .footer-bottom"
  );

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) rotate(10deg) scale(1.1)";
  });

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotate(0deg) scale(1)";
  });
});

document.querySelectorAll(".footer-col ul li a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const contactBtn = document.querySelector(".contact-btn");
contactBtn.addEventListener("click", function (e) {
  e.preventDefault();

  this.style.transform = "scale(0.95)";
  setTimeout(() => {
    this.style.transform = "";
  }, 150);

  const originalText = this.textContent;
  this.textContent = "Connecting...";
  this.style.background = "linear-gradient(45deg, #28a745, #20c997)";

  setTimeout(() => {
    this.textContent = originalText;
    this.style.background = "linear-gradient(45deg, #007bff, #00c3ff)";
  }, 2000);
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  const footer = document.querySelector("footer");

  if (footer) {
    footer.style.backgroundPositionY = rate + "px";
  }
});

const style = document.createElement("style");
style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 123, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

const footerElement = document.querySelector("footer");
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.documentElement.style.setProperty(
        "--animation-play-state",
        "running"
      );
    } else {
      document.documentElement.style.setProperty(
        "--animation-play-state",
        "paused"
      );
    }
  });
});

footerObserver.observe(footerElement);

document.addEventListener("DOMContentLoaded", function () {
  revealOnScroll();

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Industry We Serve JS
document.addEventListener("DOMContentLoaded", function () {
  // Add animation class when section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(document.querySelector(".industry-section"));

  // Add touch swipe support for mobile
  let startX = null;
  const grid = document.querySelector(".industry-grid");

  grid.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  grid.addEventListener(
    "touchend",
    (e) => {
      if (!startX) return;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swipe left - scroll right
          grid.scrollBy({ left: 100, behavior: "smooth" });
        } else {
          // Swipe right - scroll left
          grid.scrollBy({ left: -100, behavior: "smooth" });
        }
      }
      startX = null;
    },
    { passive: true }
  );

  // Add click ripple effect
  document.querySelectorAll(".industry-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(100, 255, 218, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.pointerEvents = "none";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation styles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    .industry-card {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // Performance optimization: Reduce animations on low-end devices
  const isLowEndDevice =
    navigator.hardwareConcurrency <= 2 ||
    navigator.deviceMemory <= 4 ||
    /Android.*Chrome\/[.0-9]*\s Mobile/.test(navigator.userAgent);

  if (isLowEndDevice) {
    document.querySelectorAll(".industry-card").forEach((card) => {
      card.style.animation = "none";
      card.style.opacity = "1";
    });
  }
});

// accordian JS
document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      const panel = this.nextElementSibling;
      const toggleBtn = this.querySelector(".toggle-btn");
      const isActive = this.classList.contains("active");

      // Close all other panels
      accordions.forEach((acc) => {
        if (acc !== this) {
          acc.classList.remove("active");
          acc.nextElementSibling.classList.remove("open");
          acc.querySelector(".toggle-btn").textContent = "+";
        }
      });

      // Toggle current panel
      if (!isActive) {
        this.classList.add("active");
        panel.classList.add("open");
        toggleBtn.textContent = "×";
      } else {
        this.classList.remove("active");
        panel.classList.remove("open");
        toggleBtn.textContent = "+";
      }
    });
  });

  // Add some interactive elements on load
  setTimeout(() => {
    document.querySelector(".faq-left").style.opacity = "1";
    document.querySelector(".faq-left").style.transform = "translateX(0)";
  }, 200);

  setTimeout(() => {
    document.querySelector(".faq-right").style.opacity = "1";
    document.querySelector(".faq-right").style.transform = "translateX(0)";
  }, 400);
});

// Add parallax effect on scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".mockup");
  const speed = 0.5;

  parallaxElements.forEach((element, index) => {
    const yPos = -(scrolled * speed * (index % 2 === 0 ? 1 : -1));
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Testimonials JS
// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = particle.style.height = Math.random() * 8 + 3 + "px";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = 10 + Math.random() * 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 30,
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
      coverflowEffect: {
        rotate: 0,
        depth: 100,
      },
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
      coverflowEffect: {
        rotate: 5,
        depth: 150,
      },
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 25,
      coverflowEffect: {
        rotate: 10,
        depth: 200,
      },
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
      coverflowEffect: {
        rotate: 15,
        depth: 300,
      },
    },
    1200: {
      slidesPerView: 2.2,
      spaceBetween: 40,
      coverflowEffect: {
        rotate: 15,
        depth: 300,
      },
    },
  },
  on: {
    slideChange: function () {
      // Add entrance animation to active slide
      const activeSlide = document.querySelector(
        ".swiper-slide-active .testimonial-card"
      );
      if (activeSlide) {
        activeSlide.style.animation = "none";
        setTimeout(() => {
          activeSlide.style.animation = "slideInFromBottom 0.8s ease-out";
        }, 50);
      }
    },
    init: function () {
      // Initial animation for first slide
      setTimeout(() => {
        const firstSlide = document.querySelector(
          ".swiper-slide-active .testimonial-card"
        );
        if (firstSlide) {
          firstSlide.style.animation = "slideInFromBottom 0.8s ease-out";
        }
      }, 100);
    },
  },
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      // Start autoplay when section is visible
      if (entry.target.classList.contains("testimonials-section")) {
        swiper.autoplay.start();
      }
    } else {
      // Pause autoplay when section is not visible
      if (entry.target.classList.contains("testimonials-section")) {
        swiper.autoplay.stop();
      }
    }
  });
}, observerOptions);

observer.observe(document.querySelector(".testimonials-section"));

// Enhanced card hover effects
document.querySelectorAll(".testimonial-card").forEach((card) => {
  let hoverTimeout;

  card.addEventListener("mouseenter", function () {
    clearTimeout(hoverTimeout);

    // Pause autoplay on hover
    swiper.autoplay.stop();

    // Add glow effect
    this.style.boxShadow =
      "0 30px 60px rgba(0, 123, 255, 0.3), 0 0 50px rgba(138, 43, 226, 0.2)";

    // Animate author info
    const authorName = this.querySelector(".author-name");
    const authorTitle = this.querySelector(".author-title");
    if (authorName) authorName.style.color = "#007bff";
    if (authorTitle) authorTitle.style.color = "#8a2be2";

    // Animate stars
    const stars = this.querySelectorAll(".star");
    stars.forEach((star, index) => {
      setTimeout(() => {
        star.style.transform = "scale(1.3) rotate(15deg)";
        star.style.textShadow = "0 0 10px #ffd700";
      }, index * 100);
    });
  });

  card.addEventListener("mouseleave", function () {
    // Resume autoplay after delay
    hoverTimeout = setTimeout(() => {
      swiper.autoplay.start();
    }, 1000);

    // Reset styles
    this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";

    const authorName = this.querySelector(".author-name");
    const authorTitle = this.querySelector(".author-title");
    if (authorName) authorName.style.color = "#fff";
    if (authorTitle) authorTitle.style.color = "#007bff";

    // Reset stars
    const stars = this.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.transform = "scale(1) rotate(0deg)";
      star.style.textShadow = "none";
    });
  });
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", function (event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  }
}

// Keyboard navigation
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    swiper.slidePrev();
  } else if (event.key === "ArrowRight") {
    swiper.slideNext();
  }
});

// Performance optimization
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    swiper.update();
  }, 250);
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = "0";
      img.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        img.style.opacity = "1";
      }, 100);

      imageObserver.unobserve(img);
    }
  });
});

document
  .querySelectorAll(".testimonial-image img, .company-logo img")
  .forEach((img) => {
    imageObserver.observe(img);
  });

// Add ripple effect to clickable elements
function addRippleEffect(element, event) {
  const rect = element.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.className = "ripple-effect";

  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 1000);
}

// Apply ripple to navigation buttons
document
  .querySelectorAll(".swiper-button-next, .swiper-button-prev")
  .forEach((btn) => {
    btn.addEventListener("click", function (e) {
      addRippleEffect(this, e);
    });
  });

// Add CSS for ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: rippleAnimation 1s linear;
                pointer-events: none;
            }
            
            @keyframes rippleAnimation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .swiper-button-next,
            .swiper-button-prev {
                position: relative;
                overflow: hidden;
            }
        `;
document.head.appendChild(rippleStyle);

// Initialize all animations on load
document.addEventListener("DOMContentLoaded", function () {
  // Trigger initial animations
  setTimeout(() => {
    document.querySelector(".section-header").classList.add("animate");
  }, 500);

  // Auto-start slideshow
  setTimeout(() => {
    swiper.autoplay.start();
  }, 2000);
});

// Accessibility improvements
document.querySelectorAll(".testimonial-card").forEach((card, index) => {
  card.setAttribute("role", "article");
  card.setAttribute("aria-label", `Testimonial ${index + 1}`);
  card.setAttribute("tabindex", "0");

  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      this.click();
    }
  });
});

// Progress indicator
const progressBar = document.createElement("div");
progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #007bff, #8a2be2);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
document.body.appendChild(progressBar);

// Update progress on slide change
swiper.on("slideChange", function () {
  const progress = ((swiper.realIndex + 1) / swiper.slides.length) * 100;
  progressBar.style.width = progress + "%";
});
