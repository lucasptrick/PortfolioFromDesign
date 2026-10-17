// Interação complementar: indica no menu a seção atualmente visível.
// Não altera o conteúdo nem a estilização original da página.
document.addEventListener('DOMContentLoaded', () => {
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      links.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-20% 0px -65% 0px' });

  sections.forEach(section => observer.observe(section));
});
