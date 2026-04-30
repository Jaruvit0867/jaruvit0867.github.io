const THEME_KEY = "portfolio-theme";
const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const getSystemTheme = () => (systemTheme.matches ? "dark" : "light");
const getSavedTheme = () => localStorage.getItem(THEME_KEY);

function applyTheme(theme, persist = false) {
  root.dataset.theme = theme;

  if (persist) {
    localStorage.setItem(THEME_KEY, theme);
  }

  if (themeToggle) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
    themeToggle.innerHTML = `<i data-lucide="${theme === "dark" ? "sun" : "moon"}" class="icon-sm"></i>`;
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

applyTheme(getSavedTheme() || root.dataset.theme || getSystemTheme());

themeToggle?.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
});

systemTheme.addEventListener("change", (event) => {
  if (!getSavedTheme()) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll(".reveal");
        let idx = 0;
        siblings.forEach((s, j) => { if (s === entry.target) idx = j; });
        entry.target.style.transitionDelay = `${idx * 0.06}s`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

const railLinks = document.querySelectorAll(".rail-nav-link[href^='#']");
const sections = [...railLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveRail(sectionId) {
  railLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
}

if (railLinks.length && sections.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const activeEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (activeEntry) {
      setActiveRail(activeEntry.target.id);
    }
  }, { threshold: [0.22, 0.4, 0.62], rootMargin: "-18% 0px -56% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}
