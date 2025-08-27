// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M1_pagina2.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M1_inicio.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M1_pagina1.html");

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

    // Lógica para las Pestañas (Tabs)
    const tabContainer = document.querySelector('.tabs-container');
    if (tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabPanes = tabContainer.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tabPanes.forEach(pane => {
                    if (pane.id === targetTab) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            });
        });
    }

    // Lógica para el Acordeón
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                // Opcional: Cerrar otros acordeones al abrir uno nuevo
                // accordionItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.classList.remove('active');
                //     }
                // });
                item.classList.toggle('active');
            });
        });
    }

    // Lógica para el Modal
    const modalTrigger = document.getElementById('modal-trigger-btn');
    const modalOverlay = document.getElementById('info-modal');
    const closeModalBtn = modalOverlay ? modalOverlay.querySelector('.close-modal') : null;

    if (modalTrigger && modalOverlay && closeModalBtn) {
        modalTrigger.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });

        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Cerrar el modal al hacer clic fuera del contenido
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Lógica para revelar secciones al hacer scroll
    const sectionsToReveal = document.querySelectorAll('.reveal-on-scroll');

    if (sectionsToReveal.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Cuando el elemento es visible en el viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Dejar de observar el elemento una vez que la animación se ha disparado
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // La animación se dispara cuando al menos el 10% del elemento es visible
        });

        sectionsToReveal.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});
