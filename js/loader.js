/**
 * Partial loader — fetches each section HTML and injects it into the page,
 * then initialises the app scripts in order.
 */

const PARTIALS = [
    { id: 'partial-nav',          src: 'partials/nav.html' },
    { id: 'partial-hero',         src: 'partials/hero.html' },
    { id: 'partial-about',        src: 'partials/about.html' },
    { id: 'partial-expertise',    src: 'partials/expertise.html' },
    { id: 'partial-projects',     src: 'partials/projects.html' },
    { id: 'partial-web-projects', src: 'partials/web-projects.html' },
    { id: 'partial-certificates', src: 'partials/certificates.html' },
    { id: 'partial-experience',   src: 'partials/experience.html' },
    { id: 'partial-contact',      src: 'partials/contact.html' },
    { id: 'partial-footer',       src: 'partials/footer.html' },
];

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error('Failed to load script: ' + src));
        document.body.appendChild(s);
    });
}

async function loadPartials() {
    await Promise.all(PARTIALS.map(async ({ id, src }) => {
        const placeholder = document.getElementById(id);
        if (!placeholder) return;
        try {
            const res = await fetch(src);
            if (!res.ok) throw new Error(`${res.status} fetching ${src}`);
            const html = await res.text();
            placeholder.insertAdjacentHTML('beforebegin', html);
            placeholder.remove();
        } catch (err) {
            console.error('[loader]', err);
        }
    }));
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadPartials();

    // Load EmailJS SDK first, then initialise contact + main scripts
    await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
    await loadScript('js/contact.js');
    await loadScript('js/scripts.js');
});
