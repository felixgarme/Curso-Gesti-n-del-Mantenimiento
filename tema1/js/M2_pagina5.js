// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M2_pagina6.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M2_pagina4.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M2_pagina5.html");

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
    // LÓGICA COMPONENTE 9: TRANSACCIONES SAP PM
    // =========================================================================
    const terminalInputBtns = document.querySelectorAll('.terminal-input button');
    const terminalOutput = document.getElementById('terminal-output');

    if (terminalInputBtns.length > 0) {
        terminalInputBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const info = btn.dataset.info;
                const command = btn.textContent;
                terminalOutput.textContent = `> ${command}\n  Función: ${info}`;
            });
        });
    }
    
    // Lógica del Quiz de Transacciones
    const transactionQuizOptions = document.querySelectorAll('.transaction-quiz .quiz-option');
    const transactionQuizFeedback = document.querySelector('.transaction-quiz .quiz-feedback');
    if(transactionQuizOptions.length > 0) {
        transactionQuizOptions.forEach(option => {
            option.addEventListener('click', () => {
                const isCorrect = option.dataset.correct === 'true';
                transactionQuizOptions.forEach(btn => btn.disabled = true);
                if(isCorrect) {
                    option.classList.add('correct');
                    transactionQuizFeedback.textContent = "¡Correcto! IW39 es la transacción para reportes y listados.";
                    transactionQuizFeedback.style.color = '#28a745';
                } else {
                    option.classList.add('incorrect');
                    transactionQuizFeedback.textContent = "Incorrecto. La transacción para reportes es IW39.";
                    transactionQuizFeedback.style.color = 'var(--color-rojo)';
                    document.querySelector('.transaction-quiz .quiz-option[data-correct="true"]').classList.add('correct');
                }
            });
        });
    }

    // =========================================================================
    // LÓGICA COMPONENTE 10: EJEMPLO PRÁCTICO
    // =========================================================================
    const codeBtns = document.querySelectorAll('.code-btn');
    const codeDetailsDisplay = document.querySelector('.code-details-display p');

    const exampleData = {
        'tipo-orden': { title: 'Tipo de Orden', value: 'PM01 (Correctivo)' },
        'prioridad': { title: 'Prioridad', value: '2 (Alta)' },
        'ubicacion': { title: 'Ubicación Técnica', value: 'PLT-L2-BOMB01' },
        'equipo': { title: 'Equipo', value: 'EQ00014567' },
        'causa': { title: 'Código de Causa', value: 'CS01' },
        'dano': { title: 'Código de Daño', value: 'DM02' },
        'actividad': { title: 'Código de Actividad', value: 'AC05' }
    };
    
    if (codeBtns.length > 0) {
        codeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                codeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const codeKey = btn.dataset.code;
                const data = exampleData[codeKey];
                
                codeDetailsDisplay.style.opacity = 0;
                setTimeout(() => {
                    codeDetailsDisplay.innerHTML = `<strong>${data.title}:</strong> <span>${data.value}</span>`;
                    codeDetailsDisplay.style.opacity = 1;
                }, 200);
            });
        });
    }

    // Lógica del Quiz de Ejemplo
    const exampleQuizOptions = document.querySelectorAll('.example-quiz .quiz-option');
    const exampleQuizFeedback = document.querySelector('.example-quiz .quiz-feedback');
    if(exampleQuizOptions.length > 0) {
        exampleQuizOptions.forEach(option => {
            option.addEventListener('click', () => {
                 const isCorrect = option.dataset.correct === 'true';
                exampleQuizOptions.forEach(btn => btn.disabled = true);
                if(isCorrect) {
                    option.classList.add('correct');
                    exampleQuizFeedback.textContent = "¡Exacto! Una parada de producción requiere una orden correctiva y una prioridad urgente.";
                    exampleQuizFeedback.style.color = '#28a745';
                } else {
                    option.classList.add('incorrect');
                    exampleQuizFeedback.textContent = "Respuesta incorrecta. Al ser una falla crítica no planificada, es una orden correctiva de prioridad máxima.";
                    exampleQuizFeedback.style.color = 'var(--color-rojo)';
                    document.querySelector('.example-quiz .quiz-option[data-correct="true"]').classList.add('correct');
                }
            });
        });
    }
});