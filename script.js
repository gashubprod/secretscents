// ===== Hero Slider =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;

    // Re-trigger animations by cloning and replacing content/bottles
    const newSlide = slides[currentSlide];
    const content = newSlide.querySelector('.slide-content');
    const bottles = newSlide.querySelectorAll('.hero-bottle');

    // Force animation restart
    content.style.animation = 'none';
    bottles.forEach(b => b.style.animation = 'none');
    void newSlide.offsetHeight; // trigger reflow
    content.style.animation = '';
    bottles.forEach(b => b.style.animation = '');

    newSlide.classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.slide));
        resetAutoSlide();
    });
});

startAutoSlide();

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// ===== Scroll to Top =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Sticky Header Shadow =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ===== Add to Cart Animation =====
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function () {
        const original = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Added!';
        this.style.background = '#27ae60';
        setTimeout(() => {
            this.innerHTML = original;
            this.style.background = '';
        }, 1500);
    });
});

// ===== Wishlist Toggle =====
document.querySelectorAll('.product-actions button:first-child').forEach(btn => {
    btn.addEventListener('click', function () {
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        if (icon.classList.contains('fas')) {
            this.style.background = '#e74c3c';
            this.style.color = '#fff';
        } else {
            this.style.background = '#fff';
            this.style.color = '#333';
        }
    });
});
