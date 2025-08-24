
// Funcionalidad de navegación
function initNavigation() {
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');
const progressFill = document.querySelector('.progress-fill');

navButtons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
    // Remover clases activas
    navButtons.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // Agregar clase activa al botón clickeado
    this.classList.add('active');
    
    // Mostrar sección correspondiente
    const targetSection = this.getAttribute('data-section');
    document.getElementById(targetSection).classList.add('active');
    
    // Actualizar barra de progreso
    const progressWidth = ((index + 1) / navButtons.length) * 100;
    progressFill.style.width = `${progressWidth}%`;
    });
});
}

// Funcionalidad de interactividad en las tarjetas de preguntas
function initQuestionCards() {
const questionCards = document.querySelectorAll('.question-card');

questionCards.forEach(card => {
    card.addEventListener('click', function() {
    // Toggle active state
    this.classList.toggle('active');
    
    // Agregar efecto de pulse
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
    });
    
 
    
    card.addEventListener('mouseleave', function() {
    if (!this.classList.contains('active')) {
        this.style.borderColor = 'var(--border-3)';
    }
    });
});
}

// Animaciones de entrada
function initAnimations() {
const cards = document.querySelectorAll('.question-card, .function-card, .stat-card, .objective-card');

// Intersection Observer para animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
    }
    });
}, { threshold: 0.1 });

cards.forEach((card, index) => {
    // Configurar estado inicial
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    // Observar elemento
    observer.observe(card);
});
}

// Funcionalidad de navegación con teclado
function initKeyboardNavigation() {
document.addEventListener('keydown', function(e) {
    const activeSection = document.querySelector('.content-section.active');
    const navButtons = document.querySelectorAll('.nav-btn');
    const activeNavIndex = Array.from(navButtons).findIndex(btn => btn.classList.contains('active'));
    
    if (e.key === 'ArrowLeft' && activeNavIndex > 0) {
    e.preventDefault();
    navButtons[activeNavIndex - 1].click();
    } else if (e.key === 'ArrowRight' && activeNavIndex < navButtons.length - 1) {
    e.preventDefault();
    navButtons[activeNavIndex + 1].click();
    }
});
}

// Funcionalidad de scroll suave
function initSmoothScroll() {
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
    // Scroll suave hacia arriba cuando se cambia de sección
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    });
});
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
initNavigation();
initQuestionCards();
initAnimations();
initKeyboardNavigation();
initSmoothScroll();

// Mostrar primera sección por defecto
document.getElementById('overview').classList.add('active');
});

// Funcionalidad adicional para dispositivos móviles
function initMobileFeatures() {
// Detectar dispositivos móviles
const isMobile = window.innerWidth <= 768;

if (isMobile) {
    // Agregar funcionalidad de swipe
    let startX, startY;
    
    document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Solo procesar swipes horizontales
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const navButtons = document.querySelectorAll('.nav-btn');
        const activeNavIndex = Array.from(navButtons).findIndex(btn => btn.classList.contains('active'));
        
        if (diffX > 0 && activeNavIndex < navButtons.length - 1) {
        // Swipe left - siguiente sección
        navButtons[activeNavIndex + 1].click();
        } else if (diffX < 0 && activeNavIndex > 0) {
        // Swipe right - sección anterior
        navButtons[activeNavIndex - 1].click();
        }
    }
    
    startX = null;
    startY = null;
    });
}
}

// Inicializar funcionalidades móviles
window.addEventListener('load', initMobileFeatures);

// Función para redimensionar dinámicamente
window.addEventListener('resize', function() {
// Reinicializar funcionalidades móviles si es necesario
if (window.innerWidth <= 768) {
    initMobileFeatures();
}
});
