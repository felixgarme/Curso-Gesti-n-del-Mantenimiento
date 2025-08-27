// Funciones de navegación y SCORM
function goToNextPage() {
    // Redirigir a la siguiente página
    window.location.href = 'M2_pagina3.html';
}

function backPage() {
    // Redirigir a la página anterior
    window.location.href = 'M2_pagina1.html';
}

// Iniciar SCORM
ScormManager.init();

// Guardar progreso de esta página
ScormManager.guardarProgreso("M2_pagina2.html");

// Recuperar progreso para la barra
document.addEventListener("DOMContentLoaded", () => {
    const progreso = ScormManager.cargarProgreso();
    const porcentaje = progreso.score ? parseInt(progreso.score) : 0;

    const barra = document.getElementById("progreso-barra");
    const texto = document.getElementById("progreso-texto");

    barra.style.width = porcentaje + "%";
    texto.textContent = porcentaje + "%";
});

/* Interactivo */
document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // LÓGICA PARA EL COMPONENTE 5: CICLO DE VIDA (DISEÑO MEJORADO)
    // =========================================================================
    const stages = document.querySelectorAll('.lifecycle-stage');
    const panel = document.getElementById('lifecycle-description-panel');
    const titleEl = document.getElementById('lifecycle-title');
    const detailsEl = document.getElementById('lifecycle-details');

    const stageData = {
        creacion: {
            title: "1. Creación",
            details: "Se genera la orden con base en avisos o la planificación existente."
        },
        planificacion: {
            title: "2. Planificación",
            details: "Se definen los recursos materiales, el personal técnico y los tiempos estimados."
        },
        liberacion: {
            title: "3. Liberación",
            details: "La orden es aprobada formalmente y queda lista para que el equipo técnico comience a trabajar en ella."
        },
        ejecucion: {
            title: "4. Ejecución",
            details: "El equipo técnico realiza los trabajos en campo según lo especificado en la orden."
        },
        confirmacion: {
            title: "5. Confirmación",
            details: "Se registran en el sistema los tiempos reales invertidos y los materiales o repuestos que fueron utilizados."
        },
        cierre: {
            title: "6. Cierre",
            details: "Se finaliza la orden. El cierre técnico confirma que el trabajo está hecho y el contable liquida todos los costos."
        }
    };

    if (stages.length > 0) {
        stages.forEach((stage) => {
            stage.addEventListener('click', () => {
                const stageKey = stage.dataset.stage;

                // Actualizar contenido del panel
                titleEl.textContent = stageData[stageKey].title;
                detailsEl.textContent = stageData[stageKey].details;

                // Actualizar clases activas
                stages.forEach((s) => s.classList.remove('active'));
                stage.classList.add('active');

                // Ahora el panel siempre está debajo, solo necesitamos hacerlo visible.
                panel.classList.add('visible');
            });
        });

        // Activar el primero por defecto (Liberación)
        stages[2].click();
    }

    // Mini-Ejercicio de Secuenciación
    const lifecycleQuizData = [
        { id: 'creacion', text: 'Creación' },
        { id: 'planificacion', text: 'Planificación' },
        { id: 'liberacion', text: 'Liberación' },
        { id: 'ejecucion', text: 'Ejecución' },
        { id: 'confirmacion', text: 'Confirmación' },
        { id: 'cierre', text: 'Cierre técnico y contable' }
    ];

    const lifecycleDropArea = document.getElementById('lifecycle-drop-area');
    const lifecycleDragItemsContainer = document.getElementById('lifecycle-drag-items');
    const lifecycleFeedback = document.getElementById('lifecycle-quiz-feedback');

    if (lifecycleDropArea) {
        // Desordenar y crear items arrastrables
        const shuffledItems = [...lifecycleQuizData].sort(() => Math.random() - 0.5);
        shuffledItems.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'lifecycle-drag-item';
            div.draggable = true;
            div.dataset.id = item.id;
            div.textContent = item.text;
            lifecycleDragItemsContainer.appendChild(div);
        });

        // Crear zonas de drop
        lifecycleQuizData.forEach((_, index) => {
            const div = document.createElement('div');
            div.className = 'lifecycle-drop-zone';
            div.dataset.index = index;
            div.innerHTML = `<span>${index + 1}</span>`;
            lifecycleDropArea.appendChild(div);
        });

        const lifecycleDragItems = document.querySelectorAll('.lifecycle-drag-item');
        const lifecycleDropZones = document.querySelectorAll('.lifecycle-drop-zone');

        // Eventos de arrastre
        lifecycleDragItems.forEach((item) => {
            item.addEventListener('dragstart', () => {
                item.classList.add('dragging');
            });
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });

        // Eventos de soltar
        lifecycleDropZones.forEach((zone) => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const draggingItem = document.querySelector('.lifecycle-drag-item.dragging');
                if (draggingItem && zone.children.length === 1) {
                    zone.appendChild(draggingItem);
                    checkLifecycleOrder();
                }
            });
        });

        // Verificación del orden
        function checkLifecycleOrder() {
            const droppedItems = lifecycleDropArea.querySelectorAll('.lifecycle-drag-item');
            if (droppedItems.length !== lifecycleQuizData.length) return;

            const isCorrect = droppedItems.every((item, index) => {
                return item.dataset.id === lifecycleQuizData[index].id;
            });

            if (isCorrect) {
                lifecycleFeedback.textContent = "¡Felicidades! Has ordenado el ciclo correctamente.";
                lifecycleFeedback.style.color = '#28a745';
                lifecycleDropZones.forEach((zone) => zone.classList.add('correct'));
            } else {
                lifecycleFeedback.textContent = "El orden no es correcto. Inténtalo de nuevo.";
                lifecycleFeedback.style.color = 'var(--color-rojo)';
            }
        }
    }
});