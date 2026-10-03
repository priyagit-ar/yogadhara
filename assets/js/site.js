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

  // WhatsApp compose form: builds a prefilled message and opens WhatsApp. Nothing is sent to this site.
  var form = document.getElementById("compose");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameField = form.elements.name;
      var name = nameField.value.trim();
      if (!name) {
        nameField.setCustomValidity(form.dataset.nameMissing || "Add your name so Priya knows who's writing.");
        nameField.reportValidity();
        nameField.addEventListener("input", function clear() { nameField.setCustomValidity(""); nameField.removeEventListener("input", clear); });
        return;
      }
      var interest = form.elements.interest.value;
      var message = form.elements.message.value.trim();
      // The message wording comes from the page (data-template), so it matches the page's language
      var template = form.dataset.template || "Hi Priya, I'm {name}. I found Yoga Dhara online and I'm interested in {interest}.";
      var values = { name: name, interest: interest };
      var text = template.replace(/\{(name|interest)\}/g, function (_, key) { return values[key]; });
      if (message) text += "\n\n" + message;
      var url = "https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");
    });
  }

  // Mobile WhatsApp bar: hide it while another WhatsApp button is already on screen (hero buttons, contact form)
  var bar = document.getElementById("wa-bar");
  var targets = [document.getElementById("hero-actions"), document.getElementById("contact")].filter(Boolean);
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
  document.querySelectorAll(".lang a[hreflang]").forEach(function (link) {
    link.addEventListener("click", function () {
      var line = window.innerHeight * 0.3;
      var current = "";
      document.querySelectorAll("main section[id]").forEach(function (section) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      });
      if (current && current !== "top") link.hash = current;
    });
  });
})();
