const hamburger = document.querySelector(".hamburger");
function hideElements() {
  [
    "contact-us",
    "contact-link",
    "nav-login-link",
    "nav-register-link",
    "footer-buttons",
    "fqc",
    "fqc2",
  ].forEach((e) => {
    const t = document.getElementById(e);
    t && (t.style.display = "none");
  }),
    ["fkmau", "fkmau2"].forEach((e) => {
      const t = document.getElementById(e);
      t && (t.style.display = "block");
    });
}
function showPhpElements() {
  [
    "contact-us",
    "contact-link",
    "nav-login-link",
    "nav-register-link",
    "footer-buttons",
    "fqc",
    "fqc2",
  ].forEach((e) => {
    const t = document.getElementById(e);
    t && (t.style.display = "block");
  }),
    ["fkmau", "fkmau2"].forEach((e) => {
      const t = document.getElementById(e);
      t && (t.style.display = "none");
    });
}
function toggleAnswer(e) {
  const t = document.getElementById(`answer${e}`);
  t &&
    (t.style.display =
      "none" === t.style.display || "" === t.style.display ? "block" : "none");
}
window.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("contact-us");
  fetch("contact.php")
    .then((e) => e.text())
    .then((t) => {
      !t || t.length < 20 || t.includes("<?php") || t.includes("Fatal error")
        ? hideElements()
        : (e && ((e.src = "contact.php"), (e.style.display = "block")),
          showPhpElements());
    })
    .catch(() => {
      hideElements();
    });
}),
  (navMenu = document.querySelector(".nav-menu")),
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active"), navMenu.classList.toggle("active");
  }),
  window.addEventListener("DOMContentLoaded", () => {
    const e = document.getElementById("courses");
    e &&
      (e.onload = () => {
        try {
          e.contentDocument.querySelectorAll("a").forEach((e) => {
            e.setAttribute("target", "_top");
          });
        } catch (e) {
          console.warn(
            "Could not access iframe content (CORS or browser restriction)."
          );
        }
      });
  });
for (let e = 1; e <= 18; e++)
  window[`showBtnAnswer${e}`] = () => toggleAnswer(e);
window.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".kmau-main-box-h3");
  if (window.innerWidth > window.innerHeight) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.dataset.typed &&
            entry.intersectionRatio >= 0.9
          ) {
            entry.target.dataset.typed = "true";

            const el = entry.target;
            const textToType = el.textContent.trim();
            el.innerHTML = "";
            el.classList.add("animated");
            el.style.position = "relative";

            const spanText = document.createElement("span");
            const spanCursor = document.createElement("span");

            spanText.className = "typed-text";
            spanCursor.className = "cursor";

            el.appendChild(spanText);
            el.appendChild(spanCursor);

            let index = 0;

            const type = () => {
              if (index <= textToType.length) {
                spanText.textContent = textToType.slice(0, index);
                requestAnimationFrame(() => {
                  spanCursor.style.left = `${spanText.offsetWidth}px`;
                });
                index++;
                setTimeout(type, 60);
              } else {
                spanCursor.remove();
              }
            };

            type();
          }
        });
      },
      { threshold: 1.0, rootMargin: "0px 0px -20% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }
});
