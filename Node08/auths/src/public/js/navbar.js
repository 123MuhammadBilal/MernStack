
var navbar = document.querySelector('.navbar');
var scrollOffset = navbar.offsetTop + navbar.offsetHeight; /* offset from top of page */

window.addEventListener('scroll', function() {
if (window.pageYOffset > scrollOffset) {
navbar.classList.add('scrolled');
} else {
navbar.classList.remove('scrolled');
}
})