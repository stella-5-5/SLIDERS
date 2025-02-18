let index = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots');
let autoSlideInterval;
let isSliding = false;
let startX = 0;
let slideWidth = window.innerWidth;

window.addEventListener('resize', () => {
    slideWidth = window.innerWidth;
    slider.style.transform = `translateX(${-index * slideWidth}px)`;
});

slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => moveToSlide(i));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function moveSlide(step) {
    if (isSliding) return;
    isSliding = true;
    
    index = (index + step + slides.length) % slides.length;
    slider.style.transform = `translateX(${-index * slideWidth}px)`;

    setTimeout(() => {
        isSliding = false;
        updateDots();
    }, 500);
}

function moveToSlide(i) {
    if (isSliding) return;
    index = i;
    slider.style.transform = `translateX(${-index * slideWidth}px)`;
    updateDots();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveSlide(1), 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) moveSlide(1);
    else if (startX < endX - 50) moveSlide(-1);
});

updateDots();
startAutoSlide();
