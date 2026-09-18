/*
 * The mobile menu icon sits directly on the page with no chip behind it, so
 * it has to know what it is crossing: off-white over the bare photograph,
 * dark over a washed section. A fixed element cannot answer that in CSS, so
 * this sets data-behind on the nav wrapper and the stylesheet does the rest.
 *
 * In the real app this belongs with the existing scroll-spy hook rather than
 * as a standalone listener.
 */
(function () {
  const wrapper = document.querySelector('.navWrapper');
  const toggle = document.querySelector('.navToggle');
  const menu = document.getElementById('nav-menu');
  const washed = Array.from(document.querySelectorAll('.section--washed'));

  if (!wrapper || !toggle) return;

  let queued = false;

  function closeMenu() {
    if (menu && menu.checked) menu.checked = false;
  }

  const sectionIds = ['work', 'about', 'resume'];
  const navSectionLinks = Array.from(
    document.querySelectorAll('.navLink[href^="#"], .navSheetLink[href^="#"]')
  );

  function spy() {
    const probe = window.innerHeight * 0.4;
    let current = '';
    sectionIds.forEach(function (id) {
      const section = document.getElementById(id);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= probe && rect.bottom > probe) current = id;
    });
    navSectionLinks.forEach(function (link) {
      const id = link.getAttribute('href').slice(1);
      link.classList.toggle('is-current', id === current);
    });
  }

  function apply() {
    queued = false;
    wrapper.dataset.scrolled = window.scrollY > 24 ? 'true' : 'false';
    spy();

    if (washed.length === 0) return;
    const box = toggle.getBoundingClientRect();
    const midpoint = box.top + box.height / 2;
    const overWash = washed.some((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= midpoint && rect.bottom >= midpoint;
    });
    wrapper.dataset.behind = overWash ? 'overlay' : 'sky';
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  }

  apply();
  window.addEventListener(
    'scroll',
    function () {
      closeMenu();
      schedule();
    },
    { passive: true }
  );
  window.addEventListener('resize', schedule);

  document.querySelectorAll('.navSheetLink').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

(function () {
  const scatter = document.querySelector('.polaroidScatter');
  if (!scatter) return;

  const frames = Array.from(scatter.querySelectorAll('.polaroid'));

  function countForWidth(width) {
    if (width < 520) return 2;
    if (width < 720) return 3;
    if (width < 980) return 4;
    if (width < 1240) return 5;
    return 6;
  }

  function isCoarse() {
    return window.matchMedia('(hover: none), (max-width: 860px)').matches;
  }

  function layout() {
    const n = countForWidth(window.innerWidth);
    scatter.style.setProperty('--n', String(n));
    scatter.dataset.count = String(n);
    frames.forEach(function (frame, i) {
      frame.hidden = i >= n;
      if (i >= n) frame.classList.remove('is-raised');
    });
  }

  scatter.addEventListener('click', function (event) {
    if (!isCoarse()) return;
    const card = event.target.closest('.polaroid');
    if (!card || card.hidden) return;
    const wasRaised = card.classList.contains('is-raised');
    frames.forEach(function (frame) {
      frame.classList.remove('is-raised');
    });
    if (!wasRaised) card.classList.add('is-raised');
  });

  layout();
  window.addEventListener('resize', layout);
})();
