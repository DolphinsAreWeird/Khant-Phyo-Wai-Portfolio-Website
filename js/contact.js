/**
 * EmailJS initialisation and contact form handler.
 * Loaded after the contact partial is injected into the DOM.
 */

(function () {
    emailjs.init('QNyoNjMgEzvt60yOZ');
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const templateParams = {
            to_email: 'kelvinwai.khantphyo@gmail.com',
            name:     document.getElementById('name').value,
            email:    document.getElementById('email').value,
            subject:  document.getElementById('subject').value,
            message:  document.getElementById('message').value,
        };

        emailjs.send('Yservice_071tgwi', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function () {
                const formStatus = document.getElementById('form-status');
                formStatus.textContent = "Your message has been sent successfully. I'll get back to you soon!";
                formStatus.className = 'success';
                formStatus.style.display = 'block';
                document.getElementById('contact-form').reset();
            })
            .catch(function () {
                const formStatus = document.getElementById('form-status');
                formStatus.textContent = 'There was an error sending your message. Please try again later.';
                formStatus.className = 'error';
                formStatus.style.display = 'block';
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}
