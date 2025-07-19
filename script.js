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
      t && (t.style.display = "inline");
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
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy-btn").forEach(function (e) {
    e.addEventListener("click", function () {
      const t = e.nextElementSibling;
      if (t && "computercode" === t.tagName.toLowerCase()) {
        const e = t.innerHTML
          .replace(/<br>/g, "\n")
          .replace(/&nbsp;/g, " ")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
        navigator.clipboard.writeText(e);
      }
    });
  });
}),
  document.addEventListener("DOMContentLoaded", () => {
    const typeElements = document.querySelectorAll(".kmau-main-box-h3");

    const runTypewriterEffect = (element) => {
      const fullText = element.dataset.text || element.textContent.trim();
      element.innerHTML = "";
      element.classList.add("animated");

      const typedSpan = document.createElement("span");
      typedSpan.className = "typed-text";
      typedSpan.style.display = "inline";
      typedSpan.style.whiteSpace = "pre";

      const cursorSpan = document.createElement("span");
      cursorSpan.className = "cursor";
      cursorSpan.textContent = "|";
      cursorSpan.style.display = "inline-block";
      cursorSpan.style.marginLeft = "2px";
      cursorSpan.style.opacity = "1";

      element.appendChild(typedSpan);
      element.appendChild(cursorSpan);

      let index = 0;
      const type = () => {
        if (index <= fullText.length) {
          typedSpan.textContent = fullText.slice(0, index);
          index++;
          setTimeout(type, 120);
        } else {
          cursorSpan.remove();
        }
      };

      type();
    };

    const tryAnimate = (el) => {
      if (!el.dataset.typed) {
        el.dataset.typed = "true";
        el.dataset.text = el.textContent.trim();
        runTypewriterEffect(el);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryAnimate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -20% 0px" }
    );

    typeElements.forEach((el) => {
      el.style.visibility = "visible";
      el.style.scrollMarginTop = "10vh";
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        tryAnimate(el);
      } else {
        observer.observe(el);
      }
    });

    // Prevent scroll block on load
    window.requestAnimationFrame(() => {
      document.body.style.overflowY = "auto";
    });
  });
