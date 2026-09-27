// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.textContent = navLinks.classList.contains("active") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// Dark / light mode
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeToggle.textContent = isLight ? "☀" : "☾";
  localStorage.setItem(
    "portfolio-theme",
    isLight ? "light" : "dark"
  );
});

// My Works — tab filtering
const worksTabs = document.querySelectorAll(".works-tab");
const workItems = document.querySelectorAll(".work-item");
const worksGrid = document.querySelector(".works-grid");

function filterWorks(category) {
  workItems.forEach(item => {
    item.classList.toggle("show", item.dataset.category === category);
  });
  if (worksGrid) worksGrid.scrollLeft = 0;
}

worksTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    worksTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    filterWorks(tab.dataset.filter);
  });
});

// Show the first tab's category by default
if (worksTabs.length) {
  filterWorks(worksTabs[0].dataset.filter);
}

// Arrow buttons to scroll the gallery left/right
const worksPrev = document.getElementById("worksPrev");
const worksNext = document.getElementById("worksNext");

if (worksGrid && worksPrev && worksNext) {
  const scrollByAmount = () => Math.round(worksGrid.clientWidth * 0.7);

  worksPrev.addEventListener("click", () => {
    worksGrid.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
  });

  worksNext.addEventListener("click", () => {
    worksGrid.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  });
}

// Let a plain mouse wheel scroll the gallery left/right.
// Trackpads already scroll it natively via horizontal swipes, so we only
// step in when the input is vertical-only (a normal mouse wheel).
if (worksGrid) {
  worksGrid.addEventListener("wheel", (e) => {
    // Trackpad horizontal swipe — let the browser handle it natively.
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    if (e.deltaY === 0) return;

    e.preventDefault();

    // Some browsers/mice report "lines" instead of pixels — normalize it.
    const step = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    worksGrid.scrollLeft += step;
  }, { passive: false });
}

// Lightbox — click an image to open it full size
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".work-item img").forEach(img => {
  img.addEventListener("click", () => openLightbox(img));
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Scroll reveal animations (fade-up for general sections, slide-in from left for work items)
const revealElements = document.querySelectorAll(".reveal, .reveal-left");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => observer.observe(element));

// Smooth anchor scrolling with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    const offset = 75;
    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});
