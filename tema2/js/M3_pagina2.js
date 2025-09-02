const rules = [
    {
        title: "Análisis Causa Raíz (RCA)",
        icon: "../assets/images/M3/aspectos_basicos.png",
        description: "Método estructurado para identificar la causa de fallas, errores o eventos no deseados, con el fin de eliminarlos y evitar su repetición.",
        detail: "Proceso sistemático para identificar las causas de un evento focal. Según la IEC 60050-192:2014, definición 192-12-05, es un proceso sistemático para identificar la causa de un error, falla o evento no deseado, de modo que pueda ser eliminado por diseño, proceso o cambios de procedimiento. Esta norma utiliza una definición ampliada para permitir una aplicabilidad más amplia del proceso."
    },
    {
        title: "Componente (ítem)",
        icon: "../assets/images/M3/proteccion.png",
        description: "Elemento sujeto a análisis, que puede ser una pieza, equipo, software, persona o cualquier combinación de estos.",
        detail: "Sujeto en análisis, definido por la BS EN 62740:2015. Puede ser una pieza, componente, dispositivo, unidad funcional, equipo, subsistema o sistema individual, y estar compuesto por hardware, software, personas o una combinación de ellos. Un ítem puede incluir elementos que pueden considerarse individualmente."
    },
    {
        title: "Evento",
        icon: "../assets/images/M3/espacios_confinados.png",
        description: "Ocurrencia o cambio de circunstancias, que puede tener múltiples causas y manifestarse como incidente o accidente.",
        detail: "Ocurrencia o cambio de un conjunto particular de circunstancias, definido por la BS EN 62740:2015. Un evento puede tener una o varias causas, incluir la ausencia de una acción, y en ocasiones denominarse incidente o accidente."
    },
    {
        title: "Evento de enfoque",
        icon: "../assets/images/M3/espacios_confinados.png",
        description: "El evento específico que se busca explicar mediante el análisis causal.",
        detail: "Evento que se pretende explicar causalmente, según BS EN 62740:2015."
    },
    {
        title: "Falla",
        icon: "../assets/images/M3/materiales_peligrosos.png",
        description: "Pérdida de la capacidad de un activo para cumplir su función o propósito requerido.",
        detail: "Cualquier evento o situación que impide el cumplimiento de la función o propósito de un activo. Es la terminación de la capacidad de un sistema, equipo o parte para realizar su función requerida, según ISO 14224 y BS EN 62740:2015."
    },
    {
        title: "Mecanismo de falla",
        icon: "../assets/images/M3/levante_manipulacion.png",
        description: "Proceso físico, químico o de otro tipo que provoca la ocurrencia de una falla (ej. fatiga, corrosión, erosión).",
        detail: "Proceso progresivo o súbito de deterioro que provoca una falla, el cual puede ser físico, químico u otro, según ISO 14224. Ejemplos incluyen fatiga, ruptura por fluencia, corrosión, erosión y cavitación. El API RP 571 y el ISO 14224 presentan listas detalladas de mecanismos de deterioro para apoyar los análisis de confiabilidad."
    },
    {
        title: "Modo de falla",
        icon: "../assets/images/M3/productos_quimicos.png",
        description: "La forma en que se manifiesta una falla en un activo (ej. taponamiento, fuga, vibración).",
        detail: "Es la forma en que un activo o parte de él pierde su función. Puede describirse como la manifestación de la falla de un componente, un evento único que causa una falla funcional (SAE JA1011) o el modo observado de la falla (ISO 14224). Ejemplos: taponamiento, desconexión, vibración, ruido, fugas internas o externas y sobrecalentamiento. El ISO 14224 suministra tablas con modos de falla por tipo de equipos."
    },
    {
        title: "Causa de falla",
        icon: "../assets/images/M3/materiales_fundidos.png",
        description: "La razón específica que explica por qué ocurrió la falla (ej. errores de diseño, fabricación o mantenimiento).",
        detail: "Es el hecho real que explica por qué se presentó una falla. Puede originarse en el diseño, la fabricación, la instalación, la operación o el mantenimiento, según ISO 14224 y BS EN 62740:2015. Ejemplos: errores de diseño, fabricación, instalación, operación, mantenimiento o gestión. El ISO 14224 también proporciona tablas de causas en su apartado B-3."
    },
    {
        title: "Causa principal",
        icon: "../assets/images/M3/aspectos_basicos.png",
        description: "El factor causal más relevante y sin predecesor, identificado como raíz del problema en el análisis.",
        detail: "Es el factor causal sin predecesor relevante para el análisis, según BS EN 62740:2015. Un evento de enfoque puede tener más de una causa raíz, y en algunos idiomas este término se refiere a un conjunto de factores causales que no tienen predecesor."
    }
];

class CustomAudioPlayer {
    constructor() {
        this.audioPlayer = document.getElementById('audioPlayer');
        this.audioToggle = document.getElementById('audioToggle');
        this.audioControls = document.getElementById('audioControls');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.volumeToggle = document.getElementById('volumeToggle');
        this.speedBtn = document.getElementById('speedBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeFill = document.getElementById('volumeFill');
        this.currentTimeDisplay = document.getElementById('currentTime');
        this.durationDisplay = document.getElementById('duration');
        this.speedDisplay = document.getElementById('speedDisplay');
        this.audioInfo = document.getElementById('audioInfo');

        this.isControlsVisible = false;
        this.currentSpeed = 1;
        this.speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        this.speedIndex = 2; // 1x por defecto

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.audioPlayer.volume = 0.8;
        this.updateVolumeDisplay();

        // Auto-play si está configurado
        if (this.audioPlayer.hasAttribute('autoplay')) {
            this.audioPlayer.play().catch(e => {
                console.log('Autoplay bloqueado:', e);
            });
        }
    }

    setupEventListeners() {
        // Toggle de controles
        this.audioToggle.addEventListener('click', () => this.toggleControls());

        // Cerrar controles al hacer clic fuera
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Controles de reproducción
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.audioToggle.addEventListener('dblclick', () => this.togglePlayPause());

        // Control de volumen
        this.volumeToggle.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('click', (e) => this.setVolume(e));

        // Control de velocidad
        this.speedBtn.addEventListener('click', () => this.cycleSpeed());

        // Barra de progreso
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));

        // Eventos del audio
        this.audioPlayer.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
        this.audioPlayer.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.audioPlayer.addEventListener('play', () => this.onPlay());
        this.audioPlayer.addEventListener('pause', () => this.onPause());
        this.audioPlayer.addEventListener('ended', () => this.onEnded());
        this.audioPlayer.addEventListener('loadstart', () => this.onLoadStart());
        this.audioPlayer.addEventListener('canplay', () => this.onCanPlay());
    }

    onLoadedMetadata() {
        // Mostrar la duración total cuando se cargan los metadatos
        this.durationDisplay.textContent = this.formatTime(this.audioPlayer.duration);
        this.updateVolumeIcon();
    }

    onLoadStart() {
        // Mostrar estado de carga
        this.audioInfo.textContent = 'Cargando...';
        this.durationDisplay.textContent = '0:00';
    }

    onCanPlay() {
        // Limpiar mensaje de carga cuando esté listo para reproducir
        this.audioInfo.textContent = '';
        // Asegurar que la duración se muestre correctamente
        if (this.audioPlayer.duration && !isNaN(this.audioPlayer.duration)) {
            this.durationDisplay.textContent = this.formatTime(this.audioPlayer.duration);
        }
    }

    toggleControls() {
        this.isControlsVisible = !this.isControlsVisible;
        this.audioControls.classList.toggle('show', this.isControlsVisible);
    }

    handleOutsideClick(e) {
        if (!this.audioToggle.contains(e.target) && !this.audioControls.contains(e.target)) {
            this.isControlsVisible = false;
            this.audioControls.classList.remove('show');
        }
    }

    togglePlayPause() {
        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
        } else {
            this.audioPlayer.pause();
        }
    }

    toggleMute() {
        this.audioPlayer.muted = !this.audioPlayer.muted;
        this.updateVolumeIcon();
    }

    setVolume(e) {
        const rect = this.volumeSlider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const volume = Math.max(0, Math.min(1, clickX / rect.width));
        this.audioPlayer.volume = volume;
        this.audioPlayer.muted = false;
        this.updateVolumeDisplay();
        this.updateVolumeIcon();
    }

    cycleSpeed() {
        this.speedIndex = (this.speedIndex + 1) % this.speeds.length;
        this.currentSpeed = this.speeds[this.speedIndex];
        this.audioPlayer.playbackRate = this.currentSpeed;
        this.speedDisplay.textContent = this.currentSpeed + 'x';
    }

    setProgress(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * this.audioPlayer.duration;
        this.audioPlayer.currentTime = newTime;
    }

    updateVolumeDisplay() {
        const volume = this.audioPlayer.muted ? 0 : this.audioPlayer.volume;
        this.volumeFill.style.width = (volume * 100) + '%';
    }

    updateVolumeIcon() {
        const volumeIcon = document.getElementById('volumeIcon');
        const muteIcon = document.getElementById('muteIcon');

        if (this.audioPlayer.muted || this.audioPlayer.volume === 0) {
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            volumeIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    onTimeUpdate() {
        const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
        this.progressFill.style.width = progress + '%';
        this.currentTimeDisplay.textContent = this.formatTime(this.audioPlayer.currentTime);
    }

    onPlay() {
        // Iconos del botón principal
        document.getElementById('togglePlayIcon').style.display = 'none';
        document.getElementById('togglePauseIcon').style.display = 'block';

        // Iconos del botón de control
        document.getElementById('playIcon').style.display = 'none';
        document.getElementById('pauseIcon').style.display = 'block';

        this.audioToggle.classList.add('playing');
    }

    onPause() {
        // Iconos del botón principal
        document.getElementById('togglePlayIcon').style.display = 'block';
        document.getElementById('togglePauseIcon').style.display = 'none';

        // Iconos del botón de control
        document.getElementById('playIcon').style.display = 'block';
        document.getElementById('pauseIcon').style.display = 'none';

        this.audioToggle.classList.remove('playing');
    }

    onEnded() {
        this.onPause();
        this.progressFill.style.width = '0%';
        this.currentTimeDisplay.textContent = '0:00';
    }
}

function createRuleCards() {
    const grid = document.getElementById('rulesGrid');

    rules.forEach((rule, index) => {
        const card = document.createElement('div');
        card.className = 'rule-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver detalles de ${rule.title}`);

        const handleClick = () => openModal(rule, index + 1);
        card.onclick = handleClick;
        card.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        };

        // Detecta si rule.icon es una ruta de imagen
        const isImage = typeof rule.icon === 'string' && rule.icon.match(/\.(png|jpe?g|gif|svg)$/i);
        const iconHTML = isImage
            ? `<img src="${rule.icon}" alt="${rule.title}" class="rule-image-icon" />`
            : `<span class="rule-emoji-icon">${rule.icon}</span>`;

        card.innerHTML = `
                    <div class="rule-number">${String(index + 1).padStart(2, '0')}</div>
                    <div class="rule-icon">${iconHTML}</div>
                    <div class="rule-title">${rule.title}</div>
                    <div class="rule-description">${rule.description}</div>
                `;

        grid.appendChild(card);
    });
}

function wrapWordsInSpans(text) {
    return text.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
}

function animateWords(container) {
    const words = container.querySelectorAll('.word');
    words.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('fade-in');
        }, index * 50); // 150ms delay between each word
    });
}

function openModal(rule, number) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');

    // Detecta si rule.icon es una ruta de imagen
    const isImage = typeof rule.icon === 'string' && rule.icon.match(/\.(png|jpe?g|gif|svg)$/i);
    const iconHTML = isImage
        ? `<img src="${rule.icon}" alt="${rule.title}" class="rule-image-icon" />`
        : `<span class="rule-emoji-icon">${rule.icon}</span>`;

    // Wrap each word in spans for animation
    const wrappedDetail = wrapWordsInSpans(rule.detail);

    modalContent.innerHTML = `
                <div class="modal-header">
                    <div class="modal-icon">${iconHTML}</div>
                    <div class="modal-number">Concepto ${String(number).padStart(2, '0')}</div>
                    <h2 class="modal-title">${rule.title}</h2>
                </div>
                <div class="modal-detail">
                    ${wrappedDetail}
                </div>
            `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Start word animation immediately
    setTimeout(() => {
        const modalDetail = modalContent.querySelector('.modal-detail');
        animateWords(modalDetail);

        // Focus on close button for accessibility
        document.querySelector('.close_modal').focus();
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    createRuleCards();
    setupContinueSection();
    new CustomAudioPlayer();
});

const closeBtn = document.querySelector('.close_modal');
closeBtn.onclick = closeModal;
closeBtn.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModal();
    }
};

document.getElementById('modal').onclick = function (event) {
    if (event.target === this) {
        closeModal();
    }
};

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Prevenir zoom en dispositivos móviles al hacer doble tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);


// Continue section functionality
function setupContinueSection() {
    const continueSection = document.getElementById('continueSection');
    const footer = document.querySelector('.footer');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                continueSection.classList.add('visible');
            } else {
                continueSection.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5 // Aparece cuando el 50% del footer es visible
    });

    observer.observe(footer);
}