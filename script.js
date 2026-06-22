const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");
const dropdownItems = document.querySelectorAll(".nav-item-dropdown");

function closeMobileNav() {
  siteNav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  dropdownItems.forEach((item) => {
    item.classList.remove("is-open");
    item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
  });
}

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

dropdownItems.forEach((item) => {
  const toggle = item.querySelector(".dropdown-toggle");

  toggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = item.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-item-dropdown")) {
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      closeMobileNav();
    }
  });
});

document.querySelectorAll(".dropdown-link").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNav();
  }
});

const sections = document.querySelectorAll("section[id]");
const isHomePage = document.querySelector("#top") !== null;

function setActiveNavLink() {
  if (!isHomePage) return;

  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href") ?? "";
        const isMatch =
          href === `#${id}` ||
          href === `index.html#${id}` ||
          (id === "top" && (href === "index.html#top" || href.endsWith("#top")));
        link.classList.toggle("is-active", isMatch);
      });
    }
  });
}

if (isHomePage) {
  window.addEventListener("scroll", setActiveNavLink, { passive: true });
  setActiveNavLink();
}

const sectionImagePairs = [
  { container: ".hero-inner", text: ".hero-content", image: ".hero-image" },
  { container: ".about-split", text: ".about-text", image: ".about-image" },
];

function syncSectionImageHeights() {
  const isStacked = window.innerWidth < 768;

  sectionImagePairs.forEach(({ container, text, image }) => {
    document.querySelectorAll(container).forEach((section) => {
      const textEl = section.querySelector(text);
      const imageEl = section.querySelector(image);
      if (!textEl || !imageEl) return;

      if (isStacked) {
        imageEl.style.height = `${textEl.offsetHeight}px`;
      } else {
        imageEl.style.height = "";
      }
    });
  });
}

window.addEventListener("load", syncSectionImageHeights);
window.addEventListener("resize", syncSectionImageHeights);

if (document.fonts?.ready) {
  document.fonts.ready.then(syncSectionImageHeights);
}

sectionImagePairs.forEach(({ container, text }) => {
  document.querySelectorAll(`${container} ${text}`).forEach((textEl) => {
    new ResizeObserver(syncSectionImageHeights).observe(textEl);
  });
});
