const navHamburger = document.getElementById('nav-hamburger');
const navMobile = document.getElementById('nav-mobile');
const navClose = document.getElementById('nav-close');

navHamburger.addEventListener('click', () => {
    navMobile.classList.toggle('active');

    if (navMobile.classList.contains('active')) {
        navMobile.classList.remove('hidden');
    } else {
        navMobile.classList.add('hidden');
    }
});

navClose.addEventListener('click', () => {
    navMobile.classList.add('hidden');

    if (navMobile.classList.contains('hidden')) {
        navMobile.classList.remove('active');
    } else {
        navMobile.classList.add('active');
    }
});