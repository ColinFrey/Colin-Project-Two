document.addEventListener('DOMContentLoaded', () => {
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const searchCloses = document.querySelectorAll('.search-close');

    searchTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const wrapper = trigger.closest('.nav-wrapper');
            if (wrapper) wrapper.classList.add('search-active');
        });
    });

    searchCloses.forEach(close => {
        close.addEventListener('click', () => {
            const wrapper = close.closest('.nav-wrapper');
            if (wrapper) {
                wrapper.classList.remove('search-active');
                const input = wrapper.querySelector('input');
                if(input) input.value = '';
            }
        });
    });

    const stickyContainer = document.getElementById('sticky-nav-container');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const stickyMenu = document.getElementById('sticky-menu');
    const heroSection = document.querySelector('.hero');

    if (stickyContainer) {
        window.addEventListener('scroll', () => {
            const heroMidPoint = heroSection.offsetTop + (heroSection.offsetHeight / 2);
            if (window.scrollY > heroMidPoint) {
                stickyContainer.classList.remove('hidden');
            } else {
                stickyContainer.classList.add('hidden');
                stickyMenu.classList.remove('open'); 
            }
        });
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            stickyMenu.classList.toggle('open');
        });
    }

    const newsletterModal = document.getElementById('newsletter-modal');
    const submissionModal = document.getElementById('submission-modal');
    const closeNewsletter = document.getElementById('close-modal');
    const closeSubmission = document.getElementById('close-submission');
    const applyBtn = document.querySelector('.btn-submit');

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

    setTimeout(() => openModal(newsletterModal), 2000);

    if (applyBtn) {
        applyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(submissionModal);
        });
    }

    if (closeNewsletter) closeNewsletter.addEventListener('click', () => closeModal(newsletterModal));
    if (closeSubmission) closeSubmission.addEventListener('click', () => closeModal(submissionModal));

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(newsletterModal);
            closeModal(submissionModal);
        }
    });

const phoneInputs = document.querySelectorAll('#phone-input, .phone-input-field');

phoneInputs.forEach(inputEl => {
    inputEl.addEventListener('input', (e) => {
        let input = e.target.value.replace(/\D/g, ''); 
        let size = input.length;
        if (size === 0) { e.target.value = ''; return; }
        
        if (size < 4) { 
            input = `(${input}`; 
        } else if (size < 7) { 
            input = `(${input.substring(0, 3)}) ${input.substring(3, 6)}`; 
        } else { 
            input = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6, 10)}`; 
        }
        
        e.target.value = input;
    });
});

    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-expanded');
        });
    });

    window.handleSearch = function(event, inputId) {
        event.preventDefault();
        const inputField = document.getElementById(inputId);
        const searchTerm = inputField.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.story-card');
        let found = false;

        if (searchTerm === "") return;

        cards.forEach(card => {
            const artistName = card.querySelector('h3').textContent.toLowerCase();
            const specs = card.querySelector('.specs').textContent.toLowerCase();

            if (artistName.includes(searchTerm) || specs.includes(searchTerm)) {
        
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                
                card.style.outline = "2px solid #d2eaa7";
                card.style.outlineOffset = "4px";
                setTimeout(() => { card.style.outline = "none"; }, 3000);
                found = true;
            }
        });

        if (!found) {
            alert("No artists or materials matching '" + searchTerm + "' found.");
        }

        const wrapper = inputField.closest('.nav-wrapper');
        if (wrapper) {
            wrapper.classList.remove('search-active');
            inputField.value = '';
        }
    };
});