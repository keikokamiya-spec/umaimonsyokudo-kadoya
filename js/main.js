/* ============================================================
   旨いもん食堂 かどや - main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero Slideshow ---------- */
  const slides     = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicators .indicator');
  let currentSlide = 0;
  let slideTimer   = null;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (idx + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function startSlideshow() {
    slideTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }

  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      clearInterval(slideTimer);
      goToSlide(i);
      startSlideshow();
    });
  });

  if (slides.length > 0) startSlideshow();


  /* ---------- Sticky Header + Nav Active State ---------- */
  const header  = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScroll() {
    /* header shrink */
    header.classList.toggle('scrolled', window.scrollY > 60);

    /* page-top button */
    pageTop.classList.toggle('visible', window.scrollY > 400);

    /* active nav */
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => {
      if (sec && sec.offsetTop <= scrollY) current = '#' + sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---------- Hamburger / Mobile Nav ---------- */
  const hamburger = document.querySelector('.hamburger');
  const nav       = document.querySelector('.site-nav');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    nav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* close nav on link click (mobile) */
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ---------- Smooth Scroll ---------- */
  const headerHeight = () => header ? header.offsetHeight : 70;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight();
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ---------- Accordion Menu ---------- */
  document.querySelectorAll('.menu-category-title').forEach(title => {
    title.addEventListener('click', () => {
      const cat = title.closest('.menu-category');
      const wasOpen = cat.classList.contains('open');

      /* close all in same section */
      title.closest('.menu-categories')?.querySelectorAll('.menu-category').forEach(c => c.classList.remove('open'));

      /* toggle clicked */
      if (!wasOpen) cat.classList.add('open');
    });
  });

  /* Open first category in each section by default */
  document.querySelectorAll('.menu-categories').forEach(sec => {
    sec.querySelector('.menu-category')?.classList.add('open');
  });


  /* ---------- Intersection Observer (fade-in) ---------- */
  const fadeEls = document.querySelectorAll('.js-fade');
  if (fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => obs.observe(el));
  }


  /* ---------- Page Top Button ---------- */
  const pageTop = document.getElementById('pageTop');
  pageTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});
