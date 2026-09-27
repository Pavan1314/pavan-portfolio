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

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

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
