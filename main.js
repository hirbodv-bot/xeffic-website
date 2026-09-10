
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
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('form-status');

    const setStatus = (message, state = '') => {
      if (!status) return;
      status.textContent = message || '';
      status.className = `form-status${state ? ` ${state}` : ''}`;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const endpoint = (document.body.dataset.formEndpoint || '').trim();
      if (!endpoint || !/^https:\/\/formspree\.io\/f\/[A-Za-z0-9_-]+$/i.test(endpoint)) {
        setStatus('The contact form is not connected yet. Please try again later.', 'error');
        return;
      }

      const originalText = button ? button.textContent : '';
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      setStatus('Sending your message…', 'sending');

      const data = new FormData(form);
      const topic = String(data.get('topic') || 'Website enquiry');
      data.set('_subject', `Xeffic website enquiry: ${topic}`);
      data.set('_replyto', String(data.get('email') || ''));
      data.set('source', 'xeffic.com contact form');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          form.reset();
          const success = document.body.dataset.formSuccessMessage || 'Thank you. Your message has been sent to Xeffic.';
          setStatus(success, 'success');
        } else {
          let message = document.body.dataset.formErrorMessage || 'Sorry, your message could not be sent. Please try again.';
          try {
            const result = await response.json();
            if (Array.isArray(result.errors) && result.errors.length) {
              message = result.errors.map(x => x.message).filter(Boolean).join(' ') || message;
            }
          } catch (_) {}
          setStatus(message, 'error');
        }
      } catch (_) {
        setStatus(document.body.dataset.formErrorMessage || 'Sorry, there was a connection problem. Please try again.', 'error');
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalText || 'Send message';
        }
      }
    });
  }

});
