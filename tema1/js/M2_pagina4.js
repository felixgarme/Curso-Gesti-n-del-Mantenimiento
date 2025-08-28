// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M2_pagina5.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M2_pagina3.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M2_pagina4.html");

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
        entry.target.style.transitionDelay = `${index * 100}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedCards.forEach(card => observer.observe(card));

  // --- 2. Lógica del Simulador de Proceso ---
  const processContainer = moduleContainer.querySelector(".process-flow-container");
  if (processContainer) {
    const controlButton = processContainer.querySelector(".process-flow-btn");
    let isStep2 = false;

    controlButton.addEventListener("click", () => {
      isStep2 = !isStep2;
      processContainer.classList.toggle("show-step-2", isStep2);

      const arrow = controlButton.querySelector('.arrow');
      if (isStep2) {
        controlButton.classList.add("secondary");
        controlButton.innerHTML = 'Volver al inicio';
      } else {
        controlButton.classList.remove("secondary");
        controlButton.innerHTML = 'Crear Orden <span class="arrow">></span>';
      }
    });
  }
});