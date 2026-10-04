(function () {
  var strips = Array.prototype.slice.call(document.querySelectorAll('.cosiStrip'));
  if (!strips.length) return;

  var names = ['Lo-fi', 'Mid-fi', 'Hi-fi'];
  var mobileQuery = window.matchMedia('(max-width: 760px)');

  function hintFor(index) {
    if (index <= 0) return 'Swipe right for Mid-fi';
    if (index === 1) return 'Swipe left for Lo-fi or swipe right for Hi-fi';
    return 'Swipe left for Mid-fi';
  }

  strips.forEach(function (strip) {
    var track = strip.querySelector('.cosiStripTrack');
    var hint = strip.querySelector('.cosiSwipeHint');
    var slides = Array.prototype.slice.call(track.children);
    var index = 0;
    var startX = 0;
    var startY = 0;
    var tracking = false;

    function render() {
      var mobile = mobileQuery.matches;
      var slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
      track.style.transform = mobile ? 'translateX(' + -index * slideWidth + 'px)' : '';
      if (hint) {
        hint.textContent = mobile ? hintFor(index) : '';
      }
      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', mobile && i !== index ? 'true' : 'false');
      });
    }

    function go(next) {
      index = Math.max(0, Math.min(slides.length - 1, next));
      render();
    }

    strip.addEventListener('pointerdown', function (event) {
      if (!mobileQuery.matches || event.button > 0) return;
      tracking = true;
      startX = event.clientX;
      startY = event.clientY;
    });

    strip.addEventListener('pointerup', function (event) {
      if (!tracking) return;
      tracking = false;
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx > 0) go(index + 1);
      else go(index - 1);
    });

    strip.addEventListener('pointercancel', function () {
      tracking = false;
    });

    strip.addEventListener('keydown', function (event) {
      if (!mobileQuery.matches) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(index - 1);
      }
    });

    mobileQuery.addEventListener('change', function () {
      if (!mobileQuery.matches) index = 0;
      render();
    });

    window.addEventListener('resize', render);

    render();
  });
})();
