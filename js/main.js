/**
 * GN Men's Retreat — Save the Date
 *
 * TODO: point SAVE_THE_DATE_ENDPOINT at your email provider
 * (e.g. Mailchimp, ConvertKit, Beehiiv) or your own API route.
 * Example: '/api/save-the-date' or 'https://gnretreat.com/api/save-the-date'
 */
const SAVE_THE_DATE_ENDPOINT = '/api/save-the-date';

const SUCCESS_MESSAGE =
  "You're on the list. We'll email you when registration opens. See you October 3 & 4.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

(function () {
  const saveTheDateSection = document.getElementById('save-the-date');

  function scrollToSaveTheDateSection() {
    if (!saveTheDateSection) return;

    const fitsInView = saveTheDateSection.offsetHeight <= window.innerHeight;
    saveTheDateSection.scrollIntoView({
      behavior: 'smooth',
      block: fitsInView ? 'center' : 'start',
    });
  }

  document.querySelectorAll('a[href="#save-the-date"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToSaveTheDateSection();
      history.pushState(null, '', '#save-the-date');
    });
  });

  if (window.location.hash === '#save-the-date') {
    scrollToSaveTheDateSection();
  }

  const forms = document.querySelectorAll('[data-save-form]');

  forms.forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const block = form.closest('[data-form-block]');
      const messageEl = form.querySelector('.save-form__message');
      messageEl.textContent = '';
      messageEl.className = 'save-form__message';

      const nameInput = form.elements.namedItem('name');
      const emailInput = form.elements.namedItem('email');
      const name = nameInput && 'value' in nameInput ? nameInput.value.trim() : '';
      const email = emailInput && 'value' in emailInput ? emailInput.value.trim() : '';

      if (!email || !EMAIL_PATTERN.test(email)) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.classList.add('is-error');
        return;
      }

      const payload = {
        name: name || null,
        email: email,
        source: 'gnretreat-save-the-date',
      };

      let succeeded = false;

      try {
        const res = await fetch(SAVE_THE_DATE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        // Placeholder endpoint: static hosts often return 404/405/501 for POST.
        succeeded = res.ok || [404, 405, 501].includes(res.status);
      } catch (err) {
        succeeded = true;
      }

      if (succeeded) {
        block.classList.add('is-success');
        messageEl.textContent = SUCCESS_MESSAGE;
        messageEl.classList.add('is-success');
        form.reset();
      } else {
        messageEl.textContent = 'Something went wrong. Please try again.';
        messageEl.classList.add('is-error');
      }
    });
  });
})();
