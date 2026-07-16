/**
 * EmailJS initialisation and contact form handler.
 */
(function () {
    'use strict';

    if (typeof emailjs === 'undefined') return;
    emailjs.init('QNyoNjMgEzvt60yOZ');

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    function t(key, fallback) {
        return window.I18N ? window.I18N.t(key) : fallback;
    }

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> ' + t('msg.sending', 'Sending…');

        const templateParams = {
            to_email: 'kelvinwai.khantphyo@gmail.com',
            name:     document.getElementById('name').value,
            email:    document.getElementById('email').value,
            subject:  document.getElementById('subject').value,
            message:  document.getElementById('message').value,
        };

        const formStatus = document.getElementById('form-status');

        emailjs.send('Yservice_071tgwi', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function () {
                formStatus.textContent = t('msg.sent', 'Your message has been sent successfully.');
                formStatus.className = 'success';
                contactForm.reset();
            })
            .catch(function () {
                formStatus.textContent = t('msg.error', 'There was an error sending your message. Please try again later.');
                formStatus.className = 'error';
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}());
