// No cookies, no tracking, no storage. Everything here runs only in the visitor's browser.
(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Header border once the page scrolls
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    // The button keeps its name ("Menu" / "Menü"); aria-expanded tells screen readers whether it's open,
    // and the CSS swaps the word for a close icon, so the button never changes width
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  // Mobile WhatsApp bar: hide it while the opening button or the contact details are on screen, so it never covers them
  var bar = document.getElementById("wa-bar");
  var targets = [document.getElementById("hero-cta"), document.getElementById("contact")].filter(Boolean);
  if (bar && targets.length && "IntersectionObserver" in window) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.isIntersecting ? visible.add(en.target) : visible.delete(en.target); });
      bar.classList.toggle("is-hidden", visible.size > 0);
    }, { threshold: 0.1 });
    targets.forEach(function (t) { io.observe(t); });
  } else if (bar) {
    bar.classList.remove("is-hidden");
  }

  // Language switch: land on the same section in the other language.
  // Both language versions use the same section ids, so the id can be carried over as it is.
  // [data-anchor] marks a spot inside a section worth landing on too (the questions under the prices).
  document.querySelectorAll(".lang a[hreflang]").forEach(function (link) {
    link.addEventListener("click", function () {
      var line = window.innerHeight * 0.3;
      var current = "";
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      document.querySelectorAll("main section[id], main [data-anchor][id]").forEach(function (section) {
        // At the very bottom the last section counts as current, even when it is too short to reach the line
        if (atBottom || section.getBoundingClientRect().top <= line) current = section.id;
      });
      if (current && current !== "top") link.hash = current;
    });
  });
})();
