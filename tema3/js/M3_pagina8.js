// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina9.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina8_2.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina8.html");

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
    // DATOS CENTRALIZADOS DE LOS SLIDES
    // =========================================================================
    const treeDevData = {
        zoom: {
            tope: '<h4>Primer Nivel: Evento Tope</h4><p>La identificación y delimitación del problema se inicia con el "Evento Tope"...</p>',
            hechos: '<h4>Segundo Nivel: Los Hechos</h4><p>Está conformado por los "Hechos"...</p>',
            hipotesis: '<h4>Desarrollo de Hipótesis</h4><p>Una hipótesis es una suposición...</p>'
        },
        carousel: [
            { title: 'Bitácoras', content: 'Registros de mantenimiento y/o operaciones.' },
            { title: 'Bases de datos (SAP)', content: 'Información centralizada de fallas asociadas a equipos.' },
            { title: 'Informes HAZOP', content: 'Análisis funcional de operatividad.' },
            { title: 'Análisis de Riesgos', content: 'Informes que evalúan posibles fallos.' },
            { title: 'Datos Genéricos', content: 'Bases de datos estándar de la industria.' },
            { title: 'Manuales de Fabricantes', content: 'Información técnica y modos de falla esperados.' },
            { title: 'Datos Blandos', content: 'Encuestas a expertos y custodios del activo para estimar ocurrencia.' }
        ],
        stepper: [
            { title: 'a) Origen de la Hipótesis', content: 'Origine una tormenta de ideas...' },
            { title: 'b) Verificación', content: 'Verifique las hipótesis a través de evidencias...' },
            { title: 'c) Límite del Análisis', content: 'Continúe bajando de nivel...' },
            { title: 'd) Proceso por Ramas', content: 'Procure bajar una rama a la vez...' },
            { title: 'Matriz de Validación', content: 'Para trabajar de forma estructurada...', isModal: true }
        ],
        accordion: {
            fisicas: '<h4>Causas Físicas (Directas)</h4><p>Son típicamente representadas...</p>',
            humanas: '<h4>Causas Humanas (Intermedias)</h4><p>Son aquellas causas donde interviene el ser humano...</p>',
            latentes: '<h4>Causas Latentes (Raíz)</h4><p>Son las causas raíz que originan el problema...</p>',
            error: '<h5>Definición de Error (HSE HSG48)</h5><p>Acción o Decisión no Intencional...</p>'
        }
    };

    // =========================================================================
    // INTERACTIVO 1: DIAGRAMA DE ZOOM
    // =========================================================================
    const zoomLevels = document.querySelectorAll('.zoom-level');
    const zoomContent = document.querySelector('.zoom-content-panel');

    if (zoomLevels.length > 0) {
        zoomLevels.forEach(level => {
            level.addEventListener('click', () => {
                zoomLevels.forEach(l => l.classList.remove('active'));
                level.classList.add('active');
                const contentHTML = treeDevData.zoom[level.dataset.level];
                zoomContent.innerHTML = `<div class="content-block">${contentHTML}</div>`;
            });
        });
        zoomLevels[0].click();
    }

    // =========================================================================
    // INTERACTIVO 2: CLASIFICADOR DE PRIORIDADES (DRAG & DROP)
    // =========================================================================
    const rankingPool = document.querySelector('.ranking-pool');
    const rankingZones = document.querySelectorAll('.ranking-zone');
    const rankingFeedback = document.querySelector('.ranking-feedback');

    if (rankingPool) {
        const rankItemsData = [
            { text: 'Un evento que ha ocurrido antes (Parte del Historial).', rank: 1 },
            { text: 'Un evento que no ha ocurrido, pero es posible.', rank: 2 },
            { text: 'Un evento que es parte del programa de mantenimiento.', rank: 2 },
            { text: 'Un evento de consecuencias graves.', rank: 3 }
        ];

        rankItemsData.sort(() => Math.random() - 0.5).forEach(itemData => {
            const item = document.createElement('div');
            item.className = 'rank-item';
            item.draggable = true;
            item.textContent = itemData.text;
            item.dataset.rank = itemData.rank;
            rankingPool.appendChild(item);
        });

        let draggedItem = null;

        rankingPool.querySelectorAll('.rank-item').forEach(item => {
            item.addEventListener('dragstart', () => {
                draggedItem = item;
            });
        });

        rankingZones.forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                if (draggedItem && zone.dataset.zone === draggedItem.dataset.rank) {
                    zone.appendChild(draggedItem);
                    draggedItem.draggable = false;
                    rankingFeedback.textContent = "¡Clasificación correcta!";
                    rankingFeedback.style.color = '#28a745';
                } else {
                    rankingFeedback.textContent = "Incorrecto. Revisa la definición de las fases.";
                    rankingFeedback.style.color = 'var(--color-rojo)';
                }
            });
        });
    }

    // =========================================================================
    // INTERACTIVO 3: CARRUSEL 3D
    // =========================================================================
    const carousel3d = document.querySelector('.carousel-3d');

    if (carousel3d) {
        const cards = treeDevData.carousel;

        cards.forEach((cardData) => {
            const card = document.createElement('div');
            card.className = 'carousel-3d-card';
            card.innerHTML = `<h4>${cardData.title}</h4><p>${cardData.content}</p>`;
            carousel3d.appendChild(card);
        });

        let angle = 0;
        const cardElements = document.querySelectorAll('.carousel-3d-card');
        const cardAngle = 360 / cardElements.length;

        function updateCarousel() {
            carousel3d.style.transform = `rotateY(${angle}deg)`;
            cardElements.forEach((card, i) => {
                const itemAngle = cardAngle * i;
                card.style.transform = `rotateY(${itemAngle}deg) translateZ(250px)`;
            });
        }

        document.querySelector('.carousel-3d-nav.next').addEventListener('click', () => {
            angle -= cardAngle;
            updateCarousel();
        });

        document.querySelector('.carousel-3d-nav.prev').addEventListener('click', () => {
            angle += cardAngle;
            updateCarousel();
        });

        updateCarousel();
    }

    // =========================================================================
    // INTERACTIVO 4: SIMULADOR DE DECISIÓN
    // =========================================================================
    const decisionOptions = document.querySelectorAll('.decision-options button');

    if (decisionOptions.length > 0) {
        const feedback = document.querySelector('.decision-feedback');

        decisionOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                decisionOptions.forEach(b => b.disabled = true);
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    feedback.textContent = "¡Correcto! Siempre se debe iniciar por la rama de mayor valor o probabilidad (40%).";
                    feedback.style.color = '#28a745';
                } else {
                    btn.classList.add('incorrect');
                    feedback.textContent = "Incorrecto. La regla es iniciar por la rama de mayor valor.";
                    feedback.style.color = 'var(--color-rojo)';
                }
            });
        });
    }

    // =========================================================================
    // INTERACTIVO 5: STEPPER DE HIPÓTESIS
    // =========================================================================
    const stepperTrack = document.querySelector('.stepper-track');
    const modal = document.getElementById('validation-matrix-modal');

    if (stepperTrack) {
        const steps = treeDevData.stepper;

        steps.forEach(step => {
            const slide = document.createElement('div');
            slide.className = 'stepper-slide';
            let buttonHTML = step.isModal ? '<button id="open-matrix-modal" class="start-button-style-1">Ver Matriz de Validación</button>' : '';
            slide.innerHTML = `<h4>${step.title}</h4><p>${step.content}</p>${buttonHTML}`;
            stepperTrack.appendChild(slide);
        });

        let currentIndex = 0;
        const slides = document.querySelectorAll('.stepper-slide');

        const updateStepper = () => {
            stepperTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
            document.querySelector('.stepper-btn.prev').disabled = currentIndex === 0;
            document.querySelector('.stepper-btn.next').disabled = currentIndex === slides.length - 1;
        };

        document.querySelector('.stepper-btn.next').addEventListener('click', () => {
            currentIndex++;
            updateStepper();
        });

        document.querySelector('.stepper-btn.prev').addEventListener('click', () => {
            currentIndex--;
            updateStepper();
        });

        document.getElementById('open-matrix-modal').addEventListener('click', () => {
            modal.style.display = 'block';
        });

        document.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        updateStepper();
    }

    // =========================================================================
    // INTERACTIVO 6: ACORDEÓN ANIDADO
    // =========================================================================
    const accordionContainer = document.querySelector('.nested-accordion');

    if (accordionContainer) {
        const accordionData = treeDevData.accordion;

        accordionContainer.innerHTML = `
            <div class="accordion-item">
                <div class="accordion-header">Las Causas Físicas</div>
                <div class="accordion-content">${accordionData.fisicas}</div>
            </div>
            <div class="accordion-item">
                <div class="accordion-header">Las Causas Humanas</div>
                <div class="accordion-content">
                    ${accordionData.humanas}
                    <div class="accordion-item nested">
                        <div class="accordion-header">Detalle: Definición de Error</div>
                        <div class="accordion-content">${accordionData.error}</div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <div class="accordion-header">Las Causas Latentes</div>
                <div class="accordion-content">${accordionData.latentes}</div>
            </div>
        `;

        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
            });
        });
    }

});
