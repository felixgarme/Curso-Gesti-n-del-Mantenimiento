// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina5.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina3.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina4.html");

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
    // LÓGICA DE INTERACTIVOS
    // =========================================================================

    // --- Interactivo 1: Tarjeta Reveladora ---
    const revealCard = document.getElementById('revealCard');
    if (revealCard) {
        revealCard.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => revealCard.classList.toggle('flipped'));
        });
    }

    // --- Interactivo 2: Línea de Tiempo del Proceso ---
    const timelineItems = document.querySelectorAll('.process-timeline-item');
    const descriptionPanel = document.querySelector('.process-description-panel');
    const timelineProgress = document.querySelector('.process-timeline-progress');
    const processData = {
        '1': '<h4>1. Entender y Definir</h4><p>Si no puede describirlo de manera simple, no entiende el problema. Se puede realizar una lluvia de ideas (diagrama causa-efecto) para explorar, sin descartar nada inicialmente.</p>',
        '2': '<h4>2. Preguntar Sucesivamente</h4><p>Una vez identificadas las causas probables, preguntar "¿Por qué es así?" al menos 5 veces. Esto reta al equipo a buscar a fondo y no conformarse. A veces se necesitarán más de 5 preguntas.</p>',
        '3': '<h4>3. Enfocarse en el Proceso</h4><p>Durante este tiempo se debe tener cuidado de no preguntar "¿Quién?". El equipo está interesado en el proceso y no en las personas involucradas para evitar una cultura de culpa.</p>',
        '4': '<h4>4. Analizar y Verificar</h4><p>Continúe hasta que se vislumbre una solución creativa posible. Luego, analice e interprete los resultados. Verifique la lógica leyendo el análisis de forma invertida.</p>'
    };
    if (timelineItems.length > 0 && descriptionPanel) {
        timelineItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Actualizar estado activo
                timelineItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Actualizar panel de descripción
                const step = item.dataset.step;
                descriptionPanel.innerHTML = processData[step];

                // Actualizar barra de progreso
                if (timelineProgress) {
                    const progressPercentage = timelineItems.length > 1 ? (index / (timelineItems.length - 1)) * 100 : 0;
                    timelineProgress.style.width = `${progressPercentage}%`;
                }
            });
        });
        // Activar el primer elemento por defecto
        timelineItems[0].click();
    }

    // --- Interactivo 3: Simulador de Conversación ---
    const nextStepBtn = document.getElementById('next-step-btn');
    const inverseBtn = document.getElementById('inverse-btn');
    const log = document.getElementById('conversation-log');
    let simStep = 0;
    const simData = [
        { q: '¿Por qué se ha parado la máquina?', a: 'Saltó el fusible debido a una sobrecarga.' },
        { q: '¿Por qué hubo una sobrecarga?', a: 'Atascamiento por lubricación inadecuada de los cojinetes.' },
        { q: '¿Por qué la lubricación era inadecuada?', a: 'La bomba de lubricación no funcionaba bien.' },
        { q: '¿Por qué no funcionaba bien la bomba de lubricación?', a: 'El eje de la bomba estaba gastado.' },
        { q: '¿Por qué el eje de la bomba estaba gastado?', a: 'Había entrado suciedad dentro de la bomba.' },
        { q: '¿Por qué había suciedad en el aceite de la bomba?', a: 'No había filtro, lo que permitió el paso de partículas.' },
    ];
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            if (simStep >= simData.length) return; // Prevenir clics extra

            // Añadir pregunta
            const questionDiv = document.createElement('div');
            questionDiv.className = 'log-entry question';
            questionDiv.innerHTML = simData[simStep].q;
            log.appendChild(questionDiv);
            log.scrollTop = log.scrollHeight;

            // Añadir respuesta después de un retardo
            setTimeout(() => {
                const answerDiv = document.createElement('div');
                answerDiv.className = 'log-entry answer';
                answerDiv.innerHTML = simData[simStep].a;
                log.appendChild(answerDiv);
                log.scrollTop = log.scrollHeight;

                simStep++; // Incrementar el paso solo después de que aparezca la respuesta

                // Comprobar si es el final
                if (simStep === simData.length) {
                    setTimeout(() => { // Pequeño retardo para el mensaje final
                        const causaDiv = document.createElement('div');
                        causaDiv.className = 'log-entry question';
                        causaDiv.innerHTML = `<strong>CAUSA RAÍZ:</strong> Falta de filtro en el sistema de lubricación.`;
                        log.appendChild(causaDiv);
                        log.scrollTop = log.scrollHeight;

                        // Añadir solución después de otro retardo
                        setTimeout(() => {
                            const solucionDiv = document.createElement('div');
                            solucionDiv.className = 'log-entry question'; // Usar estilo 'question' para que resalte
                            solucionDiv.style.color = '#6ee7b7'; // Verde para la solución
                            solucionDiv.innerHTML = `<strong>SOLUCIÓN:</strong> Instalar un filtro nuevo de lubricación.`;
                            log.appendChild(solucionDiv);
                            log.scrollTop = log.scrollHeight;

                            nextStepBtn.textContent = 'Análisis Completo';
                            nextStepBtn.disabled = true;
                            inverseBtn.disabled = false;
                        }, 1000);
                    }, 1000);
                }
            }, 800);
        });

        inverseBtn.addEventListener('click', () => {
            log.appendChild(document.createElement('hr'));
            const titleDiv = document.createElement('div');
            titleDiv.className = 'log-entry question';
            titleDiv.innerHTML = '<strong>Verificación Inversa:</strong>';
            log.appendChild(titleDiv);

            const inverseChain = [
                "No había filtro (paso de partículas) ➔ ¿causó qué?",
                "Entró suciedad en la bomba ➔ ¿causó qué?",
                "El eje de la bomba estaba gastado ➔ ¿causó qué?",
                "La bomba de lubricación no funcionaba bien ➔ ¿causó qué?",
                "Lubricación inadecuada de los cojinetes ➔ ¿causó qué?",
                "Sobrecarga ➔ ¿causó qué?",
                "Máquina parada (EVENTO)"
            ];
            inverseChain.forEach((item, i) => {
                setTimeout(() => {
                    const inverseDiv = document.createElement('div');
                    inverseDiv.className = 'log-entry answer';
                    inverseDiv.innerHTML = item;
                    log.appendChild(inverseDiv);
                    log.scrollTop = log.scrollHeight;
                }, (i + 1) * 800);
            });
            inverseBtn.disabled = true;
        }, { once: true });
    }
    
    // --- Interactivo 4: Balanza ---
    const balanceBeam = document.querySelector('.balance-beam');
    const balanceContent = document.querySelector('.balance-content-area');
    const balanceBtns = document.querySelectorAll('.btn-toggle');
    const leftPan = document.querySelector('.balance-pan.left');
    const rightPan = document.querySelector('.balance-pan.right');
    const balanceData = {
        left: '<h4>✓ Fortalezas</h4><ul><li>Fácil de aplicar y entender.</li><li>Proceso rápido para problemas simples.</li><li>No requiere conocimiento extenso.</li><li>No requiere mucha capacitación</li></ul>',
        right: '<h4>✗ Debilidades</h4><ul><li>Solo apto para situaciones sencillas.</li><li>Depende del conocimiento del equipo.</li><li>Posible incertidumbre sobre la causa raíz real.</li><li>Los resultados pueden no ser repetibles por falta de evidencia.</li></ul>'
    };
    if (balanceBeam) {
        balanceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const side = btn.dataset.side;
                balanceBeam.style.transform = side === 'left' ? 'rotate(-5deg)' : 'rotate(5deg)';
                balanceContent.innerHTML = balanceData[side];

                // Añadir clases para estilizar el contenido y los platillos
                balanceContent.className = 'balance-content-area'; // Reset
                balanceContent.classList.add(side === 'left' ? 'strengths' : 'weaknesses');
                if (leftPan && rightPan) {
                    leftPan.classList.toggle('active', side === 'left');
                    rightPan.classList.toggle('active', side === 'right');
                }

                balanceBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        balanceBtns[0].click();
    }

    // --- Interactivo 5: Constructor de Cadenas ---
    const chainOptionsContainer = document.querySelector('.chain-options');
    const chainLinksContainer = document.querySelector('.chain-links');
    const chainFeedback = document.querySelector('.chain-feedback');
    let currentChainStep = 0;
    const chainData = [
        { id: 0, text: 'La batería está descargada.' },
        { id: 1, text: 'El alternador no funciona.' },
        { id: 2, text: 'Se rompió la correa del alternador.' }
    ];
    const rootCauseText = "Causa Raíz: La correa superó su vida útil y necesita reemplazo.";

    if (chainOptionsContainer && chainLinksContainer && chainFeedback) {
        // Desordenar y crear opciones
        [...chainData].sort(() => Math.random() - 0.5).forEach(item => {
            const option = document.createElement('button');
            option.className = 'chain-option';
            option.dataset.id = item.id;
            option.textContent = item.text;
            chainOptionsContainer.appendChild(option);
        });

        document.querySelectorAll('.chain-option').forEach(option => {
            option.addEventListener('click', () => {
                if (parseInt(option.dataset.id) === currentChainStep) {
                    // Correcto
                    const newLink = document.createElement('div');
                    newLink.className = 'chain-link correct';
                    newLink.textContent = option.textContent;
                    chainLinksContainer.appendChild(newLink);
                    
                    option.classList.add('disabled');
                    option.disabled = true;
                    currentChainStep++;

                    chainFeedback.textContent = "¡Correcto! Sigue así.";
                    chainFeedback.className = 'chain-feedback visible correct';

                    if (currentChainStep === chainData.length) {
                        // Cadena completada
                        setTimeout(() => {
                            const rootCauseLink = document.createElement('div');
                            rootCauseLink.className = 'chain-link root-cause';
                            rootCauseLink.textContent = rootCauseText;
                            chainLinksContainer.appendChild(rootCauseLink);

                            chainFeedback.textContent = "¡Felicidades! Has encontrado la causa raíz.";
                        }, 500);
                    }
                } else {
                    // Incorrecto
                    option.classList.add('incorrect');
                    chainFeedback.textContent = "Incorrecto. Esa no es la siguiente causa en la cadena.";
                    chainFeedback.className = 'chain-feedback visible incorrect';
                    setTimeout(() => {
                        option.classList.remove('incorrect');
                        // Ocultar el feedback incorrecto después de un tiempo
                        if (chainFeedback.classList.contains('incorrect')) {
                            chainFeedback.classList.remove('visible');
                        }
                    }, 1500);
                }
            });
        });
    }
});