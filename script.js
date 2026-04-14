// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // CURSOR
  // ========================
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animateCursor() {
      cursor.style.left = mx - 4 + 'px';
      cursor.style.top = my - 4 + 'px';

      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      ring.style.left = rx - 16 + 'px';
      ring.style.top = ry - 16 + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  // ========================
  // NAV SCROLL
  // ========================
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  // ========================
  // REVEAL (CORRIGIDO)
  // ========================
  const elements = document.querySelectorAll('.reveal, .timeline-item');

  // fallback caso browser não suporte
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));

});
