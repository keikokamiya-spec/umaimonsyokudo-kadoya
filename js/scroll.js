/* ============================================================
   scroll.js — ヘッダー縮小 / ナビactive / ページトップボタン
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var header  = document.querySelector('.site-header');
    var pageTop = document.getElementById('pageTop');
    var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    var sections = Array.from(navLinks)
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    function onScroll() {
      var y = window.scrollY;

      if (header) header.classList.toggle('scrolled', y > 60);
      if (pageTop) pageTop.classList.toggle('visible', y > 400);

      var scrollY = y + 120;
      var current = '';
      sections.forEach(function (sec) {
        if (sec.offsetTop <= scrollY) current = '#' + sec.id;
      });
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    pageTop && pageTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}());
