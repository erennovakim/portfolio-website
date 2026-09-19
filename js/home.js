(function () {
  const nav = document.querySelector('.nav');
  const menu = document.getElementById('nav-menu');
  if (!nav) return;

  function closeMenu() {
    if (menu && menu.checked) menu.checked = false;
  }

  const scrolled = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.target.id !== 'home') return;
        nav.dataset.scrolled = entry.isIntersecting ? 'false' : 'true';
      });
    },
    { threshold: 0.55 }
  );

  const home = document.getElementById('home');
  if (home) scrolled.observe(home);

  const navLinks = Array.from(
    document.querySelectorAll('.navLink[href^="#"], .navSheetLink[href^="#"]')
  );
  const sectionIds = ['work', 'about', 'resume'];
  const spySections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  let spyQueued = false;

  function spy() {
    spyQueued = false;
    const probe = window.innerHeight * 0.38;
    let current = '';
    spySections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= probe) current = section.id;
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-current', href === '#' + current);
    });
  }

  function scheduleSpy() {
    if (spyQueued) return;
    spyQueued = true;
    requestAnimationFrame(spy);
  }

  spy();
  window.addEventListener('scroll', scheduleSpy, { passive: true });
  window.addEventListener('resize', scheduleSpy);

  document.querySelectorAll('.navSheetLink').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

(function () {
  const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
  if (nodes.length === 0) return;

  document.documentElement.classList.add('has-js');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach(function (node) {
      node.classList.add('is-inview');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px 12% 0px' }
  );

  nodes.forEach(function (node) {
    observer.observe(node);
  });
})();

(function () {
  const atmosphere = document.querySelector('.atmosphere');
  if (!atmosphere) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let tx = 0.5;
  let ty = 0.35;
  let x = 0.5;
  let y = 0.35;
  let frame = 0;

  function tick() {
    x += (tx - x) * 0.05;
    y += (ty - y) * 0.05;
    const hero = atmosphere.closest('.hero') || atmosphere;
    hero.style.setProperty('--px', x.toFixed(4));
    hero.style.setProperty('--py', y.toFixed(4));
    frame = requestAnimationFrame(tick);
  }

  window.addEventListener(
    'pointermove',
    function (event) {
      tx = event.clientX / window.innerWidth;
      ty = event.clientY / window.innerHeight;
    },
    { passive: true }
  );

  frame = requestAnimationFrame(tick);
  window.addEventListener('pagehide', function () {
    cancelAnimationFrame(frame);
  });
})();

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = Array.from(document.querySelectorAll('.project'));
  if (cards.length === 0) return;

  cards.forEach(function (card) {
    card.addEventListener(
      'pointermove',
      function (event) {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--ry', (px * 4).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-py * 3).toFixed(2) + 'deg');
      },
      { passive: true }
    );

    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  });
})();

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function slowOnHover(host, trackSelector, hoverRate) {
    const tracks = Array.from(host.querySelectorAll(trackSelector));
    if (tracks.length === 0) return;

    let target = 1;
    let current = 1;
    let frame = 0;
    const slowed = hoverRate == null ? 0 : hoverRate;

    function animations() {
      const list = [];
      tracks.forEach(function (track) {
        track.getAnimations().forEach(function (anim) {
          list.push(anim);
        });
      });
      return list;
    }

    function tick() {
      current += (target - current) * 0.09;
      if (Math.abs(current - target) < 0.01) current = target;
      animations().forEach(function (anim) {
        anim.playbackRate = current;
      });
      frame = current === target ? 0 : requestAnimationFrame(tick);
    }

    function go(next) {
      target = next;
      if (!frame) frame = requestAnimationFrame(tick);
    }

    host.addEventListener('pointerenter', function () {
      go(slowed);
    });
    host.addEventListener('pointerleave', function () {
      go(1);
    });
  }

  document.querySelectorAll('.imageBelt').forEach(function (belt) {
    slowOnHover(belt, '.imageBeltTrack', 0.12);
  });
  document.querySelectorAll('.aboutGallery').forEach(function (gallery) {
    slowOnHover(gallery, '.aboutColTrack', 0);
  });
})();
