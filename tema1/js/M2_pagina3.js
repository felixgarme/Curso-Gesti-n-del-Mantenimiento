// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M2_pagina4.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M2_pagina2.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M2_pagina3.html");

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

  // --- 1. Animación Secuencial de Tarjetas al Hacer Scroll ---
  const animatedCards = moduleContainer.querySelectorAll(".content-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Añade un delay escalonado para un efecto cascada
        entry.target.style.transitionDelay = `${index * 150}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedCards.forEach(card => observer.observe(card));

  // --- 2. Lógica para el Interruptor de Imágenes con Cross-Fade ---
  const imageSwitcher = moduleContainer.querySelector(".image-switcher");
  if (imageSwitcher) {
    const switcherBtn = imageSwitcher.querySelector(".image-switcher-btn");
    const images = imageSwitcher.querySelectorAll(".switcher-image");
    const caption = imageSwitcher.querySelector("#imageCaption");
    const captions = ["Vista: Acceso Inicial", "Vista: Resumen de Posiciones"];
    let currentIndex = 0;

    switcherBtn.addEventListener("click", () => {
      // Oculta la imagen actual
      images[currentIndex].classList.remove("is-visible");
      // Calcula el nuevo índice
      currentIndex = (currentIndex + 1) % images.length;
      // Muestra la nueva imagen
      images[currentIndex].classList.add("is-visible");
      
      if (caption) caption.textContent = captions[currentIndex];
    });
  }

  // --- 3. Lógica del Cuestionario Mejorado ---
  const quizWrapper = moduleContainer.querySelector(".quiz-options-wrapper");
  if (quizWrapper) {
    const feedbackEl = moduleContainer.querySelector(".quiz-feedback");
    const quizButtons = quizWrapper.querySelectorAll(".quiz-option");
    let answered = false;

    quizWrapper.addEventListener("click", (e) => {
      const selectedButton = e.target.closest(".quiz-option");
      if (!selectedButton || answered) return;
      answered = true;

      const isCorrect = selectedButton.dataset.correct === "true";
      
      quizButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add("answered"); // Clase para atenuar los no seleccionados
      });

      if (isCorrect) {
        selectedButton.classList.add("correct");
        feedbackEl.textContent = "¡Correcto! Es un Equipo.";
        feedbackEl.style.color = "#28a745";
      } else {
        selectedButton.classList.add("incorrect");
        feedbackEl.textContent = "Respuesta Incorrecta. La correcta es 'Equipo'.";
        feedbackEl.style.color = "var(--color-rojo)";
        const correctButton = quizWrapper.querySelector('[data-correct="true"]');
        if (correctButton) {
            correctButton.classList.add("correct");
            correctButton.classList.remove("answered"); // Quita atenuación de la correcta
        }
      }
    });
  }
});