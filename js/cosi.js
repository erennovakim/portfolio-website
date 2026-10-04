(function () {
  var strips = Array.prototype.slice.call(document.querySelectorAll('.cosiStrip'));
  if (!strips.length) return;

  var names = ['Lo-fi', 'Mid-fi', 'Hi-fi'];
  var mobileQuery = window.matchMedia('(max-width: 760px)');

  strips.forEach(function (strip) {
    var track = strip.querySelector('.cosiStripTrack');
    var slides = Array.prototype.slice.call(track.children);
    var index = 0;
    var startX = 0;
    var startY = 0;
    var tracking = false;

    var stage = document.createElement('div');
    stage.className = 'cosiStripStage';
    strip.insertBefore(stage, track);
    stage.appendChild(track);

    function arrow(direction) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'cosiStripArrow cosiStripArrow--' + direction;
      button.innerHTML = '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="' + (direction === 'prev'
        ? 'M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z'
        : 'M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,0,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z') + '"/></svg>';
      stage.appendChild(button);
      return button;
    }

    var prev = arrow('prev');
    var next = arrow('next');

    function render() {
      var mobile = mobileQuery.matches;
      var slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
      track.style.transform = mobile ? 'translateX(' + -index * slideWidth + 'px)' : '';
      prev.disabled = index === 0;
      next.disabled = index === slides.length - 1;
      prev.setAttribute('aria-label', index > 0 ? 'Show ' + names[index - 1] : 'Previous version');
      next.setAttribute('aria-label', index < slides.length - 1 ? 'Show ' + names[index + 1] : 'Next version');
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
      if (event.target.closest('.cosiStripArrow')) return;
      tracking = true;
      startX = event.clientX;
      startY = event.clientY;
      if (strip.setPointerCapture) strip.setPointerCapture(event.pointerId);
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

    prev.addEventListener('click', function () { go(index - 1); });
    next.addEventListener('click', function () { go(index + 1); });

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
