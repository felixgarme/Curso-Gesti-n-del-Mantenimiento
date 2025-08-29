// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M3_pagina7.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M3_pagina5.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M3_pagina6.html");

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
    // LÓGICA DEL ACORDEÓN DE INFORMACIÓN
    // =========================================================================
    document.querySelectorAll('.info-card-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const wasVisible = content.classList.contains('visible');
            document.querySelectorAll('.info-card-content.visible').forEach(c => c.classList.remove('visible'));
            document.querySelectorAll('.info-card-header.active').forEach(h => h.classList.remove('active'));
            if (!wasVisible) {
                header.classList.add('active');
                content.classList.add('visible');
            }
        });
    });

    // =========================================================================
    // LÓGICA DEL MINI-EJERCICIO DE CLASIFICACIÓN
    // =========================================================================
    const scenarioQuizContainer = document.querySelector('.scenario-quiz-container');
    if (scenarioQuizContainer) {
        const scenarioTextEl = document.getElementById('scenario-text');
        const choiceButtons = document.querySelectorAll('.choice-btn');
        const feedbackEl = document.getElementById('scenario-feedback');
        const progressEl = document.getElementById('quiz-progress');
        const nextBtn = document.getElementById('quiz-next-btn');
        const restartBtn = document.getElementById('quiz-restart-btn');

        const quizData = [
            { text: 'Un componente falló repetidamente. Se analiza para eliminar la repetición.', type: 'reactive' },
            { text: 'Se instala un nuevo tipo de maquinaria. Se analizan los posibles modos de fallo antes de que ocurran.', type: 'proactive' },
            { text: 'Ocurrió un incidente ambiental. Se investiga para asegurar que no vuelva a pasar.', type: 'reactive' },
            { text: 'Se planea un cambio en el proceso de producción. Se evalúan los riesgos de antemano.', type: 'proactive' }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let shuffledData = [];

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            shuffledData = [...quizData].sort(() => Math.random() - 0.5);
            nextBtn.style.display = 'none';
            restartBtn.style.display = 'none';
            feedbackEl.innerHTML = '';
            feedbackEl.className = 'scenario-feedback';
            const choicesEl = document.getElementById('scenario-choices');
            choicesEl.style.display = 'grid';
            choicesEl.classList.remove('choices-answered');
            renderQuestion();
        }

        function renderQuestion() {
            if (currentQuestionIndex >= shuffledData.length) {
                showFinalScore();
                return;
            }

            const currentQuestion = shuffledData[currentQuestionIndex];
            scenarioTextEl.textContent = currentQuestion.text;
            progressEl.textContent = `Pregunta ${currentQuestionIndex + 1} de ${shuffledData.length}`;
            
            choiceButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'incorrect');
            });

            nextBtn.style.display = 'none';
            feedbackEl.className = 'scenario-feedback';
        }

        function checkAnswer(selectedChoice) {
            const currentQuestion = shuffledData[currentQuestionIndex];
            const correctChoice = currentQuestion.type;

            document.getElementById('scenario-choices').classList.add('choices-answered');
            choiceButtons.forEach(btn => {
                btn.disabled = true;
                if (btn.dataset.choice === correctChoice) {
                    btn.classList.add('correct');
                }
            });

            if (selectedChoice === correctChoice) {
                score++;
                feedbackEl.textContent = '¡Correcto!';
                feedbackEl.className = 'scenario-feedback correct visible';
            } else {
                const selectedButton = document.querySelector(`.choice-btn[data-choice="${selectedChoice}"]`);
                selectedButton.classList.add('incorrect');
                feedbackEl.textContent = 'Incorrecto.';
                feedbackEl.className = 'scenario-feedback incorrect visible';
            }

            nextBtn.style.display = 'inline-block';
        }

        function showFinalScore() {
            scenarioTextEl.innerHTML = `<strong style="font-size: var(--font-4);">¡Ejercicio completado!</strong>`;
            document.getElementById('scenario-choices').style.display = 'none';
            feedbackEl.textContent = `Tu puntuación: ${score} de ${shuffledData.length}`;
            feedbackEl.className = 'scenario-feedback visible';
            progressEl.textContent = ``;
            nextBtn.style.display = 'none';
            restartBtn.style.display = 'inline-block';
        }

        choiceButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                checkAnswer(btn.dataset.choice);
            });
        });

        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            feedbackEl.innerHTML = '';
            feedbackEl.className = 'scenario-feedback';
            renderQuestion();
        });

        restartBtn.addEventListener('click', startQuiz);

        startQuiz();
    }
});