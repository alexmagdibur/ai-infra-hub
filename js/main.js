/* AI Infrastructure Hub — main.js
   Mobile menu toggle + active nav highlighting */

(function () {
  'use strict';

  /* ── mobile nav toggle ──────────────────────────────────── */
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.querySelector('.nav__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    /* close on link click (SPA-feel on mobile) */
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    /* close on outside click */
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── active nav link (fallback if not set server-side) ──── */
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav__menu a').forEach(function (a) {
    const href = a.getAttribute('href').replace(/\/$/, '').replace(/^\.\./, '');
    if (path.endsWith(href) && href !== '') {
      a.classList.add('is-current');
    }
  });

  /* ── smooth scroll for anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── sticky nav shadow on scroll ───────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 8
        ? '0 1px 24px rgba(0,0,0,0.4)'
        : '';
    }, { passive: true });
  }
})();
