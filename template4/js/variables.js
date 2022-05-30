// //////////////////////////////////// //
// //////////////////////////////////// //
// //////////Carousel Slider/////////// //
// //////////////////////////////////// //
// //////////////////////////////////// //

////// mouse move //////
////// mouse move //////
let carousel = document.querySelector('#carousel');
let slider = document.querySelector('#carousel #slider');
let firstSlide = slider.firstElementChild;
let slides = document.querySelectorAll('#carousel .slide');
let currSlideNo = 1;
let totalMainSlides = 3;
let originalTransition = window.getComputedStyle(slider).transition;

let body = document.getElementsByTagName('body');
// let mouseX = 0;
let mouseY = 0;
let pressed = false;

let moving = false;
let preventSliding = false;

let slideHaveMovedX = 0;
let sliderOldPos = parseFloat(window.getComputedStyle(slider).left);

let waiting = false;
let count = 0;
let defaultCursor = carousel.style.cursor;

let currIndicator = 0;
let indicators = document.querySelectorAll('#carousel .indicator');

