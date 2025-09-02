
let currentSlide = 1;
const totalSlides = 5;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');

function updateSlide() {
    // Hide all slides
    document.querySelectorAll('.curso-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    
    // Update progress bar
    const progress = (currentSlide / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update button states
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
    
    // Update button text for last slide
    if (currentSlide === totalSlides) {
        nextBtn.textContent = 'Finalizar';
    } else {
        nextBtn.textContent = 'Siguiente →';
    }
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    } else {
        alert('¡Curso completado! Has terminado el módulo sobre Modos y Efectos de Falla.');
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

function toggleExpand(element) {
    const content = element.querySelector('.curso-expandable-content');
    const isExpanded = element.classList.contains('expanded');
    
    if (isExpanded) {
        element.classList.remove('expanded');
        content.classList.remove('show');
    } else {
        element.classList.add('expanded');
        content.classList.add('show');
    }
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    }
});

// Initialize
updateSlide();

// Auto-save progress (simulated)
function saveProgress() {
    console.log(`Progreso guardado: Slide ${currentSlide} de ${totalSlides}`);
}

// Save progress every time slide changes
window.addEventListener('beforeunload', saveProgress);

// Touch/swipe support for mobile
let touchStartX = null;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
            nextSlide(); // Swipe left - next slide
        } else {
            prevSlide(); // Swipe right - previous slide
        }
    }
    
    touchStartX = null;
});
