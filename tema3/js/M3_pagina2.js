// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina3.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina1.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina2.html");

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

    const processSteps = document.querySelectorAll('.process-step');
    const titleEl = document.getElementById('process-title');
    const detailsEl = document.getElementById('process-details');

    const processData = {
        '1': { title: '1. Completar y Archivar el Informe', details: 'Complete y archive el Informe de resolución de quejas de clientes de 8D. Este documento es la base para todas las acciones futuras y el análisis histórico.' },
        '2': { title: '2. Monitorear Acciones', details: 'Continuar monitoreando las acciones correctivas y preventivas, así como el proceso en sí, para identificar oportunidades de mejora adicionales y prevenir futuras quejas de los clientes.' },
        '3': { title: '3. Revisar Regularmente', details: 'De forma regular (por ejemplo, anualmente), revise todos los Informes de resolución de quejas de los clientes para comprender mejor las quejas más comunes.' },
        '4': { title: '4. Identificar Oportunidades', details: 'Esta revisión podría ayudar a una organización a identificar problemas potenciales del sistema, brechas en los procesos u otros problemas, así como a identificar oportunidades adicionales de mejora.' }
    };

    function updatePanel(stepKey) {
        const data = processData[stepKey];
        if (data) {
            titleEl.textContent = data.title;
            detailsEl.style.opacity = 0;
            setTimeout(() => {
                detailsEl.textContent = data.details;
                detailsEl.style.opacity = 1;
            }, 250);
        }
    }

    if (processSteps.length > 0) {
        processSteps.forEach(step => {
            step.addEventListener('click', () => {
                processSteps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
                updatePanel(step.dataset.step);
            });
        });
        processSteps[0].click();
    }
    
    const imageContainer = document.querySelector('.process-image-container');
    const modal = document.getElementById('image-modal');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    if (imageContainer && modal) {
        imageContainer.addEventListener('click', (e) => { e.preventDefault(); modal.classList.add('visible'); });
        closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('visible'); });
    }

    const quizSelect = document.getElementById('quiz-select');
    const quizFeedback = document.querySelector('.report-quiz-container .quiz-feedback');
    const correctAnswer = "step2"; // Monitorear Acciones es la más urgente

    if(quizSelect) {
        quizSelect.addEventListener('change', () => {
            const selectedValue = quizSelect.value;
            
            if (selectedValue === "") {
                quizFeedback.textContent = "";
                return;
            }

            // Deshabilitar para evitar cambios
            quizSelect.disabled = true;

            if(selectedValue === correctAnswer) {
                quizFeedback.textContent = "¡Correcto! Monitorear y contener el problema es la acción más urgente para proteger a otros clientes.";
                quizFeedback.style.color = '#28a745';
            } else {
                quizFeedback.textContent = "Incorrecto. La acción más urgente es 'Monitorear Acciones' para contener el problema y evitar que se extienda.";
                quizFeedback.style.color = 'var(--color-rojo)';
            }
        });
    }
});