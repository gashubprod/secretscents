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

// ===== Countdown Timer (Urgency) =====
function startCountdown() {
    // Set countdown to 8 hours, 45 minutes, 30 seconds from now
    let totalSeconds = 8 * 3600 + 45 * 60 + 30;

    function updateCountdown() {
        if (totalSeconds <= 0) {
            totalSeconds = 8 * 3600 + 45 * 60 + 30; // reset
        }
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        document.getElementById('hours').textContent = String(h).padStart(2, '0');
        document.getElementById('minutes').textContent = String(m).padStart(2, '0');
        document.getElementById('seconds').textContent = String(s).padStart(2, '0');
        totalSeconds--;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startCountdown();

// ===== Animated Stats Counter =====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                function updateNumber(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target).toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        el.textContent = target.toLocaleString();
                    }
                }

                requestAnimationFrame(updateNumber);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

animateCounters();

// ===== "Recently Bought" Toast Notification =====
const recentBuyers = [
    { name: 'Sarah from Nairobi', product: 'Creed Aventus', time: '2 min ago' },
    { name: 'Kevin from Mombasa', product: 'Dior Sauvage Elixir', time: '5 min ago' },
    { name: 'Grace from Kisumu', product: 'Baccarat Rouge 540', time: '8 min ago' },
    { name: 'Brian from Nakuru', product: 'Tom Ford Ombre Leather', time: '12 min ago' },
    { name: 'Wanjiku from Thika', product: 'YSL Libre Intense', time: '15 min ago' },
];

let toastIndex = 0;

function showBuyerToast() {
    const buyer = recentBuyers[toastIndex % recentBuyers.length];
    const toast = document.createElement('div');
    toast.className = 'buyer-toast';
    toast.innerHTML = `
        <i class="fas fa-shopping-bag"></i>
        <div>
            <strong>${buyer.name}</strong> just purchased<br>
            <span>${buyer.product}</span>
            <small>${buyer.time}</small>
        </div>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 5000);

    toastIndex++;
}

// Show first toast after 6 seconds, then every 25 seconds
setTimeout(() => {
    showBuyerToast();
    setInterval(showBuyerToast, 25000);
}, 6000);
