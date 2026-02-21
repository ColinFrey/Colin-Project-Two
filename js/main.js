// --- STICKY NAVIGATION & HAMBURGER MENU ---
const stickyNav = document.getElementById('sticky-nav-container');
const hamburgerBtn = document.getElementById('hamburger-btn');
const stickyMenu = document.getElementById('sticky-menu');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroMidPoint = heroSection.offsetTop + (heroSection.offsetHeight / 2);
    if (window.scrollY > heroMidPoint) {
        stickyNav.classList.remove('hidden');
    } else {
        stickyNav.classList.add('hidden');
        stickyMenu.classList.remove('open');
    }
});

hamburgerBtn.addEventListener('click', () => {
    stickyMenu.classList.toggle('open');
});

const newsletterModal = document.getElementById('newsletter-modal');
const submissionModal = document.getElementById('submission-modal');

const closeNewsletter = document.getElementById('close-modal');
const closeSubmission = document.getElementById('close-submission');

const applyBtn = document.querySelector('.btn-submit'); 
const artistForm = document.getElementById('artist-form');
const newsletterForm = document.getElementById('modal-form');

const openModal = (modal) => {
    if (modal) {
        modal.classList.remove('modal-hidden');
        document.body.classList.add('no-scroll');
    }
};

const closeModal = (modal) => {
    if (modal) {
        modal.classList.add('modal-hidden');
        document.body.classList.remove('no-scroll');
    }
};

window.addEventListener('load', () => {
    setTimeout(() => openModal(newsletterModal), 1500);
});

if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        openModal(submissionModal);
    });
}

if (closeNewsletter) closeNewsletter.addEventListener('click', () => closeModal(newsletterModal));
if (closeSubmission) closeSubmission.addEventListener('click', () => closeModal(submissionModal));

window.addEventListener('click', (e) => {
    if (e.target === newsletterModal) closeModal(newsletterModal);
    if (e.target === submissionModal) closeModal(submissionModal);
});

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thanks for signing up for Daily Ink!");
        closeModal(newsletterModal);
    });
}

if (artistForm) {
    artistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Portfolio submitted! Our curators will review your story.");
        closeModal(submissionModal);
    });
}

const phoneInput = document.getElementById('phone-input');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let input = e.target.value.replace(/\D/g, ''); 
        let size = input.length;
        if (size === 0) { e.target.value = ''; return; }
        if (size < 4) { input = `(${input}`; } 
        else if (size < 7) { input = `(${input.substring(0, 3)}) ${input.substring(3, 6)}`; } 
        else { input = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6, 10)}`; }
        e.target.value = input;
    });
}
// --- FILE UPLOAD LOGIC ---
const fileInput = document.getElementById('portfolio-file');
const fileNameDisplay = document.getElementById('file-name');
const fileBtn = document.querySelector('.file-custom-btn'); // Finds the button

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            const name = e.target.files[0].name;
            fileNameDisplay.textContent = name;
            fileNameDisplay.style.color = "#ffffff";
            
            // Add the brighter white class
            fileBtn.classList.add('file-attached');
        } else {
            fileNameDisplay.textContent = "No file chosen (PDF or ZIP)";
            // Remove it if they deselect
            fileBtn.classList.remove('file-attached');
        }
    });
}
const storyCards = document.querySelectorAll('.story-card');

storyCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('is-expanded');
    });
});