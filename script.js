// Initialize Lucide icons
lucide.createIcons();

// Active nav highlighting based on scroll
const navLinks = document.querySelectorAll(".topbar-nav a");

// Year in footer (if exists)
const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
