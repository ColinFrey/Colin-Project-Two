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
// --- POP UP CODE WITH DELAY & SCROLL LOCK ---

const modal = document.getElementById('newsletter-modal');
const closeModal = document.getElementById('close-modal');
const modalForm = document.getElementById('modal-form');

const showModal = () => {
  if (modal) {
    modal.classList.remove('modal-hidden');
    document.body.classList.add('no-scroll');
  }
};

const hideModal = () => {
  if (modal) {
    modal.classList.add('modal-hidden');
    document.body.classList.remove('no-scroll');
  }
};

window.addEventListener('load', () => {
  setTimeout(showModal, 1500); 
});

if (closeModal) {
  closeModal.addEventListener('click', hideModal);
}

if (modalForm) {
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    alert("Thanks for signing up for Daily Ink!");
    hideModal();
  });
}

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    hideModal();
  }
});