/* ============================================================
   TAB SWITCHING
============================================================ */
function activateTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add('active');
      panel.style.display = 'block';
    } else {
      panel.classList.remove('active');
      panel.style.display = 'none';
    }
  });
  document.querySelectorAll('.tab-link').forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.tab-link').forEach(link => {
  link.addEventListener('click', () => activateTab(link.dataset.tab));
});

/* ============================================================
   SCROLL-TRIGGERED REVEAL ANIMATIONS
============================================================ */
const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function addRevealClasses() {
  const selectors = [
    '.panel', '.deep-card', '.priority-card', '.recommend-card',
    '.step', '.hero-stat', '.mockup-card', '.offer-card-large',
    '.lander-preview', '.summary-panel', '.section-heading',
    '.hero-intro', '.audit-summary'
  ];
  document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 40, 300)}ms`;
  });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
addRevealClasses();

/* ============================================================
   SMOOTH NUMBER COUNTER FOR HERO STATS
============================================================ */
document.querySelectorAll('.hero-stat span').forEach(el => {
  const target = parseInt(el.textContent);
  if (isNaN(target)) return;
  let current = 0;
  el.textContent = '0';
  const step = () => {
    current += Math.ceil(target / 20);
    if (current >= target) { el.textContent = target; return; }
    el.textContent = current;
    requestAnimationFrame(step);
  };
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { step(); obs.unobserve(el); }
  }, { threshold: 0.5 });
  obs.observe(el);
});

/* ============================================================
   PARALLAX ORBS
============================================================ */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      document.querySelectorAll('.bg-orb').forEach((orb, i) => {
        const speed = i === 0 ? 0.03 : -0.02;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

/* ============================================================
   ACTIVE TAB INDICATOR ON SCROLL (desktop nav)
============================================================ */
const panels = document.querySelectorAll('.tab-panel');
