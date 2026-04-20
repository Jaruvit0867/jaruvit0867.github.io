document.documentElement.classList.add("js-ready");

const revealItems = document.querySelectorAll("[data-reveal]");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
      if (!link) {
        return;
      }

      if (entry.isIntersecting) {
        navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
