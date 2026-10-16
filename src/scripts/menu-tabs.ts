const tabs = document.querySelectorAll<HTMLButtonElement>('[data-menu-tabs] [role="tab"]');
const cards = document.querySelectorAll<HTMLElement>('[data-menu-card]');

function applyFilter(category: string) {
  cards.forEach((card) => {
    const match = category === 'all' || card.dataset.category === category;
    card.toggleAttribute('hidden', !match);
    if (match) {
      card.classList.add('is-visible');
    }
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    applyFilter(tab.dataset.tab ?? 'all');
  });

  tab.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + dir + tabs.length) % tabs.length];
    next.focus();
    next.click();
  });
});
