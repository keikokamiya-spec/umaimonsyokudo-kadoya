/* ============================================================
   main.js — ハンバーガーナビ / スムーズスクロール / アコーディオン
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var header    = document.querySelector('.site-header');
    var hamburger = document.querySelector('.hamburger');
    var nav       = document.querySelector('.site-nav');


    /* ---------- Hamburger / Mobile Nav ---------- */
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        var isOpen = hamburger.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        if (nav) nav.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
    }

    if (nav) {
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          if (hamburger) {
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
          }
          nav.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }


    /* ---------- Smooth Scroll ---------- */
    function headerHeight() {
      return header ? header.offsetHeight : 70;
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight();
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });


    /* ---------- Accordion Menu ---------- */
    document.querySelectorAll('.menu-category-title').forEach(function (title) {
      title.addEventListener('click', function () {
        var cat = title.closest('.menu-category');
        if (!cat) return;
        var wasOpen = cat.classList.contains('open');

        var group = title.closest('.menu-categories');
        if (group) {
          group.querySelectorAll('.menu-category').forEach(function (c) {
            c.classList.remove('open');
          });
        }

        if (!wasOpen) cat.classList.add('open');
      });
    });

    /* 各セクションの最初のカテゴリをデフォルトで開く */
    document.querySelectorAll('.menu-categories').forEach(function (sec) {
      var first = sec.querySelector('.menu-category');
      if (first) first.classList.add('open');
    });

  });
}());
