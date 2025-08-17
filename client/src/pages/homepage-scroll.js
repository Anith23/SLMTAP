// homepage-scroll.js

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});
