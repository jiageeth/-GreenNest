let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-3');

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-xmark');
    menu.classList.toggle('fa-bars');
    navbar.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    menu.classList.remove('fa-xmark');
    menu.classList.add('fa-bars');
    navbar.classList.remove('active');

    if (window.scrollY > 250) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});

