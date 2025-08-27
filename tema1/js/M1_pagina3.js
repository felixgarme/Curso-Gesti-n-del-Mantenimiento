// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M1_pagina4.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M1_pagina2.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M1_pagina3.html");

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
document.addEventListener("DOMContentLoaded", () => {
  const moduleContainer = document.querySelector(".sap-pm-module-container");
  if (!moduleContainer) return;

  // --- 1. Animación Secuencial al Hacer Scroll ---
  const animatedBlocks = moduleContainer.querySelectorAll(".content-block");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationName = entry.target.dataset.animation;
          entry.target.style.animation = `${animationName} 1s ease-out forwards`;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
      });
    },
    {
      root: null, // viewport
      threshold: 0.1, // 10% del elemento visible
    }
  );

  animatedBlocks.forEach((block) => {
    observer.observe(block);
  });

  // --- 2. Funcionalidad de Voltear Tarjeta ---
  const flipButton = moduleContainer.querySelector(".flip-button");
  const flipper = moduleContainer.querySelector(".flipper");

  if (flipButton && flipper) {
    flipButton.addEventListener("click", () => {
      flipper.classList.toggle("is-flipped");
    });
  }

  // --- 3. Lógica del Cuestionario ---
  const quizOptionsWrapper =
    moduleContainer.querySelector(".quiz-options-wrapper");
  const feedbackEl = moduleContainer.querySelector(".quiz-feedback");
  const CORRECT_ANSWER = "IL01";

  if (quizOptionsWrapper && feedbackEl) {
    quizOptionsWrapper.addEventListener("click", (e) => {
      const selectedButton = e.target.closest(".quiz-option");
      if (!selectedButton || selectedButton.disabled) return;

      const quizButtons =
        quizOptionsWrapper.querySelectorAll(".quiz-option");
      quizButtons.forEach((btn) => (btn.disabled = true)); // Deshabilitar todos

      const selectedAnswer = selectedButton.dataset.answer;

      if (selectedAnswer === CORRECT_ANSWER) {
        selectedButton.classList.add("correct");
        feedbackEl.textContent = "¡Correcto! IL01 es para crear.";
        feedbackEl.style.color = "#2e7d32";
      } else {
        selectedButton.classList.add("incorrect");
        feedbackEl.textContent = "Incorrecto. La respuesta correcta es IL01.";
        feedbackEl.style.color = "var(--color-rojo)";

        // Resaltar la correcta
        const correctButton = quizOptionsWrapper.querySelector(
          `[data-answer="${CORRECT_ANSWER}"]`
        );
        if (correctButton) {
          correctButton.classList.add("correct");
        }
      }
    });
  }
});