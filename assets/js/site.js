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
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
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
        nameField.setCustomValidity("Add your name so Priya knows who's writing.");
        nameField.reportValidity();
        nameField.addEventListener("input", function clear() { nameField.setCustomValidity(""); nameField.removeEventListener("input", clear); });
        return;
      }
      var interest = form.elements.interest.value;
      var message = form.elements.message.value.trim();
      var text = "Hi Priya, I'm " + name + ". I found Yoga Dhara online and I'm interested in " + interest + ".";
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
})();
