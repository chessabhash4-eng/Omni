/* ============================================================
   OMNI OLYMPIARD — script.js
   nav · smooth scroll · scroll reveal · counters · faq · form
   (no cursor animation, respects reduced motion)
   ============================================================ */

/* Force page to load at the top on refresh */
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

  const navbar   = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const burger   = document.getElementById('hamburger');
  const progress = document.getElementById('scrollProgress');
  const links    = [...document.querySelectorAll('[data-link]')];
  const navItems = [...document.querySelectorAll('.nav-item')];
  const sections = [...document.querySelectorAll('section[id]')];

  /* ---------- current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile menu ---------- */
  const closeMenu = () => { navLinks.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded','false'); };
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });

  /* ---------- smooth scroll (tabs) ---------- */
  links.forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const top = target.getBoundingClientRect().top + window.pageYOffset - 68;
          window.scrollTo({ top, behavior: 'smooth' });
          closeMenu();
        }
      }
    });
  });

  /* ---------- navbar shadow + progress + active tab ---------- */
  const onScroll = () => {
    const y = window.pageYOffset;
    navbar.classList.toggle('scrolled', y > 12);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';

    let current = 'home';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    navItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- scroll reveal (staggered) ---------- */
  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = [...el.parentElement.querySelectorAll(':scope > .reveal')];
          const idx = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = (idx % 6) * 80 + 'ms';
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---------- animated counters ---------- */
  const counters = [...document.querySelectorAll('.stat-num')];
  const runCounter = (el) => {
    const target = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const dur = 1600;
    const start = performance.now();
    const fmt = (n) => n >= 1000 ? Math.round(n).toLocaleString('en-IN') : Math.round(n);
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * eased) + (target >= 1000 && p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(c => c.textContent = (c.dataset.prefix || '') + c.dataset.count);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- 3D Hero Card tilt effect ---------- */
  const heroCard = document.getElementById('heroCard3d');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / (rect.height / 2)) * -12;
      const rotY = (x / (rect.width / 2)) * 12;
      heroCard.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'none';
    });
  }

  /* ---------- King Founder Banner photo fallback ---------- */
  const ownerPhotoImg = document.getElementById('ownerPhotoImg');
  if (ownerPhotoImg) {
    ownerPhotoImg.addEventListener('error', () => {
      if (typeof OWNER_PHOTO_BASE64 !== 'undefined' && ownerPhotoImg.src !== OWNER_PHOTO_BASE64) {
        ownerPhotoImg.src = OWNER_PHOTO_BASE64;
      }
    });
  }

  /* ---------- King Founder Banner stable display ---------- */
  const kingBanner = document.getElementById('kingFounderBanner');
  // Kept stable without 3D tilt as requested

  /* ---------- registration form -> WhatsApp ---------- */
  const form = document.getElementById('regForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.sName.value.trim();
      const cls  = form.sClass.value;
      const sub  = form.sSubject.value;
      const phone= form.sPhone.value.trim();
      const email= form.sEmail.value.trim();

      if (!name || !cls || !sub || !phone) {
        status.textContent = 'Please fill all required fields.';
        status.className = 'form-status err';
        return;
      }
      if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, '').slice(-10))) {
        status.textContent = 'Please enter a valid 10-digit mobile number.';
        status.className = 'form-status err';
        return;
      }

      const rawMsg =
        `Hi Omni Olympiad! 👋\n` +
        `I want to register for the Olympiad (Fee: ₹249).\n\n` +
        `📋 Student Details:\n` +
        `• Name: ${name}\n` +
        `• Class: ${cls}\n` +
        `• Olympiad: ${sub}\n` +
        `• WhatsApp: ${phone}` +
        (email ? `\n• Email: ${email}` : ``) +
        `\n\nPlease confirm my registration and share payment details.`;

      status.textContent = 'Opening WhatsApp with your pre-typed registration message…';
      status.className = 'form-status ok';
      window.open(`https://wa.me/919905992881?text=${encodeURIComponent(rawMsg)}`, '_blank');
      form.reset();
    });
  }

});

