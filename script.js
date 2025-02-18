let index = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots');
let autoSlideInterval;
let isSliding = false;
let startX = 0;
let slideWidth = window.innerWidth; // Dynamically adjust for window width

// Update slide width on window resize for responsiveness
window.addEventListener('resize', () => {
    slideWidth = window.innerWidth; // Update width when screen resizes
    slider.style.transform = `translateX(${-index * slideWidth}px)`; // Recalculate slide position
});

// Create dot indicators dynamically
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => moveToSlide(i));
    dotsContainer.appendChild(dot);
});

// Update active dot indicator
function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Move slider with animation lock
function moveSlide(step) {
    if (isSliding) return;
    isSliding = true;
    
    index = (index + step + slides.length) % slides.length;
    slider.style.transform = `translateX(${-index * slideWidth}px)`; // Dynamically adjust translation based on screen width

    setTimeout(() => {
        isSliding = false;
        updateDots();
    }, 500); // Match CSS transition time
}

// Move to specific slide
function moveToSlide(i) {
    if (isSliding) return;
    index = i;
    slider.style.transform = `translateX(${-index * slideWidth}px)`; // Dynamically adjust translation based on screen width
    updateDots();
}

// Auto-slide every 5 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveSlide(1), 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Swipe support for mobile
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) moveSlide(1); // Swipe left
    else if (startX < endX - 50) moveSlide(-1); // Swipe right
});

// Start everything
updateDots();
startAutoSlide();
