const stickyNav = document.getElementById('sticky-nav-container');
const hamburgerBtn = document.getElementById('hamburger-btn');
const stickyMenu = document.getElementById('sticky-menu');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  // This calculates the middle point of your hero section
  const heroMidPoint = heroSection.offsetTop + (heroSection.offsetHeight / 2);
  
  // Now it appears when you cross the halfway mark
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