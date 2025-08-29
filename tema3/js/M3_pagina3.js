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
    // Inicializar secciones colapsables
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const header = section.querySelector('.section-header');

        // Abre la primera sección por defecto
        if (section.id === 'definition-section') {
            section.classList.add('active');
        }

        header.addEventListener('click', () => {
            // Simplemente alterna la clase 'active'. El CSS se encarga del resto.
            section.classList.toggle('active');
        });
    });
});

// Función global para los mini-ejercicios (quizzes)
function checkQuiz(quizName, correctAnswer, feedbackId) {
    const options = document.querySelectorAll(`input[name="${quizName}"]`);
    let selectedValue = null;
    options.forEach(option => {
        if (option.checked) {
            selectedValue = option.value;
        }
    });

    const feedbackElement = document.getElementById(feedbackId);

    if (selectedValue === null) {
        feedbackElement.textContent = 'Por favor, selecciona una opción.';
        feedbackElement.className = 'quiz-feedback'; // Limpiar clases previas
        return;
    }

    if (selectedValue === correctAnswer) {
        feedbackElement.textContent = '¡Correcto! Muy bien.';
        feedbackElement.className = 'quiz-feedback correct';
    } else {
        feedbackElement.textContent = 'Incorrecto. Revisa la información de la sección.';
        feedbackElement.className = 'quiz-feedback incorrect';
    }
}