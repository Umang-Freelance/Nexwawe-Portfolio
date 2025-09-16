// <!-- industry-section -->

document.addEventListener("DOMContentLoaded", () => {
  const industrySection = document.querySelector(".industry-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        industrySection.classList.add("animate");   // slide in
      } else {
        industrySection.classList.remove("animate"); // reset when out of view
      }
    });
  }, { threshold: 0.2 }); // triggers when 20% visible

  observer.observe(industrySection);
});


// <!-- circle-section -->

 const carousel = document.getElementById('carousel');
let currentIndex = 0;
let autoScroll;

function showSlide(index) {
  const totalSlides = document.querySelectorAll('.slide').length;
  if (index >= totalSlides) index = 0;
  if (index < 0) index = totalSlides - 1;

  currentIndex = index;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function autoSlide() {
  autoScroll = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 6000);
}

function nextSlide() {
  clearInterval(autoScroll);
  showSlide(currentIndex + 1);
  autoSlide();
}

function prevSlide() {
  clearInterval(autoScroll);
  showSlide(currentIndex - 1);
  autoSlide();
}

autoSlide();

  const clocks = [
    { id: 'uaeClock', tz: 'Asia/Dubai', timeId: 'uaeTime' },
    { id: 'usaClock', tz: 'America/New_York', timeId: 'usaTime' },
    { id: 'ukClock', tz: 'Europe/London', timeId: 'ukTime' },
    { id: 'sgClock', tz: 'Asia/Singapore', timeId: 'sgTime' },
    { id: 'ausClock', tz: 'Australia/Sydney', timeId: 'ausTime' },
  ];

  function drawClock(canvas, date) {
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = radius * 0.03;
  ctx.stroke();

  ctx.font = radius * 0.18 + "px Arial"; 
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "black"; 
  
  for (let num = 1; num <= 12; num++) {
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.70);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.70);
    ctx.rotate(-ang);
  }

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

 hour = hour % 12;
hour = (hour * Math.PI / 6) +
       (minute * Math.PI / (6 * 60)) +
       (second * Math.PI / (360 * 60));
drawHand(ctx, hour, radius * 0.5, radius * 0.025); // thin hour

minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
drawHand(ctx, minute, radius * 0.7, radius * 0.02); // thin minute

second = (second * Math.PI / 30);
drawHand(ctx, second, radius * 0.8, radius * 0.01, 'red'); // thin second

// 🔴 Center circle
ctx.beginPath();
ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI); 
ctx.fillStyle = "black";
ctx.fill();

ctx.restore();
}

  function drawHand(ctx, pos, length, width, color = 'black') {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  function updateClocks() {
    clocks.forEach(clock => {
      const now = new Date();
      const localTime = new Date(now.toLocaleString("en-US", { timeZone: clock.tz }));
      const canvas = document.getElementById(clock.id);
      if (canvas) drawClock(canvas, localTime);
      const timeText = localTime.toLocaleTimeString('en-GB', { hour12: false });
      const timeElement = document.getElementById(clock.timeId);
      if (timeElement) timeElement.textContent = timeText;
    });
  }
  
  setInterval(updateClocks, 1000);
  updateClocks();

// <!-- faq section togal button -->

const accordions = document.querySelectorAll(".accordion");
  const panels = document.querySelectorAll(".panel");

  accordions.forEach((acc, index) => {
    const btn = acc.querySelector(".toggle-btn");
    const panel = panels[index];

    acc.addEventListener("click", () => {
      const isOpen = panel.classList.contains("open");

      // Close all
      panels.forEach(p => p.classList.remove("open"));
      document.querySelectorAll(".toggle-btn").forEach(b => b.textContent = "+");

      if (!isOpen) {
        panel.classList.add("open");
        btn.textContent = "-";
      }
    });
  });

// <!-- faq-section auto scroll -->

  document.addEventListener("DOMContentLoaded", () => {
  const faqLeft = document.querySelector(".faq-left");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        faqLeft.classList.add("animate");   // show when in view
      } else {
        faqLeft.classList.remove("animate"); // hide again when out of view
      }
    });
  }, { threshold: 0.2 }); // trigger when 20% visible

  observer.observe(faqLeft);
});

//  <!-- info-section -->
    
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

// <!-- contact-section -->



  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const key = button.getAttribute("data-country");
      const data = officeData[key];

      if (data) {
        countryName.innerText = data.name;
        countryAddress.innerHTML = data.address;
        countryIcon.src = data.icon;
      }
    });
  });

  // Prev/Next navigation for countries
  const prevBtn = document.querySelector(".contact-nav .prev");
  const nextBtn = document.querySelector(".contact-nav .next");

  function getActiveIndex() {
    return Array.from(buttons).findIndex(b => b.classList.contains("active"));
  }
  function goTo(index) {
    const list = Array.from(buttons);
    const n = list.length;
    const i = (index + n) % n;
    list[i].click();
    list[i].focus();
  }
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => goTo(getActiveIndex() - 1));
    nextBtn.addEventListener("click", () => goTo(getActiveIndex() + 1));
  }

  document.addEventListener("DOMContentLoaded", () => {
  const contactLeft = document.querySelector(".contact-left");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactLeft.classList.add("animate");   // play animation
      } else {
        contactLeft.classList.remove("animate"); // reset when out of view
      }
    });
  }, { threshold: 0.2 }); // triggers when 20% visible

  observer.observe(contactLeft);
});

  const officeData = {
    uae: {
      name: "UNITED ARAB EMIRATES",
      address: `One Central, The Offices 3, Level 3,<br>
                DWTC, Sheikh Zayed Road, Dubai,<br>
                United Arab Emirates<br>
                <strong>+971507821690</strong>`,
      icon: "img/icon.webp"
    },
    usa: {
      name: "UNITED STATES",
      address: `500 Tech Street, Silicon Valley,<br>
                California, USA<br>
                <strong>+1 415 123 4567</strong>`,
      icon: "img/usa-icon.webp"
    },
    uk: {
      name: "UNITED KINGDOM",
      address: `TechHub, Level 5,<br>
                Canary Wharf, London, UK<br>
                <strong>+44 20 7946 0958</strong>`,
      icon: "img/uk-icon.webp"
    },
    india: {
      name: "INDIA",
      address: `#12, Startup Lane,<br>
                Koramangala, Bengaluru, India<br>
                <strong>+91 9876543210</strong>`,
      icon: "img/india-icon.webp"
    }
  };

  const buttons = document.querySelectorAll(".country");
  const countryName = document.getElementById("country-name");
  const countryAddress = document.getElementById("country-address");
  const countryIcon = document.getElementById("country-icon");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const key = button.getAttribute("data-country");
      const data = officeData[key];

      if (data) {
        countryName.innerText = data.name;
        countryAddress.innerHTML = data.address;
        countryIcon.src = data.icon;
      }
    });
  });  


// <!-- contact-section right-side 

  document.addEventListener("DOMContentLoaded", () => {
  const contactRight = document.querySelector(".contact-right");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactRight.classList.add("show");   // fade in down
      } else {
        contactRight.classList.remove("show"); // reset when out of view
      }
    });
  }, { threshold: 0.2 }); // triggers when 20% visible

  observer.observe(contactRight);
});

