// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina8_2.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina7.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina8_1.html");

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
    // --- LÓGICA DE ANIMACIÓN POR SCROLL ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.acr3-animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- TEMA 2: TIMELINE INTERACTIVO ---
    const timelineItems = document.querySelectorAll('.acr3-timeline-item');
    const timelineInfoPanel = document.getElementById('acr3-timeline-info');
    const timelineInfoContent = {
        'info-1': '<h4>Definición Principal</h4><p>La identificación y delimitación del problema o falla, se inicia con la descripción o enunciado del problema o falla, llamado “Evento Tope”.</p>',
        'info-2': '<h4>Importancia Económica</h4><p>Es aquello que justifica económicamente que se debe eliminar, ya que, este evento afecta significativamente el negocio.</p>',
        'info-3': '<h4>Función del Evento</h4><p>El evento tope, describe la “negación de la función deseada”, por ello es importante definir el nivel de análisis y la función de ese nivel para delimitar el problema.</p>'
    };
    if (timelineInfoPanel) timelineInfoPanel.innerHTML = timelineInfoContent['info-1'];
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const infoId = item.getAttribute('data-info-id');
            timelineInfoPanel.innerHTML = timelineInfoContent[infoId];
        });
    });

    // --- TEMA 3: TARJETA DE PREGUNTA ---
    const questionCard = document.getElementById('acr3-question-trigger');
    if (questionCard) {
        questionCard.addEventListener('click', () => {
            questionCard.querySelector('.question-mark').style.display = 'none';
            questionCard.querySelector('.question-text').style.display = 'block';
            questionCard.classList.add('flipped'); // Añadir clase para animación
        });
    }

    // --- TEMA 4: DRAG & DROP ---
    const files = document.querySelectorAll('.acr3-file');
    const bins = document.querySelectorAll('.acr3-bin');
    let draggedFile = null;
    files.forEach(file => {
        file.addEventListener('dragstart', () => { draggedFile = file; setTimeout(() => file.classList.add('dragging'), 0); });
        file.addEventListener('dragend', () => file.classList.remove('dragging'));
    });
    bins.forEach(bin => {
        bin.addEventListener('dragover', e => { e.preventDefault(); bin.classList.add('hover'); });
        bin.addEventListener('dragleave', () => bin.classList.remove('hover'));
        bin.addEventListener('drop', e => {
            e.preventDefault();
            bin.classList.remove('hover');
            if (draggedFile && bin.dataset.phase === draggedFile.dataset.phase) {
                bin.appendChild(draggedFile);
                draggedFile.style.borderColor = 'var(--acr3-color-verde)';
            } else {
                // Animación de "shake" para un drop incorrecto
                draggedFile.animate([
                    { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
                ], { duration: 300, iterations: 2 });
            }
        });
    });

    // --- TEMA 5: DATA HUB ---
    const hubItems = document.querySelectorAll('.acr3-hub-item');
    const hubInfoPanel = document.getElementById('acr3-hub-info-panel');
    hubItems.forEach(item => {
        item.addEventListener('click', () => {
            hubItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            hubInfoPanel.textContent = item.getAttribute('data-info');
        });
    });

    // --- TEMA 6 Y 7: SIMULADOR DE CONSENSO ---
    const sliders = [document.getElementById('slider1'), document.getElementById('slider2'), document.getElementById('slider3')];
    const valueSpans = [document.getElementById('val1'), document.getElementById('val2'), document.getElementById('val3')];
    const totalDisplay = document.getElementById('acr3-total-display');

    function updateSliders(changedSlider) {
        let total = 0;
        sliders.forEach(s => total += parseInt(s.value));
        
        let remaining = 100 - parseInt(changedSlider.value);
        let otherSliders = sliders.filter(s => s !== changedSlider);

        if (otherSliders.length > 0) {
            let otherTotal = total - parseInt(changedSlider.value);
            if(otherTotal === 0) { // Avoid division by zero
                otherSliders.forEach(s => s.value = Math.floor(remaining / otherSliders.length));
            } else {
                 otherSliders.forEach(s => {
                    s.value = Math.round((parseInt(s.value) / otherTotal) * remaining);
                });
            }
        }
        
        // Final check to ensure sum is 100
        let finalTotal = 0;
        sliders.forEach(s => finalTotal += parseInt(s.value));
        let deficit = 100 - finalTotal;
        if(deficit !== 0 && sliders[0]) sliders[0].value = parseInt(sliders[0].value) + deficit;
        
        sliders.forEach((s, i) => {
            valueSpans[i].textContent = s.value;
        });
        
        let displayTotal = 0;
        sliders.forEach(s => displayTotal += parseInt(s.value));
        totalDisplay.textContent = `Total: ${displayTotal}%`;
        totalDisplay.style.color = displayTotal === 100 ? 'var(--acr3-color-verde)' : 'var(--acr3-color-rojo)';
    }

    sliders.forEach(slider => {
        slider.addEventListener('input', () => updateSliders(slider));
    });
});