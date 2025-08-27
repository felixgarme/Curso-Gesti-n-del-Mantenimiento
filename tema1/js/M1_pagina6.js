// Funciones de navegación y SCORM
        function goToNextPage() {
            // Redirigir a la siguiente página
            window.location.href = 'M1_pagina7.html';
        }

        function backPage() {
            // Redirigir a la página anterior
            window.location.href = 'M1_pagina5.html';
        }

        // Iniciar SCORM
        ScormManager.init();

        // Guardar progreso de esta página
        ScormManager.guardarProgreso("M1_pagina6.html");

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

  // --- 2. Lógica del Componente Acordeón ---
  const accordionContainer = moduleContainer.querySelector(".accordion-container");
  if (accordionContainer) {
    accordionContainer.addEventListener("click", (e) => {
      const header = e.target.closest(".accordion-header");
      if (!header) return;

      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains("active");

      // Opcional: Cerrar otros items al abrir uno nuevo
      // const allItems = accordionContainer.querySelectorAll('.accordion-item');
      // allItems.forEach(i => {
      //     i.classList.remove('active');
      //     i.querySelector('.accordion-content').style.maxHeight = 0;
      //     i.querySelector('.accordion-content').style.padding = "0 var(--spacing-md)";
      // });

      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "var(--spacing-md)";
      } else {
        item.classList.remove("active");
        content.style.maxHeight = 0;
        content.style.padding = "0 var(--spacing-md)";
      }
    });
  }

  // --- 3. Lógica del Slider de Imágenes ---
  const sliderContainer = moduleContainer.querySelector(".image-slider-container");
  if(sliderContainer) {
    const track = sliderContainer.querySelector(".slider-track");
    const slides = Array.from(track.children);
    const nextButton = sliderContainer.querySelector(".next");
    const prevButton = sliderContainer.querySelector(".prev");
    let currentIndex = 0;

    const updateSlidePosition = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    });
  }
});