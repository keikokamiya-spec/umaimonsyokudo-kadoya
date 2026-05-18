/* ============================================================
   animation.js — ヒーロースライドショー / フェードイン
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Hero Slideshow ---------- */
    var slides     = document.querySelectorAll('.hero-slide');
    var indicators = document.querySelectorAll('.hero-indicators .indicator');
    var current    = 0;
    var timer      = null;

    function goToSlide(idx) {
      if (!slides.length) return;
      slides[current] && slides[current].classList.remove('active');
      indicators[current] && indicators[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current] && slides[current].classList.add('active');
      indicators[current] && indicators[current].classList.add('active');
    }

    function startSlideshow() {
      timer = setInterval(function () { goToSlide(current + 1); }, 4500);
    }

    indicators.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        clearInterval(timer);
        goToSlide(i);
        startSlideshow();
      });
    });

    if (slides.length > 0) startSlideshow();


    /* ---------- Intersection Observer (fade-in) ---------- */
    var fadeEls = document.querySelectorAll('.js-fade');
    if (!fadeEls.length) return;

    if (!('IntersectionObserver' in window)) {
      /* フォールバック: IOが使えない場合はすべて即座に表示 */
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) { obs.observe(el); });
  });
}());
