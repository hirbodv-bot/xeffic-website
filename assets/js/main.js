
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll('.reveal').forEach(el => {
    if (observer) observer.observe(el);
    else el.classList.add('visible');
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const org = document.getElementById('org').value.trim();
      const topic = document.getElementById('topic').value;
      const message = document.getElementById('message').value.trim();
      const subject = encodeURIComponent(`Xeffic enquiry: ${topic}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nOrganisation: ${org}\nTopic: ${topic}\n\n${message}`
      );
      window.location.href = `mailto:hello@xeffic.com?subject=${subject}&body=${body}`;
    });
  }
});
