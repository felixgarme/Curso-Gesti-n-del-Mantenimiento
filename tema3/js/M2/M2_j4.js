
class RCMCarousel {
constructor() {
    this.currentSlide = 0;
    this.totalSlides = 5;
    this.isAutoPlaying = false;
    this.autoPlayInterval = null;
    this.autoPlaySpeed = 4000;
    
    this.carouselTrack = document.getElementById('carouselTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.indicators = document.getElementById('indicators');
    this.progressBar = document.getElementById('progressBar');
    this.slideCounter = document.getElementById('slideCounter');
    this.autoPlayBtn = document.getElementById('autoPlayBtn');
    this.resetBtn = document.getElementById('resetBtn');
    
    this.initializeEventListeners();
    this.updateCarousel();
}

initializeEventListeners() {
    this.prevBtn.addEventListener('click', () => this.previousSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.autoPlayBtn.addEventListener('click', () => this.toggleAutoPlay());
    this.resetBtn.addEventListener('click', () => this.resetCarousel());
    
    this.indicators.addEventListener('click', (e) => {
    if (e.target.classList.contains('rcm-dot')) {
        const slideIndex = parseInt(e.target.dataset.slide);
        this.goToSlide(slideIndex);
    }
    });

    document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    });
    
    this.carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe(touchStartX, touchEndX);
    });

    this.carouselTrack.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.carouselTrack.addEventListener('mouseleave', () => this.resumeAutoPlay());
}

handleKeyNavigation(e) {
    switch(e.key) {
    case 'ArrowLeft':
        e.preventDefault();
        this.previousSlide();
        break;
    case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
    case ' ':
        e.preventDefault();
        this.toggleAutoPlay();
        break;
    case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;
    case 'End':
        e.preventDefault();
        this.goToSlide(this.totalSlides - 1);
        break;
    }
}

handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
        this.nextSlide();
    } else {
        this.previousSlide();
    }
    }
}

previousSlide() {
    if (this.currentSlide > 0) {
    this.currentSlide--;
    this.updateCarousel();
    }
}

nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
    this.currentSlide++;
    this.updateCarousel();
    }
}

goToSlide(index) {
    if (index >= 0 && index < this.totalSlides) {
    this.currentSlide = index;
    this.updateCarousel();
    }
}

updateCarousel() {
    const translateX = -this.currentSlide * (100 / this.totalSlides);
    this.carouselTrack.style.transform = `translateX(${translateX}%)`;
    
    this.updateIndicators();
    this.updateProgress();
    this.updateNavButtons();
    this.updateSlideCounter();
    this.updateActiveSlide();
}

updateIndicators() {
    const dots = this.indicators.querySelectorAll('.rcm-dot');
    dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === this.currentSlide);
    });
}

updateProgress() {
    const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
    this.progressBar.style.width = `${progress}%`;
}

updateNavButtons() {
    this.prevBtn.disabled = this.currentSlide === 0;
    this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
}

updateSlideCounter() {
    this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
}

updateActiveSlide() {
    const slides = this.carouselTrack.querySelectorAll('.rcm-slide');
    slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === this.currentSlide);
    });
}

toggleAutoPlay() {
    if (this.isAutoPlaying) {
    this.stopAutoPlay();
    } else {
    this.startAutoPlay();
    }
}

startAutoPlay() {
    this.isAutoPlaying = true;
    this.autoPlayBtn.textContent = 'Pausar';
    this.autoPlayBtn.classList.add('playing');
    
    this.autoPlayInterval = setInterval(() => {
    if (this.currentSlide < this.totalSlides - 1) {
        this.nextSlide();
    } else {
        this.goToSlide(0);
    }
    }, this.autoPlaySpeed);
}

stopAutoPlay() {
    this.isAutoPlaying = false;
    this.autoPlayBtn.textContent = 'Reproducir';
    this.autoPlayBtn.classList.remove('playing');
    
    if (this.autoPlayInterval) {
    clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = null;
    }
}

pauseAutoPlay() {
    if (this.isAutoPlaying && this.autoPlayInterval) {
    clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = null;
    }
}

resumeAutoPlay() {
    if (this.isAutoPlaying && !this.autoPlayInterval) {
    this.autoPlayInterval = setInterval(() => {
        if (this.currentSlide < this.totalSlides - 1) {
        this.nextSlide();
        } else {
        this.goToSlide(0);
        }
    }, this.autoPlaySpeed);
    }
}

resetCarousel() {
    this.stopAutoPlay();
    this.goToSlide(0);
}
}

document.addEventListener('DOMContentLoaded', () => {
new RCMCarousel();
});
