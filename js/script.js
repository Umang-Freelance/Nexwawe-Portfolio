// FAQ section

const acc = document.querySelectorAll(".accordion");
  acc.forEach(btn => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });


  // Accordion toggle
  document.querySelectorAll(".accordion").forEach((acc) => {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });


  // img section

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function changeSlide() {
    slides[currentSlide].style.opacity = 0;
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].style.opacity = 1;
}

setInterval(changeSlide, 4000); 



// SLIDER FUNCTIONALITY
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let index = 0;

    function showSlide(i) {
      if (i < 0) index = slides.length - 1;
      else if (i >= slides.length) index = 0;
      else index = i;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => showSlide(index - 1));
    nextBtn.addEventListener('click', () => showSlide(index + 1));

    // Auto Slide
    setInterval(() => showSlide(index + 1), 5000);

    // CLOCK FUNCTIONALITY
    function updateTime() {
      const now = new Date();
      document.getElementById("uae-time").textContent = now.toLocaleTimeString("en-US", {timeZone: "Asia/Dubai"});
      document.getElementById("usa-time").textContent = now.toLocaleTimeString("en-US", {timeZone: "America/New_York"});
      document.getElementById("uk-time").textContent = now.toLocaleTimeString("en-US", {timeZone: "Europe/London"});
      document.getElementById("sg-time").textContent = now.toLocaleTimeString("en-US", {timeZone: "Asia/Singapore"});
      document.getElementById("au-time").textContent = now.toLocaleTimeString("en-US", {timeZone: "Australia/Sydney"});
    }
    setInterval(updateTime, 1000);
    updateTime();


    // info-section

    document.addEventListener("DOMContentLoaded", () => {
  const infoContent = document.querySelector(".info-content");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        infoContent.classList.add("animate");   // play animation
      } else {
        infoContent.classList.remove("animate"); // reset when out of view
      }
    });
  }, { threshold: 0.2 }); // triggers when 20% visible

  observer.observe(infoContent);
});