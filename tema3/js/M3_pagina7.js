// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina8_1.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina6.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina7.html");

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
    // LÓGICA DEL EXPLORADOR DE PROCESO CÍCLICO
    // =========================================================================
    const quadrants = document.querySelectorAll('.diagram-quadrant');
    const contentDisplay = document.getElementById('process-content-display');

    const processData = {
        '1': {
            title: '1. Preparar el análisis',
            html: `<ul><li>Definir el Problema o Evento a Evitar.</li><li>Estimar el impacto del evento en el negocio e identificar las oportunidades.</li><li>Recabar información del equipo y su función en el proceso.</li></ul>`
        },
        '2': {
            title: '2. Recabar la información del evento',
            html: `<ul><li>Establecer el equipo natural de trabajo.</li><li>Levantar la información, las evidencias y la secuencia de evento.</li></ul>`
        },
        '3': {
            title: '3. Armar la lógica deductiva',
            html: `<ul><li>Representar la lógica de lo no deseado, donde se muestran todos los factores causales en sus tres niveles de fallas: falla del componente (elemento físico), el error humano y las causas raíces.</li></ul>`
        },
        '4': {
            title: '4. Establecer el plan de acción',
            html: `<ul><li>Eliminar las causas raíz identificadas a través de la ejecución de las acciones.</li><li>Establecer un sistema de medición, para evaluar el logro de las acciones.</li><li>Realizar ajustes y mejoras.</li></ul>`
        }
    };

    function updateContent(stepKey) {
        const data = processData[stepKey];
        if (data) {
            contentDisplay.innerHTML = `<div class="content-block"><h4>${data.title}</h4>${data.html}</div>`;
        }
    }

    if (quadrants.length > 0) {
        quadrants.forEach(quadrant => {
            quadrant.addEventListener('click', () => {
                quadrants.forEach(q => q.classList.remove('active'));
                quadrant.classList.add('active');
                updateContent(quadrant.dataset.step);
            });
        });
        // Activar el primer paso por defecto
        quadrants[0].click();
    }
    
    // =========================================================================
    // LÓGICA DEL MINI-EJERCICIO DE SECUENCIACIÓN
    // =========================================================================
    const taskDescriptionEl = document.getElementById('task-description');
    const placeholders = document.querySelectorAll('.step-placeholder');
    const feedbackEl = document.querySelector('.builder-feedback');
    let currentTaskIndex = 0;

    const quizTasks = [
        { description: "Se define el problema a evitar y se estima su impacto en el negocio.", correctStep: 1 },
        { description: "Se representan todos los factores causales (físicos, humanos, etc.) en un diagrama.", correctStep: 3 },
        { description: "Se establece un sistema de medición para evaluar el logro de las acciones.", correctStep: 4 },
        { description: "Se levantan las evidencias y la secuencia del evento con el equipo de trabajo.", correctStep: 2 }
    ];

    function renderTask() {
        if (currentTaskIndex >= quizTasks.length) {
            taskDescriptionEl.textContent = "¡Felicidades! Has ordenado todo el proceso.";
            placeholders.forEach(p => p.disabled = true);
            feedbackEl.textContent = "¡Proceso completado con éxito!";
            feedbackEl.style.color = '#28a745';
            return;
        }
        taskDescriptionEl.textContent = quizTasks[currentTaskIndex].description;
    }

    if(placeholders.length > 0) {
        placeholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => {
                if (placeholder.classList.contains('correct')) return;

                const selectedStep = parseInt(placeholder.dataset.step);
                if (selectedStep === quizTasks[currentTaskIndex].correctStep) {
                    placeholder.classList.add('correct');
                    placeholder.innerHTML = '✓';
                    feedbackEl.textContent = '¡Correcto! Siguiente tarea...';
                    feedbackEl.style.color = '#28a745';
                    currentTaskIndex++;
                    setTimeout(renderTask, 1500);
                } else {
                    placeholder.classList.add('incorrect');
                    feedbackEl.textContent = 'Incorrecto. Esa tarea no pertenece a este paso.';
                    feedbackEl.style.color = 'var(--color-rojo)';
                    setTimeout(() => placeholder.classList.remove('incorrect'), 1000);
                }
            });
        });
        renderTask(); // Iniciar la primera tarea
    }
});