// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M2_pagina2.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M2_inicio.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M2_pagina1.html");

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
    // LÓGICA PARA EL COMPONENTE 3: ESTRUCTURA ORDEN DE TRABAJO
    // =========================================================================
    
    const woTabBtns = document.querySelectorAll('.wo-tab-btn');
    const woContents = document.querySelectorAll('.wo-content');
    const tabSlider = document.querySelector('.wo-tab-slider');

    function updateSlider(activeBtn) {
        if (!tabSlider) return;
        tabSlider.style.width = `${activeBtn.offsetWidth}px`;
        tabSlider.style.left = `${activeBtn.offsetLeft}px`;
    }

    if (woTabBtns.length > 0) {
        // Inicializar el slider
        const initialActiveBtn = document.querySelector('.wo-tab-btn.active');
        if (initialActiveBtn) {
            updateSlider(initialActiveBtn);
        }
        
        woTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                woTabBtns.forEach(b => b.classList.remove('active'));
                woContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(targetId).classList.add('active');
                updateSlider(btn);
            });
        });
    }

    // Lógica del Mini-Ejercicio Drag & Drop (con soporte táctil)
    const dragItems = document.querySelectorAll('.wo-drag-item');
    const dropZones = document.querySelectorAll('.wo-drop-zone');
    const feedbackEl = document.querySelector('.wo-quiz-feedback');
    const dragItemsContainer = document.querySelector('.wo-drag-items');
    let draggedItem = null;
    let correctDrops = 0;

    // --- Eventos de Escritorio ---
    dragItems.forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => item.classList.add('dragging'), 0);
        });
        item.addEventListener('dragend', () => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        });

        // --- Eventos Táctiles ---
        item.addEventListener('touchstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
        }, { passive: true });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });
        zone.addEventListener('drop', e => {
            e.preventDefault();
            handleDrop(zone);
        });

        // --- Eventos Táctiles ---
        zone.addEventListener('touchmove', e => {
            e.preventDefault(); // Previene el scroll
            const touch = e.touches[0];
            const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);
            if(elementUnder && elementUnder.closest('.wo-drop-zone') === zone){
                 zone.classList.add('drag-over');
            } else {
                 zone.classList.remove('drag-over');
            }
        });
        zone.addEventListener('touchend', e => {
            const touch = e.changedTouches[0];
            const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);
            if(elementUnder && elementUnder.closest('.wo-drop-zone') === zone){
                handleDrop(zone);
            }
            dropZones.forEach(z => z.classList.remove('drag-over'));
            if(draggedItem) draggedItem.classList.remove('dragging');
            draggedItem = null;
        });
    });

    function shuffleDragItems() {
        if (!dragItemsContainer) return;
        // Solo baraja los elementos que no han sido colocados correctamente
        const itemsToShuffle = Array.from(dragItemsContainer.querySelectorAll('.wo-drag-item:not(.correct)'));
        
        // Algoritmo Fisher-Yates para barajar
        for (let i = itemsToShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [itemsToShuffle[i], itemsToShuffle[j]] = [itemsToShuffle[j], itemsToShuffle[i]];
        }

        // Vuelve a añadir los elementos barajados al contenedor
        itemsToShuffle.forEach(item => dragItemsContainer.appendChild(item));
    }

    function handleDrop(zone) {
        if (!draggedItem || zone.classList.contains('correct')) return;

        zone.classList.remove('drag-over');
        if (zone.dataset.zone === draggedItem.dataset.match) {
            // Correcto
            feedbackEl.textContent = "¡Bien hecho! Concepto ubicado correctamente.";
            feedbackEl.style.color = '#28a745';
            zone.innerHTML = `✓ ${draggedItem.textContent}`;
            zone.classList.add('correct');
            draggedItem.classList.add('correct');
            draggedItem.setAttribute('draggable', 'false');
            correctDrops++;
            if (correctDrops === dragItems.length) {
                feedbackEl.textContent = "¡Excelente! Has organizado la OT correctamente.";
            }
        } else {
            // Incorrecto
            zone.classList.add('incorrect');
            feedbackEl.textContent = "Incorrecto. Los conceptos se han reorganizado. ¡Intenta de nuevo!";
            feedbackEl.style.color = 'var(--color-rojo)';
            shuffleDragItems();
            setTimeout(() => {
                zone.classList.remove('incorrect');
                if (correctDrops < dragItems.length) {
                    feedbackEl.textContent = "";
                }
            }, 2000);
        }
    }
});