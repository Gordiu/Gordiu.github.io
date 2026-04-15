// ============================================
// CURSOR PERSONALIZADO
// ============================================

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

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

// ============================================
// NAVEGAÇÃO - SCROLL EFFECT
// ============================================

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ============================================
// REVEAL ANIMATIONS - INTERSECTION OBSERVER
// ============================================

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.reveal, .timeline-item')
  .forEach(el => observer.observe(el));

// ============================================
// SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignora links vazios ou "#"
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// EFEITOS ADICIONAIS
// ============================================

// Ocultar cursor padrão do navegador
document.addEventListener('mouseenter', () => {
  document.body.style.cursor = 'none';
});

document.addEventListener('mouseleave', () => {
  document.body.style.cursor = 'auto';
});

// Efeito de hover em botões
document.querySelectorAll('.btn-primary, .btn-secondary, .project-card, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    ring.style.transform = 'scale(1.2)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform = 'scale(1)';
  });
});

// ============================================
// LAZY LOADING PARA IMAGENS (se houver)
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// ANALYTICS SIMPLES (OPCIONAL)
// ============================================

// Rastrear seções visualizadas
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(`Seção visualizada: ${entry.target.id}`);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});

// ============================================
// INICIALIZAÇÃO
// ============================================

console.log('Portfolio de Thiago Machado carregado com sucesso! 🚀');
