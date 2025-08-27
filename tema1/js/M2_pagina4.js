// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M2_pagina5.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M2_pagina3.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M2_pagina4.html");

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
    // LÓGICA COMPONENTE 6: CÓDIGOS DE UBICACIÓN Y EQUIPO
    // =========================================================================
    const flipCards = document.querySelectorAll('.le-flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // =========================================================================
    // LÓGICA COMPONENTE 7: CÓDIGOS DE CAUSA, DAÑO Y ACTIVIDAD
    // =========================================================================
    const accordionHeaders = document.querySelectorAll('.cda-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.classList.toggle('visible');
            // Opcional: cerrar otros acordeones al abrir uno
            accordionHeaders.forEach(otherHeader => {
                if(otherHeader !== header) {
                    otherHeader.nextElementSibling.classList.remove('visible');
                }
            });
        });
    });

    // Lógica del Mini-Ejercicio de Escenario
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    const scenarioFeedback = document.querySelector('.scenario-feedback p');
    if (scenarioBtns.length > 0) {
        scenarioBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = btn.dataset.answer;
                const type = btn.textContent.replace('Revelar ', '');
                scenarioFeedback.innerHTML = `La <strong>${type}</strong> en este caso es: "<em>${answer}</em>"`;
            });
        });
    }

    // =========================================================================
    // LÓGICA COMPONENTE 8: BENEFICIOS DE USO CORRECTO DE CÓDIGOS
    // =========================================================================
    const benefitItems = document.querySelectorAll('.benefits-list li');
    if (benefitItems.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añadir la clase .visible con un pequeño retraso escalonado
                    const items = Array.from(entry.target.children);
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150); // 150ms de retraso entre cada item
                    });
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, { threshold: 0.2 }); // Se activa cuando el 20% del contenedor es visible

        observer.observe(document.querySelector('.benefits-list'));
    }

});