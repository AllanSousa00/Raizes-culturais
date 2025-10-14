const body = document.body;

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    localStorage.setItem('darkMode', isDark);
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    setTheme(!isDark);
});

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme !== null) {
    setTheme(savedTheme === 'true');
} else {
    setTheme(true); // default dark mode
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Smooth Scrolling for Navigation
document.querySelectorAll('#nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
        nav.classList.remove('open'); // close menu on link click
    });
});

// Show More Works
const showMoreBtn = document.getElementById('show-more');
const extraWorks = document.querySelectorAll('.extra');

showMoreBtn.addEventListener('click', () => {
    extraWorks.forEach(work => {
        work.classList.toggle('hidden');
        if (!work.classList.contains('hidden')) {
            work.classList.add('animate-fade-in');
        } else {
            work.classList.remove('animate-fade-in');
        }
    });
    showMoreBtn.textContent = extraWorks[0].classList.contains('hidden') ? 'Ver mais projetos' : 'Mostrar menos';
});

// Animate works on page load with Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.work-card').forEach(card => {
    observer.observe(card);
});

// Search Works
const searchInput = document.getElementById('search-works');
const workCards = document.querySelectorAll('.work-card');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    workCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Carousel Functionality
const carouselContainer = document.querySelector('.carousel-container');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateCarousel() {
    const translateX = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${translateX}%)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselSlides.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselSlides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Auto-slide (optional)
setInterval(() => {
    currentIndex = (currentIndex < carouselSlides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}, 5000); // Change slide every 5 seconds

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Validation
const contactForm = document.querySelector('#contato form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    let isValid = true;
    let errors = [];

    if (name === '') {
        isValid = false;
        errors.push('Nome é obrigatório.');
    }

    if (email === '') {
        isValid = false;
        errors.push('Email é obrigatório.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        errors.push('Email inválido.');
    }

    if (message === '') {
        isValid = false;
        errors.push('Mensagem é obrigatória.');
    }

    if (isValid) {
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
    } else {
        alert('Erros:\n' + errors.join('\n'));
    }
});
