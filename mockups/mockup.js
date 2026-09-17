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
  const washed = Array.from(document.querySelectorAll('.section--washed'));

  if (!wrapper || !toggle || washed.length === 0) return;

  let queued = false;

  function apply() {
    queued = false;
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
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
})();
