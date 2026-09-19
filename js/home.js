(function () {
  const nav = document.querySelector('.nav');
  const menu = document.getElementById('nav-menu');
  if (!nav) return;

  function closeMenu() {
    if (menu && menu.checked) menu.checked = false;
  }

  const navLinks = Array.from(
    document.querySelectorAll('.navLink[href^="#"], .navSheetLink[href^="#"]')
  );
  const spySections = ['work', 'about', 'resume']
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setCurrent(id) {
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-current', href === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && spySections.length) {
    const visible = new Map();
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target.id, entry.intersectionRatio);
        });
        let current = '';
        let best = 0;
        visible.forEach(function (ratio, id) {
          if (ratio > best) {
            best = ratio;
            current = id;
          }
        });
        setCurrent(best > 0.08 ? current : '');
      },
      { threshold: [0.08, 0.25, 0.5, 0.75], rootMargin: '-18% 0px -45% 0px' }
    );
    spySections.forEach(function (section) {
      observer.observe(section);
    });
  }

  document.querySelectorAll('.navSheetLink').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const belt = document.querySelector('.imageBelt');
  if (!belt) return;
  const tracks = Array.from(belt.querySelectorAll('.imageBeltTrack'));
  if (tracks.length === 0) return;

  let target = 1;
  let current = 1;
  let frame = 0;

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

  belt.addEventListener('pointerenter', function () {
    go(0.12);
  });
  belt.addEventListener('pointerleave', function () {
    go(1);
  });
})();
