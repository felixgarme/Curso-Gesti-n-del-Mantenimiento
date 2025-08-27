// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M2_inicio.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M1_pagina3.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M1_pagina4.html");

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
    // DATOS CENTRALIZADOS PARA LAS 8 DISCIPLINAS
    // =========================================================================
    const disciplineData = [
        { id: 'd1', title: "D1: Establecer el equipo de trabajo", points: ["Reunir al grupo de trabajo (quienes tengan el conocimiento y habilidad para atacar al problema).", "Designar al “Líder”, quien es la persona que monitoreará el progreso de la acción correctiva.", "Designar al “champion”, quien es la persona que tiene la autoridad para aprobar las acciones que identifique el grupo."] },
        { id: 'd2', title: "D2: Describir el problema", points: ["Usar una “definición operacional”.", "La definición debe tener un significado común para todos los que la lean.", "Es necesario responder ciertas preguntas que nos ayuden a clarificar al problema: ¿Qué? (Objeto/Defecto), ¿Dónde?, ¿Cuándo? (puntual/frecuente), ¿Qué tan grande es?"] },
        { id: 'd3', title: "D3: Desarrollar acciones interinas de contención", points: ["Definir e implementar acciones para contener y aislar el efecto del problema, hasta que la acción correctiva sea implementada.", "Nos podemos preguntar: ¿Qué se ha hecho para contener el problema?, ¿Qué pruebas se han efectuado para saber si la acción interina va a funcionar?, ¿Qué tan rápido se va a detener el problema? y ¿Qué más se puede hacer para contenerlo?"] },
        { id: 'd4', title: "D4: Identificar y verificar la causa raíz", points: ["Identificar todas las causas potenciales que podrían haber ocasionado el problema. A través de una metodología de RCA.", "Aísla y verifica la causa raíz, probando cada causa potencial a través de la descripción del problema y la prueba de datos.", "Identifica acciones correctivas alternativas para eliminar la causa raíz."] },
        { id: 'd5', title: "D5: Formular y verificar acciones correctivas permanentes", points: ["Define e implementa la mejor acción correctiva permanente.", "Escoja los controles de seguimiento para asegurar que la raíz del problema es eliminada.", "Una vez en producción, monitoree los efectos en un período de tiempo e implemente acciones de contingencia, si es necesario."] },
        { id: 'd6', title: "D6: Implantar y validar acciones correctivas permanentes", points: ["Se verifica la efectividad de las acciones permanentes e interinas por medio de la medición, en términos cuantificables.", "Pueden verificarse antes (depende del caso), durante o después de que las acciones hayan sido implementadas.", "Se confirma que las acciones correctivas seleccionadas resolverán el problema definitivamente.", "Se verifica que no habrá efectos o consecuencias indeseables así como planes de contingencia de ser necesario."] },
        { id: 'd7', title: "D7: Prevenir la ocurrencia", points: ["Debido a que los problemas iguales o similares presentan una tendencia a repetirse, la disciplina de la prevención está enfocada a la identificación y eliminación de: Prácticas, Procesos, Diseños y Procedimientos (operativos o administrativos); que pudieran contribuir a que el problema se repita."] },
        { id: 'd8', title: "D8: Reconocer al equipo y las contribuciones individuales", points: ["Reconocimiento de la gerencia de las contribuciones de todo el personal del grupo por el buen trabajo realizado, tanto como el esfuerzo individual.", "Las aprobaciones para el informe 8D también se demuestran en esta última disciplina."] }
    ];

    // =========================================================================
    // LÓGICA DEL EXPLORADOR DE SCROLLYTELLING
    // =========================================================================
    const contentArea = document.getElementById('discipline-content-area');
    const navStepsContainer = document.getElementById('sticky-nav-steps');

    // Poblar el contenido y la navegación dinámicamente
    disciplineData.forEach(data => {
        // Crear tarjeta de contenido
        const card = document.createElement('div');
        card.className = 'scroll-step-card';
        card.dataset.step = data.id;
        let cardContent = `<h4>${data.title}</h4><ul>`;
        data.points.forEach(point => { cardContent += `<li>${point}</li>`; });
        cardContent += `</ul>`;
        card.innerHTML = cardContent;
        contentArea.appendChild(card);
        
        // Crear paso de navegación
        const navStep = document.createElement('div');
        navStep.className = 'sticky-step';
        navStep.dataset.step = data.id;
        navStep.innerHTML = `<span class="step-code">${data.id.toUpperCase()}</span><span class="step-text">${data.title.split(': ')[1]}</span>`;
        navStepsContainer.appendChild(navStep);
    });

    const scrollSteps = document.querySelectorAll('.scroll-step-card');
    const navSteps = document.querySelectorAll('.sticky-step');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const stepId = entry.target.dataset.step;
            const navStep = document.querySelector(`.sticky-step[data-step="${stepId}"]`);
            
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                navSteps.forEach(step => step.classList.remove('active'));
                navStep.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' }); // Activa cuando el elemento está en el centro del viewport

    scrollSteps.forEach(step => observer.observe(step));
    
    
    // =========================================================================
    // LÓGICA DEL NUEVO MINI-EJERCICIO DE ESCENARIO
    // =========================================================================
    const scenarioContextEl = document.querySelector('.scenario-context');
    const scenarioQuestionEl = document.querySelector('.scenario-question');
    const scenarioOptionsEl = document.querySelector('.scenario-options');
    const scenarioFeedbackEl = document.querySelector('.scenario-feedback');
    let currentQuizStep = 0;

    const quizData = [
        { context: 'Un motor ha fallado. La producción está detenida.', question: 'El supervisor reúne a un mecánico, un electricista y un ingeniero de procesos para investigar.', action: 'Esta acción corresponde a:', correct: 'd1', options: ['d1', 'd2', 'd3'] },
        { context: 'El equipo necesita entender el problema a fondo.', question: 'Documentan qué falló, dónde, cuándo y el impacto exacto en la producción.', action: 'Esta acción corresponde a:', correct: 'd2', options: ['d2', 'd4', 'd5'] },
        { context: 'Mientras investigan, desvían temporalmente la producción a otra línea para minimizar pérdidas.', question: 'Esta solución temporal se conoce como:', action: 'Esta acción corresponde a:', correct: 'd3', options: ['d1', 'd3', 'd6'] },
        { context: 'El equipo utiliza diagramas de Ishikawa y los 5 Porqués, descubriendo que la causa fue una lubricación incorrecta.', question: 'Este proceso de investigación es:', action: 'Esta acción corresponde a:', correct: 'd4', options: ['d2', 'd4', 'd7'] },
        { context: 'Para evitar que vuelva a ocurrir, deciden implementar un nuevo sistema de lubricación automática.', question: 'Esta solución a largo plazo es una:', action: 'Esta acción corresponde a:', correct: 'd5', options: ['d3', 'd5', 'd8'] },
    ];
    
    function getDisciplineName(id) {
        const data = disciplineData.find(d => d.id === id);
        return data ? data.title.split(': ')[1] : '';
    }

    function renderQuizStep() {
        const step = quizData[currentQuizStep];
        scenarioContextEl.textContent = `Escenario: ${step.context}`;
        scenarioQuestionEl.textContent = step.action;
        
        const shuffledOptions = [...step.options].sort(() => Math.random() - 0.5);
        scenarioOptionsEl.innerHTML = '';
        shuffledOptions.forEach(optionId => {
            scenarioOptionsEl.innerHTML += `<button class="scenario-option-btn" data-id="${optionId}">${getDisciplineName(optionId)}</button>`;
        });
        
        document.querySelectorAll('.scenario-option-btn').forEach(btn => {
            btn.addEventListener('click', checkQuizAnswer);
        });
    }

    function checkQuizAnswer(e) {
        const selectedId = e.target.dataset.id;
        const correctId = quizData[currentQuizStep].correct;
        
        document.querySelectorAll('.scenario-option-btn').forEach(btn => btn.disabled = true);
        
        scenarioFeedbackEl.style.display = 'block';
        if (selectedId === correctId) {
            e.target.classList.add('correct');
            scenarioFeedbackEl.innerHTML = '<strong>¡Correcto!</strong> ' + getDisciplineName(correctId) + ' es la disciplina adecuada.';
            scenarioFeedbackEl.style.background = '#e6ffed';
            currentQuizStep++;
            
            setTimeout(() => {
                scenarioFeedbackEl.style.display = 'none';
                if (currentQuizStep < quizData.length) {
                    renderQuizStep();
                } else {
                    scenarioContextEl.textContent = '';
                    scenarioQuestionEl.textContent = "¡Felicidades! Has completado el análisis del caso práctico.";
                    scenarioOptionsEl.innerHTML = '';
                }
            }, 2000);
        } else {
            e.target.classList.add('incorrect');
            scenarioFeedbackEl.innerHTML = '<strong>Incorrecto.</strong> Esa no es la disciplina correcta para esta acción. La respuesta era ' + getDisciplineName(correctId) + '.';
            scenarioFeedbackEl.style.background = '#fee2e2';
        }
    }

    if(scenarioContextEl) {
        renderQuizStep();
    }
});