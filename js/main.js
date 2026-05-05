// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  const isOpen = burger.classList.toggle('active');
  nav.classList.toggle('open', isOpen);
  overlay.classList.toggle('visible', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu on nav link click
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) toggleMenu();
  });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== DOCTOR CARDS APPEAR ON SCROLL =====
const doctorCards = document.querySelectorAll('.doctor-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

doctorCards.forEach(card => observer.observe(card));

// ===== BOOKING FORM SUBMIT =====
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = bookingForm.querySelector('button[type="submit"]');
  btn.textContent = '✅ Заявку надіслано!';
  btn.style.background = '#2d9b6e';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Надіслати заявку';
    btn.style.background = '';
    btn.disabled = false;
    bookingForm.reset();
  }, 3000);
});

// ===== SPEC CARDS CLICK =====
document.querySelectorAll('.spec-card').forEach(card => {
  card.addEventListener('click', () => {
    const spec = card.querySelector('h3').textContent;
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
    const select = document.querySelector('.form__select');
    for (let opt of select.options) {
      if (opt.text.toLowerCase().includes(spec.toLowerCase().substring(0, 5))) {
        select.value = opt.value;
        break;
      }
    }
  });
});

// ===== SMOOTH REVEAL SECTIONS =====
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.6s ease both';
    }
  });
}, { threshold: 0.05 });

sections.forEach(s => sectionObserver.observe(s));
