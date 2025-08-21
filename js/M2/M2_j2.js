document.addEventListener('DOMContentLoaded', function() {
const cards = document.querySelectorAll('.generation-card');
const highlightCards = document.querySelectorAll('.highlight-card');

// Animación de entrada para las tarjetas principales
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
    }
    });
}, observerOptions);

// Inicializar animaciones
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    cardObserver.observe(card);
});

// Efecto hover mejorado para tarjetas de destacados
highlightCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
    this.style.background = 'linear-gradient(135deg, #E5F0F9 0%, #DDE8F5 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
    this.style.background = 'linear-gradient(135deg, #E5F0F9 0%, #FFFFFF 100%)';
    });
});

// Efecto de parallax sutil en dispositivos de escritorio
if (window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
        card.style.transform = `translateY(${rate * 0.1 * (index + 1)}px)`;
        }
    });
    });
}

// Manejo responsivo de la tipografía
function adjustTypography() {
    const container = document.querySelector('.maintenance-evolution-container');
    const width = window.innerWidth;
    
    if (width < 480) {
    container.style.fontSize = '14px';
    } else if (width < 768) {
    container.style.fontSize = '15px';
    } else {
    container.style.fontSize = '16px';
    }
}

adjustTypography();
window.addEventListener('resize', adjustTypography);
});