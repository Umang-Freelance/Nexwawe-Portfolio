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
