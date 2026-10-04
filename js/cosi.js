(function () {
  var phone = document.getElementById('cosi-proto-phone');
  if (!phone) return;

  var screens = Array.prototype.slice.call(phone.querySelectorAll('[data-proto-screen]'));
  var index = 0;

  function show(next) {
    index = (next + screens.length) % screens.length;
    screens.forEach(function (screen, i) {
      screen.hidden = i !== index;
    });
  }

  phone.addEventListener('click', function (event) {
    var go = event.target.closest('[data-proto-go]');
    if (!go) return;
    show(Number(go.getAttribute('data-proto-go')));
  });

  var back = document.getElementById('proto-back');
  var next = document.getElementById('proto-next');
  if (back) back.addEventListener('click', function () { show(index - 1); });
  if (next) next.addEventListener('click', function () { show(index + 1); });
})();
