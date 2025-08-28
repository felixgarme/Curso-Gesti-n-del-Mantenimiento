// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina4.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina2.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina3.html");

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

    /**
     * Función auxiliar para desordenar los hijos de un elemento padre.
     */
    function shuffleChildren(parent) {
        if (!parent) return;
        let children = Array.from(parent.children);
        children.forEach(child => parent.removeChild(child));
        children.sort(() => Math.random() - 0.5);
        children.forEach(child => parent.appendChild(child));
    }

    // =========================================================================
    // LÓGICA PARA EL EJERCICIO 1: SELECCIÓN MÚLTIPLE (REDISEÑADO)
    // =========================================================================
    const mcOptionsContainer = document.querySelector('.mc-options-container');
    const mcFeedback = document.querySelector('.mc-feedback');

    if (mcOptionsContainer) {
        const mcOptions = mcOptionsContainer.querySelectorAll('.mc-option');
        shuffleChildren(mcOptionsContainer); // Aleatoriedad

        mcOptions.forEach(option => {
            // Quitar el estilo verde inicial
            option.classList.remove('is-correct-answer');

            option.addEventListener('click', () => {
                mcOptions.forEach(btn => btn.disabled = true);
                const isCorrect = option.dataset.correct === 'true';
                mcFeedback.classList.add('visible');

                if (isCorrect) {
                    option.classList.add('correct');
                    mcFeedback.classList.add('correct');
                    mcFeedback.innerHTML = `<p><strong>¡Correcto!</strong> El código PM02 corresponde al mantenimiento preventivo, que se usa para inspecciones y tareas programadas.</p>`;
                } else {
                    option.classList.add('incorrect');
                    mcFeedback.classList.add('incorrect');
                    mcFeedback.innerHTML = `<p><strong>Incorrecto.</strong> La respuesta correcta es PM02 (Mantenimiento Preventivo).</p>`;
                    const correctButton = mcOptionsContainer.querySelector('[data-correct="true"]');
                    correctButton.classList.add('correct');
                }
            });
        });
    }

    // =========================================================================
    // LÓGICA PARA EL EJERCICIO 2: EMPAREJAMIENTO (CON FLECHAS)
    // =========================================================================
    const matchingWrapper = document.querySelector('.matching-wrapper');
    const matchingFeedback = document.querySelector('.matching-feedback');
    const svgCanvas = document.querySelector('.matching-canvas');

    if (matchingWrapper && svgCanvas) {
        const leftColumn = matchingWrapper.querySelector('.matching-column-left');
        const rightColumn = matchingWrapper.querySelector('.matching-column-right');
        let selectedItem = null;
        let correctMatches = 0;
        const totalPairs = leftColumn.children.length;
        const connections = [];

        shuffleChildren(leftColumn);
        shuffleChildren(rightColumn);

        const allItems = matchingWrapper.querySelectorAll('.matching-item');
        allItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('matched-correct')) return;
                
                if (!selectedItem) {
                    if (rightColumn.contains(item)) return;
                    allItems.forEach(el => el.classList.remove('selected'));
                    item.classList.add('selected');
                    selectedItem = item;
                } else {
                    if (leftColumn.contains(item)) {
                        allItems.forEach(el => el.classList.remove('selected'));
                        item.classList.add('selected');
                        selectedItem = item;
                        return;
                    }
                    if (selectedItem.dataset.pairId === item.dataset.pairId) {
                        selectedItem.classList.add('matched-correct');
                        item.classList.add('matched-correct');
                        connections.push({ startEl: selectedItem, endEl: item });
                        drawAllConnections();
                        correctMatches++;
                        matchingFeedback.textContent = "¡Buena pareja!";
                        matchingFeedback.style.color = '#15803d';
                        if (correctMatches === totalPairs) {
                            matchingFeedback.textContent = "¡Excelente! Has emparejado todos los códigos correctamente.";
                        }
                    } else {
                        selectedItem.classList.add('matched-incorrect');
                        item.classList.add('matched-incorrect');
                        matchingFeedback.textContent = "Esa no es la descripción correcta. Intenta de nuevo.";
                        matchingFeedback.style.color = 'var(--color-rojo)';
                        setTimeout(() => {
                            selectedItem.classList.remove('matched-incorrect');
                            item.classList.remove('matched-incorrect');
                            matchingFeedback.textContent = "";
                        }, 1500);
                    }
                    selectedItem.classList.remove('selected');
                    selectedItem = null;
                }
            });
        });

        function drawAllConnections() {
            svgCanvas.innerHTML = ''; // Limpiar canvas
            const wrapperRect = matchingWrapper.getBoundingClientRect();
            
            connections.forEach(({ startEl, endEl }) => {
                const startRect = startEl.getBoundingClientRect();
                const endRect = endEl.getBoundingClientRect();

                // Calcular puntos relativos al contenedor
                const x1 = startRect.right - wrapperRect.left;
                const y1 = startRect.top - wrapperRect.top + startRect.height / 2;
                const x2 = endRect.left - wrapperRect.left;
                const y2 = endRect.top - wrapperRect.top + endRect.height / 2;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                svgCanvas.appendChild(line);
            });
        }

        // Usar ResizeObserver para redibujar las líneas si el contenedor cambia de tamaño
        const observer = new ResizeObserver(drawAllConnections);
        observer.observe(matchingWrapper);
    }
});