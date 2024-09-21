const navHamburger = document.getElementById('nav-hamburger');
const navMobile = document.getElementById('nav-mobile');

navHamburger.addEventListener('click', () => {
    navMobile.classList.toggle('active');
});