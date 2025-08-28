// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'conclusiones.html';
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
    const formContainer = document.getElementById('final-entry-form');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text-header');
    const feedbackEl = document.getElementById('final-feedback');
    const retryBtn = document.getElementById('retry-btn');
    const revealBtn = document.getElementById('reveal-btn');

    const exerciseData = [
        { label: 'Tipo de orden', answer: 'PM01', validation: 'exact', hint: 'La falla se encontró en una inspección, pero si no se actúa, causará una parada. ¿Es planificada o no?' },
        { label: 'Prioridad', answer: '2', validation: 'exact', hint: 'La detención no es inmediata pero es necesaria pronto. No es "urgente" (1), pero sí es de...' },
        { label: 'Ubicación técnica', answer: 'PLT-CHANC-FAJA01', validation: 'startsWith', hint: 'Debe seguir el formato Planta-Área-Equipo. Ej: PLT-AREA-ID.' },
        { label: 'Código de equipo', answer: 'EQ00025678', validation: 'startsWith', hint: 'Es el número de activo único. Usualmente empieza con "EQ".' },
        { label: 'Código de causa', answer: 'CS02', validation: 'startsWith', hint: 'El desgaste fue "excesivo", no normal. ¿Qué código de causa refleja esto?' },
        { label: 'Código de daño', answer: 'DM03', validation: 'startsWith', hint: 'El desgaste excesivo provocó una deformación en la pieza. ¿Cuál es el daño?' },
        { label: 'Código de actividad', answer: 'AC07', validation: 'startsWith', hint: 'La pieza dañada debe ser reemplazada por una nueva. ¿Qué actividad es esa?' }
    ];

    function initExercise() {
        formContainer.innerHTML = '';
        const shuffledData = [...exerciseData].sort(() => Math.random() - 0.5);

        shuffledData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'final-entry-row';
            row.innerHTML = `
                <div class="final-entry-label">
                    ${item.label}
                    <span class="hint-icon" title="Mostrar pista">?</span>
                </div>
                <div class="final-input-wrapper">
                    <input type="text" class="final-entry-input" placeholder="Escriba aquí..." 
                           data-answer="${item.answer}" data-validation="${item.validation}" data-hint="${item.hint}">
                    <button class="verify-row-btn" title="Verificar">
                        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                    </button>
                    <span class="validation-icon"></span>
                </div>
            `;
            formContainer.appendChild(row);
        });

        updateProgress(0);
        feedbackEl.innerHTML = `<p><strong>Pista:</strong> Haz clic en el icono (?) para obtener ayuda.</p>`;
        feedbackEl.className = 'final-feedback';
        
        attachEventListeners();
    }

    function attachEventListeners() {
        formContainer.querySelectorAll('.verify-row-btn').forEach(btn => {
            btn.addEventListener('click', handleVerification);
        });
        formContainer.querySelectorAll('.hint-icon').forEach(icon => {
            icon.addEventListener('click', showHint);
        });
    }

    function handleVerification(event) {
        const btn = event.currentTarget;
        const wrapper = btn.closest('.final-input-wrapper');
        const input = wrapper.querySelector('.final-entry-input');
        const icon = wrapper.querySelector('.validation-icon');
        
        const userAnswer = input.value.trim().toUpperCase();
        const idealAnswer = input.dataset.answer.toUpperCase();
        const validationType = input.dataset.validation;
        let isCorrect = false;

        if (userAnswer === "") { isCorrect = false; } 
        else if (validationType === 'exact') { isCorrect = (userAnswer === idealAnswer || (idealAnswer === '2' && userAnswer === '2 ALTA')); } 
        else if (validationType === 'startsWith') { isCorrect = userAnswer.startsWith(idealAnswer.substring(0, 2)); }
        
        btn.disabled = true;
        input.disabled = true;
        
        icon.classList.add('visible');
        if (isCorrect) {
            input.style.borderColor = '#28a745';
            icon.classList.add('correct');
            icon.textContent = '✓';
            feedbackEl.innerHTML = `<p><strong>¡Correcto!</strong> El valor para "${btn.closest('.final-entry-row').querySelector('.final-entry-label').textContent.trim().replace('?', '')}" es adecuado.</p>`;
            feedbackEl.className = 'final-feedback correct';
        } else {
            input.style.borderColor = 'var(--color-rojo)';
            icon.classList.add('incorrect');
            icon.textContent = '✗';
            feedbackEl.innerHTML = `<p><strong>Intenta de nuevo.</strong> El valor ingresado no es el esperado. La respuesta ideal empieza con "${idealAnswer.substring(0,2)}...".</p>`;
            feedbackEl.className = 'final-feedback incorrect';
        }
        
        updateProgress();
    }
    
    function showHint(event) {
        const icon = event.target;
        const input = icon.closest('.final-entry-row').querySelector('.final-entry-input');
        feedbackEl.innerHTML = `<p><strong>Pista:</strong> ${input.dataset.hint}</p>`;
        feedbackEl.className = 'final-feedback';
    }
    
    function updateProgress() {
        const totalInputs = exerciseData.length;
        const correctInputs = formContainer.querySelectorAll('.validation-icon.correct').length;
        const percentage = (correctInputs / totalInputs) * 100;
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${correctInputs}/${totalInputs}`;
    }
    
    function revealAnswers() {
        formContainer.querySelectorAll('.final-entry-input').forEach(input => {
            input.value = input.dataset.answer;
            input.disabled = true;
            input.style.borderColor = '#28a745';
            const wrapper = input.closest('.final-input-wrapper');
            wrapper.querySelector('.verify-row-btn').disabled = true;
            const icon = wrapper.querySelector('.validation-icon');
            icon.className = 'validation-icon visible correct';
            icon.textContent = '✓';
        });
        updateProgress();
        feedbackEl.innerHTML = `<p>Estas son las respuestas ideales para el escenario propuesto.</p>`;
        feedbackEl.className = 'final-feedback';
    }
    
    retryBtn.addEventListener('click', initExercise);
    revealBtn.addEventListener('click', revealAnswers);

    initExercise();
});