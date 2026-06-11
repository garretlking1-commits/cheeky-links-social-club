/* =========================================================
   THE BACK NINE GREENS CLUB — interactions
   Plain vanilla JS, no dependencies.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- 1. AGE GATE ----------
     Returning verified members already had `age-ok` added in the
     <head> (no flash). Here we wire the buttons for new visitors. */
  var gate = document.getElementById('age-gate');
  var enterBtn = document.getElementById('gate-enter');
  var exitBtn = document.getElementById('gate-exit');

  if (enterBtn) {
    enterBtn.addEventListener('click', function () {
      try { localStorage.setItem('b9_age_verified', 'true'); } catch (e) {}
      root.classList.add('age-ok');               // hides gate + unlocks scroll (CSS)
      revealInView();                              // kick the on-load cascade
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', function () {
      // Politely turn them away — gate stays locked.
      var inner = gate.querySelector('.gate-inner');
      inner.innerHTML =
        '<p class="gate-eyebrow">The Back Nine Greens Club</p>' +
        '<h1 class="gate-title">Come back when you’re 21.</h1>' +
        '<p class="gate-copy">You must be of legal age to enter the Club. ' +
        'We’ll keep a seat at the clubhouse for you.</p>';
    });
  }

  /* ---------- 2. NAV: solid background on scroll ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. MOBILE MENU ---------- */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    function setMenu(open) {
      toggle.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    // close the menu after tapping any link inside it
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }

  /* ---------- 4. REVEAL ON SCROLL (orchestrated) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  function revealInView() {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    revealInView(); // no IO support — just show everything
  }

  /* ---------- 5. MEMBERSHIP FORM ---------- */
  var form = document.getElementById('member-form');
  var status = document.getElementById('member-status');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('member-email');
      var value = input.value.trim();

      if (!EMAIL_RE.test(value)) {
        status.textContent = 'Please enter a valid email so we can reach you.';
        status.style.color = '#e7b98c';
        input.focus();
        return;
      }
      // NOTE: front-end only. Wire this to your email/SMS provider
      // (Mailchimp, Klaviyo, Resend, etc.) before launch — see README.
      status.textContent = 'Welcome to the Club. Watch your inbox for the next drop.';
      status.style.color = '#e7cd8c';
      form.reset();
    });
  }

  /* ---------- 6. FOOTER YEAR ---------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
