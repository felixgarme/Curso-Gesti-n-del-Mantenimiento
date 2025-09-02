class MaintenanceCourse {
  constructor() {
    this.initializeEventListeners();
    this.animateProgressBar();
  }

  initializeEventListeners() {
    const continueBtn = document.getElementById('continueBtn');
    const reviewBtn = document.getElementById('reviewBtn');

    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.handleContinue());
    }

    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => this.handleReview());
    }

    this.setupCardAnimations();
  }

  handleContinue() {
    this.showMessage('Avanzando al siguiente tema...', 'success');
    this.updateProgress(50);
    
    setTimeout(() => {
      console.log('Navegando al siguiente módulo del curso');
    }, 1000);
  }

  handleReview() {
    this.showMessage('Revisando contenido actual...', 'info');
    this.highlightKeyPoints();
  }

  showMessage(text, type) {
    const existingMessage = document.querySelector('.course-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const message = document.createElement('div');
    message.className = `course-message ${type}`;
    message.textContent = text;
    
    const colors = {
      success: '#27ae60',
      info: '#031795',
      warning: '#f39c12'
    };

    Object.assign(message.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: colors[type] || colors.info,
      color: 'white',
      padding: '10px',
      borderRadius: '6px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: '1000',
      fontSize: '0.9rem',
      fontWeight: '600',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      message.style.transform = 'translateX(100%)';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  updateProgress(percentage) {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
  }

  highlightKeyPoints() {
    const keyElements = document.querySelectorAll('strong');
    
    keyElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.background = '#fff3cd';
        element.style.padding = '2px 4px';
        element.style.borderRadius = '3px';
        element.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
          element.style.background = 'transparent';
          element.style.padding = '0';
        }, 2000);
      }, index * 500);
    });
  }

  setupCardAnimations() {
    const cards = document.querySelectorAll('.content-card');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  animateProgressBar() {
    setTimeout(() => {
      this.updateProgress(25);
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MaintenanceCourse();
});