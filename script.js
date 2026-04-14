// Cursor
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

// Nav scroll
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .timeline-item')
  .forEach(el => observer.observe(el));
