// js/main.js — page behavior: theme toggle, mobile menu, sticky nav, animations.
// You usually don't need to edit this file. Read it to learn how it works!
const root = document.documentElement;
// ---------- 1. Dark / light mode ----------
// The <head> script already picked a theme (saved choice OR the system setting).
const themeToggle = document.getElementById("theme-toggle");
function setTheme(theme) {
root.dataset.theme = theme;
themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}
setTheme(root.dataset.theme || "light");
themeToggle.addEventListener("click", function () {
const next = root.dataset.theme === "dark" ? "light" : "dark";
setTheme(next);
localStorage.setItem("theme", next); // remember the visitor's choice
});
// If the visitor never clicked the toggle, follow the system setting live
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
if (!localStorage.getItem("theme")) {
setTheme(event.matches ? "dark" : "light");
}
});

// ---------- 3. Navbar shadow when scrolling ----------
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
navbar.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });
// ---------- 4. Highlight the nav link of the section on screen ----------
const sections = document.querySelectorAll("main section[id]");
const linkFor = {};
navLinks.querySelectorAll("a").forEach(function (a) {
linkFor[a.getAttribute("href").slice(1)] = a;
});
const sectionObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return;
Object.values(linkFor).forEach(function (l) { l.classList.remove("active"); });
const link = linkFor[entry.target.id]; // the hero has no link, so nothing is highlighted there
if (link) link.classList.add("active");
});
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(function (s) { sectionObserver.observe(s); });
// ---------- 5. Fade-in animation when elements scroll into view ----------
const revealObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
revealObserver.unobserve(entry.target); // animate only once
}
});
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });
// ---------- 6. Current year in the footer ----------
document.getElementById("year").textContent = new Date().getFullYear();

// Contact styles are injected here because this file is JavaScript.
const contactStyles = document.createElement("style");
contactStyles.textContent = `
.contact-card {
	text-align: center; padding: 3rem 1.5rem; border-radius: 24px; color: #fff;
	background: var(--gradient); box-shadow: 0 20px 50px rgba(99, 102, 241, 0.35);
}
.contact-card p { opacity: 0.92; }
.contact-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8rem; margin-top: 1.5rem; }
.contact-card .btn-primary { background: #fff; color: #4338ca; box-shadow: none; }
.contact-card .btn-ghost { color: #fff; border-color: rgba(255, 255, 255, 0.6); }
.contact-card .btn-ghost:hover { color: #fff; border-color: #fff; }

[data-theme="dark"] {
--accent: #818cf8;
--accent-2: #f472b6;
--accent-3: #22d3ee;
--bg: #0b1020;
--bg-alt: #111833;
--surface: #151c34;
--text: #e2e8f0;
--muted: #94a3b8;
--border: #263154;
--shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
--nav-bg: rgba(11, 16, 32, 0.75);
--chip-bg: #1e2748;
--chip-text: #c7d2fe;
--bot-bubble: #1e2748;
--glow-1: rgba(129, 140, 248, 0.32);
--glow-2: rgba(244, 114, 182, 0.20);
}
`;
document.head.appendChild(contactStyles);