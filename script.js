function activateTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === tabId);
  });

  document.querySelectorAll('.tab-link').forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.tab-link').forEach(link => {
  link.addEventListener('click', () => activateTab(link.dataset.tab));
});

document.querySelectorAll('.panel, .deep-card, .priority-card, .recommend-card, .step, .hero-stat').forEach((card, i) => {
  card.style.animationDelay = `${i * 30}ms`;
  card.classList.add('fade-in');
});
