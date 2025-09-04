// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina8.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina8_1.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina8_2.html");

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
    // --- LÓGICA DE ANIMACIÓN POR SCROLL ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.acr-animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- INTERACTIVO 1: SIMULADOR DE PROCESO GUIADO ---
    const processStepsCards = document.querySelectorAll('.acr-step-card');
    const processImageSim = document.getElementById('acr-process-image-sim');
    const simImages = [
        '../assets/images/M3_pagina8_2/step01.png',
        '../assets/images/M3_pagina8_2/step02.png',
        '../assets/images/M3_pagina8_2/step02.png'
    ];

    function updateSimulator(step) {
        processStepsCards.forEach(card => {
            card.classList.toggle('active', parseInt(card.dataset.step) === step);
        });
        processImageSim.style.opacity = '0';
        setTimeout(() => {
            processImageSim.src = simImages[step - 1];
            processImageSim.style.opacity = '1';
        }, 300);
    }

    if (processStepsCards.length > 0 && processImageSim) {
        processStepsCards.forEach(card => {
            card.addEventListener('click', () => {
                const step = parseInt(card.dataset.step);
                updateSimulator(step);
            });
        });
    }

    // --- INTERACTIVO 2: EXPLORADOR DE HIPÓTESIS CON HOTSPOTS ---
    const hotspots = document.querySelectorAll('.acr-hotspot');
    const hypothesisInfoPanel = document.getElementById('acr-hypothesis-info-panel');
    const hypothesisInfoContent = {
        'info-hip-1': '<h4>Proceso de Desarrollo</h4><p>Origine una tormenta de ideas que ayude a identificar y definir una posible causa del problema. Utilice la frase “Como puede Ocurrir”. Continúe bajando de nivel, hasta llegar al punto, donde el equipo de trabajo que ejecuta el análisis pueda tener Control o Influencia.</p>',
        'info-hip-2': '<h4>Verificación de Hipótesis</h4><p>Verifique las hipótesis a través de evidencias (físicas o registros), pruebas o análisis, para validarlas o rechazarlas e ir bajando esa rama de nivel en el árbol, o desestimarla y detenerla. Debe procurar bajar una rama a la vez.</p>',
        'info-hip-3': '<h4>Matriz de Validación</h4><p>Para la validación de las hipótesis, se emplea una matriz de validación, para trabajar de forma estructurada y sistemática. A continuación, un ejemplo:</p>' + 
        '<table class="acr-matrix-table"><thead><tr><th>Hipótesis</th><th>Validación</th><th>Status</th></tr></thead><tbody><tr><td>Falla X</td><td>Prueba A</td><td>Confirmada</td></tr><tr><td>Falla Y</td><td>Análisis B</td><td>Rechazada</td></tr></tbody></table>'
    };
    if (hypothesisInfoPanel) hypothesisInfoPanel.innerHTML = '<h4 style="text-align: center; font-style: italic; font-weight: 400;">Haga clic en un punto para ver la información.</h4>';
    hotspots.forEach(spot => {
        spot.addEventListener('click', () => {
            const targetId = spot.getAttribute('data-target');
            hypothesisInfoPanel.innerHTML = hypothesisInfoContent[targetId];
        });
    });

    // --- INTERACTIVO 3: CAPAS DE CAUSAS ---
    const layerBtns = document.querySelectorAll('.acr-layer-btn');
    const layers = document.querySelectorAll('.acr-layer');
    layerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            layerBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            layers.forEach(l => l.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
});