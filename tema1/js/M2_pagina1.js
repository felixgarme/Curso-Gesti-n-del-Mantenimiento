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

/*Interactivo*/
document.addEventListener("DOMContentLoaded", () => {
    // ---- LÓGICA DEL SELECTOR PRINCIPAL DE OBJETO ----
    const selectorCards = document.querySelectorAll(".selector-card");

    const updateDynamicContent = (selectedObject) => {
        const dynamicElements = document.querySelectorAll("[data-object]");
        dynamicElements.forEach(el => {
            if (el.dataset.object === selectedObject) {
                el.classList.add("visible");
            } else {
                el.classList.remove("visible");
            }
        });
    };

    selectorCards.forEach(card => {
        card.addEventListener("click", () => {
            const selectedObject = card.dataset.object;
            selectorCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            updateDynamicContent(selectedObject);
        });
    });

    // ---- LÓGICA DE LAS PESTAÑAS (TABS) ----
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabLinks.forEach(link => {
        link.addEventListener("click", () => {
            const targetTab = link.dataset.tab;
            
            tabLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            tabPanes.forEach(pane => {
                if (pane.id === targetTab) {
                    pane.classList.add("active");
                } else {
                    pane.classList.remove("active");
                }
            });
        });
    });

    // ---- LÓGICA DE LA ANATOMÍA DE DATOS ----
    const categoryButtons = document.querySelectorAll(".category-btn");
    const dataItems = document.querySelectorAll(".data-item");

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetCategory = button.dataset.category;

            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            dataItems.forEach(item => {
                if (item.dataset.category === targetCategory) {
                    item.classList.add("highlight");
                } else {
                    item.classList.remove("highlight");
                }
            });
        });
    });

    // ---- ESTADO INICIAL ----
    // Activa la primera card y su contenido al cargar la página
    if (selectorCards.length > 0) {
        updateDynamicContent(selectorCards[0].dataset.object);
    }
    // Activa la primera categoría de datos al cargar la página
    if (categoryButtons.length > 0) {
        categoryButtons[0].click();
    }
});