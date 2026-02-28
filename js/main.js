document.addEventListener('DOMContentLoaded', () => {
    
    // --- UTILITIES & VALIDATION ---
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
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            alert("please enter a valid email");
            return false;
        }
        return true;
    };

    // --- SEARCH LOGIC ---
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

    // --- STICKY NAV LOGIC ---
    const stickyContainer = document.getElementById('sticky-nav-container');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const stickyMenu = document.getElementById('sticky-menu');
    const heroSection = document.querySelector('.hero');

    if (stickyContainer && heroSection) {
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

    // --- MODAL & FORM LOGIC ---
    const newsletterModal = document.getElementById('newsletter-modal');
    const submissionModal = document.getElementById('submission-modal');
    const successModal = document.getElementById('success-modal');
    const successNewsletterContent = document.getElementById('success-newsletter-content');
    const successSubmissionContent = document.getElementById('success-submission-content');

    const showSuccess = (type) => {
        closeModal(newsletterModal);
        closeModal(submissionModal);

        if (type === 'newsletter') {
            successNewsletterContent.style.display = 'block';
            successSubmissionContent.style.display = 'none';
        } else {
            successNewsletterContent.style.display = 'none';
            successSubmissionContent.style.display = 'block';
        }
        openModal(successModal);
    };

    // Auto-open newsletter modal after 2 seconds
    setTimeout(() => openModal(newsletterModal), 2000);

    // --- FORM SUBMISSIONS ---
    const newsletterForms = document.querySelectorAll('#modal-form, .banner-form, .signup-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            
            if (validateEmail(emailInput.value)) {
                showSuccess('newsletter');
                form.reset();
            }
        });
    });

    const artistForm = document.getElementById('artist-form');
    if (artistForm) {
        artistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('artist-email');
            
            if (validateEmail(emailInput.value)) {
                showSuccess('submission');
                artistForm.reset();
                const fileNameDisplay = document.getElementById('file-name');
                if(fileNameDisplay) {
                    fileNameDisplay.innerText = "No file chosen (PDF or ZIP)";
                    fileNameDisplay.previousElementSibling.classList.remove('file-attached');
                }
            }
        });
    }

    // --- REAPPEARING SCROLL INDICATOR LOGIC ---
    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
    const scrollHint = document.getElementById('archive-scroll-hint');

    if (scrollWrapper && scrollHint) {
        scrollWrapper.addEventListener('scroll', () => {
            // Toggles visibility based on scroll position
            // Shows arrow only when the user is at the far left
            if (scrollWrapper.scrollLeft > 25) {
                scrollHint.classList.add('is-hidden');
            } else {
                scrollHint.classList.remove('is-hidden');
            }
        }, { passive: true });
    }

    // --- BUTTON EVENT LISTENERS ---
    document.getElementById('close-modal')?.addEventListener('click', () => closeModal(newsletterModal));
    document.getElementById('close-submission')?.addEventListener('click', () => closeModal(submissionModal));
    document.getElementById('close-success')?.addEventListener('click', () => closeModal(successModal));
    document.getElementById('success-confirm-btn')?.addEventListener('click', () => closeModal(successModal));

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(newsletterModal);
            closeModal(submissionModal);
            closeModal(successModal);
        }
    });

    const applyBtn = document.querySelector('.btn-submit');
    if (applyBtn && !applyBtn.closest('#success-modal')) {
        applyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(submissionModal);
        });
    }

    // --- FILE UPLOAD FEEDBACK ---
    const fileInput = document.getElementById('portfolio-file');
    const fileNameDisplay = document.getElementById('file-name');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                fileNameDisplay.innerText = this.files[0].name;
                fileNameDisplay.previousElementSibling.classList.add('file-attached');
            }
        });
    }

    // --- PHONE MASKING ---
    const phoneInputs = document.querySelectorAll('#phone-input, .phone-input-field, #footer-phone');
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

    // --- UI INTERACTIVE ELEMENTS ---
    document.querySelectorAll('.story-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('is-expanded'));
    });

    document.querySelectorAll('.tip-box').forEach(box => {
        box.addEventListener('click', () => box.classList.toggle('is-expanded'));
    });

    // --- SEARCH HANDLER ---
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
// --- SMS TOGGLE LOGIC ---
    const footerPhone = document.getElementById('footer-phone');
    const smsCheck = document.getElementById('sms-check-footer');

    if (footerPhone && smsCheck) {
        smsCheck.addEventListener('change', () => {
            if (smsCheck.checked) {
                footerPhone.required = true;
                footerPhone.placeholder = "Phone Required *";
            } else {
                footerPhone.required = false;
                footerPhone.placeholder = "Phone (Optional)";
            }
        });
    }
});