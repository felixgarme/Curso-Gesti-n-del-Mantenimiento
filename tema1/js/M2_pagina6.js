// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_inicio.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M2_pagina5.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M2_pagina6.html");

        // Recuperar progreso para la barra
        document.addEventListener("DOMContentLoaded", () => {
            const progreso = ScormManager.cargarProgreso();
            const porcentaje = progreso.score ? parseInt(progreso.score) : 0;

            const barra = document.getElementById("progreso-barra");
            const texto = document.getElementById("progreso-texto");

            barra.style.width = porcentaje + "%";
            texto.textContent = porcentaje + "%";
        });

/*Interactivo*/
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // LÓGICA PARA EL COMPONENTE 1: ESTATUS (VERSIÓN HORIZONTAL + CLIC)
    // =========================================================================
    const timelineItemsH = document.querySelectorAll('.timeline-item-h');
    const statusTitleH = document.getElementById('status-title-h');
    const statusDescriptionH = document.getElementById('status-description-h');
    const timelineProgressH = document.querySelector('.timeline-progress-h');

    if (timelineItemsH.length > 0) {
        
        function updateTimelineView(activeIndex) {
            // Actualizar la información en el panel
            const activeItem = timelineItemsH[activeIndex];
            statusTitleH.textContent = activeItem.dataset.title;
            statusDescriptionH.textContent = activeItem.dataset.description;

            // Actualizar la clase 'active' para estilos visuales
            timelineItemsH.forEach((item, idx) => {
                if (idx === activeIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // Actualizar la barra de progreso
            // Se calcula el progreso basado en la posición del ítem activo
            const progressPercentage = (activeIndex / (timelineItemsH.length - 1)) * 100;
            
            // Detección de layout para animar width o height
            if (window.innerWidth <= 992) {
                // Modo vertical
                const containerRect = activeItem.parentElement.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const progressHeight = itemRect.top - containerRect.top + itemRect.height / 2;
                timelineProgressH.style.height = `${progressHeight}px`;
                timelineProgressH.style.width = '4px'; // Asegurar el ancho en vertical
            } else {
                // Modo horizontal
                timelineProgressH.style.width = `${progressPercentage}%`;
                timelineProgressH.style.height = '4px'; // Asegurar la altura en horizontal
            }
        }
        
        // Añadir el listener de clic a cada item
        timelineItemsH.forEach((item, index) => {
            item.addEventListener('click', () => {
                updateTimelineView(index);
            });
        });

        // Iniciar con el primer elemento activo por defecto
        updateTimelineView(0);
    }


    // Lógica del Mini-Ejercicio 1 (sin cambios)
    const quizOptions = document.querySelectorAll('.quiz-option');
    const feedbackEl = document.querySelector('.quiz-feedback-status');
    if(quizOptions.length > 0 && feedbackEl){
        quizOptions.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('correct-answer')) {
                    feedbackEl.textContent = "¡Correcto! IMPR (impresa) y MOVM (movimiento de mercancías) son los estados necesarios.";
                    feedbackEl.style.color = 'var(--color-azul-claro)';
                } else {
                    feedbackEl.textContent = "Incorrecto. Intenta de nuevo.";
                    feedbackEl.style.color = 'var(--color-rojo)';
                }
            });
        });
    }

    // =========================================================================
    // LÓGICA PARA EL COMPONENTE 2: MANTENIMIENTO PLANIFICADO (SIN CAMBIOS)
    // =========================================================================
    const pmCards = document.querySelectorAll('.pm-card');
    const pmModal = document.getElementById('pm-modal');
    if(pmCards.length > 0 && pmModal) {
        const pmModalCloseBtn = document.querySelector('.pm-modal-close-btn');
        const modalTitle = document.getElementById('pm-modal-title');
        const modalCode = document.getElementById('pm-modal-code');
        const modalDetails = document.getElementById('pm-modal-details');
        pmCards.forEach(card => {
            card.addEventListener('click', () => {
                modalTitle.textContent = card.dataset.title;
                modalCode.textContent = card.dataset.code;
                modalDetails.textContent = card.dataset.details;
                pmModal.classList.add('visible');
            });
        });
        const closeModal = () => { pmModal.classList.remove('visible'); }
        pmModalCloseBtn.addEventListener('click', closeModal);
        pmModal.addEventListener('click', (e) => { if (e.target === pmModal) closeModal(); });
    }
});
