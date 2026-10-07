/* =========================================================
   POOJA CHOUDHARY — PORTFOLIO JAVASCRIPT
   Simple, beginner-friendly and mobile-friendly
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     1. MOBILE NAVIGATION
     ========================= */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    function closeMenu() {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    }

    menuToggle.addEventListener("click", toggleMenu);

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", function (event) {
      const clickedInsideMenu =
        navLinks.contains(event.target) ||
        menuToggle.contains(event.target);

      if (!clickedInsideMenu) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }

  /* =========================
     2. CURRENT YEAR
     ========================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =========================
     3. ACTIVE NAVIGATION
     ========================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navItems = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if (sections.length && navItems.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");

            navItems.forEach(function (link) {
              const linkTarget = link.getAttribute("href");

              if (linkTarget === "#" + currentId) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
              } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* =========================
     4. SIMPLE SCROLL REVEAL
     ========================= */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(
      ".section-heading, .glass-card, .detail-card, " +
      ".education-card, .interest-card, .strength-card, " +
      ".goals-card, .contact-wrapper"
    );

    const revealStyle = document.createElement("style");

    revealStyle.textContent = `
      .js-reveal {
        opacity: 0;
        transform: translateY(20px);
        transition:
          opacity 500ms ease,
          transform 500ms ease;
      }

      .js-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .nav-links a.active {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.09);
      }

      @media (min-width: 768px) {
        .nav-links a.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.09);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .js-reveal {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;

    document.head.appendChild(revealStyle);

    revealElements.forEach(function (element) {
      element.classList.add("js-reveal");
    });

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.08
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  /* =========================
     5. BACK TO TOP
     ========================= */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", function (event) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  /* =========================
     6. HERO "KNOW MORE" BUTTON
     ========================= */

  const knowMoreButton = document.querySelector(
    'a[href="#about"]'
  );

  if (knowMoreButton) {
    knowMoreButton.addEventListener("click", function () {
      // The browser's normal anchor behavior handles the scroll.
    });
  }
});
