
// Variables globales para el manejo de slides
let currentSlide = 0;
const totalSlides = 4;

// Función para cambiar slides
function changeSlide(direction) {
  const slides = document.querySelectorAll('.rcm-slide');
  const navButtons = document.querySelectorAll('.rcm-nav-btn');
  
  // Ocultar slide actual
  slides[currentSlide].classList.remove('active');
  navButtons[currentSlide].classList.remove('active');
  
  // Calcular nuevo slide
  currentSlide += direction;
  
  // Límites
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
  
  // Mostrar nuevo slide
  slides[currentSlide].classList.add('active');
  navButtons[currentSlide].classList.add('active');
  
  // Actualizar controles
  updateControls();
  updateProgress();
}

// Función para ir a un slide específico
function goToSlide(slideIndex) {
  const slides = document.querySelectorAll('.rcm-slide');
  const navButtons = document.querySelectorAll('.rcm-nav-btn');
  
  // Ocultar slide actual
  slides[currentSlide].classList.remove('active');
  navButtons[currentSlide].classList.remove('active');
  
  // Cambiar a nuevo slide
  currentSlide = slideIndex;
  
  // Mostrar nuevo slide
  slides[currentSlide].classList.add('active');
  navButtons[currentSlide].classList.add('active');
  
  // Actualizar controles
  updateControls();
  updateProgress();
}

// Función para actualizar controles de navegación
function updateControls() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Función para actualizar barra de progreso
function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const slideCounter = document.getElementById('slideCounter');
  
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  progressFill.style.width = progress + '%';
  slideCounter.textContent = `${currentSlide + 1} de ${totalSlides}`;
}

// Función para mostrar conceptos interactivos
function showConcept(conceptId) {
  const conceptModal = document.createElement('div');
  conceptModal.className = 'rcm-modal';
  
  let conceptContent = '';
  
  switch(conceptId) {
    case 'failure-impact':
      conceptContent = `
        <div class="rcm-modal-content">
          <div class="rcm-modal-header">
            <h3>Impacto de las Fallas en los Activos</h3>
            <button class="rcm-modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="rcm-modal-body">
            <div class="rcm-concept-intro">
              <p>Las fallas impactan directamente en la capacidad del activo para cumplir su función. Estos impactos se pueden categorizar en diferentes áreas:</p>
            </div>
            
            <div class="rcm-impact-grid">
              <div class="rcm-impact-card production">
                <h4>Impacto en Producción</h4>
                <ul>
                  <li>Pérdida de capacidad productiva</li>
                  <li>Reducción en la calidad del producto</li>
                  <li>Incumplimiento de entregas</li>
                  <li>Tiempo de inactividad no planificado</li>
                </ul>
              </div>
              
              <div class="rcm-impact-card safety">
                <h4>Impacto en Seguridad</h4>
                <ul>
                  <li>Riesgo de accidentes laborales</li>
                  <li>Exposición a sustancias peligrosas</li>
                  <li>Fallas catastróficas del equipo</li>
                  <li>Compromiso de sistemas de protección</li>
                </ul>
              </div>
              
              <div class="rcm-impact-card environment">
                <h4>Impacto Ambiental</h4>
                <ul>
                  <li>Emisiones no controladas</li>
                  <li>Derrames de fluidos contaminantes</li>
                  <li>Consumo excesivo de energía</li>
                  <li>Generación de residuos adicionales</li>
                </ul>
              </div>
              
              <div class="rcm-impact-card economic">
                <h4>Impacto Económico</h4>
                <ul>
                  <li>Costos de reparación de emergencia</li>
                  <li>Pérdida de ingresos por paradas</li>
                  <li>Penalizaciones contractuales</li>
                  <li>Aumento en costos operativos</li>
                </ul>
              </div>
            </div>
            
            <div class="rcm-concept-conclusion">
              <h4>Importancia del RCM:</h4>
              <p>El Mantenimiento Centrado en Confiabilidad (RCM) ayuda a identificar y prevenir estas fallas antes de que ocurran, minimizando todos estos impactos negativos y maximizando la disponibilidad y confiabilidad de los activos.</p>
            </div>
          </div>
        </div>
      `;
      break;
    default:
      conceptContent = `
        <div class="rcm-modal-content">
          <div class="rcm-modal-header">
            <h3>Concepto no encontrado</h3>
            <button class="rcm-modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="rcm-modal-body">
            <p>Este concepto no está disponible en este momento.</p>
          </div>
        </div>
      `;
  }
  
  conceptModal.innerHTML = conceptContent;
  document.body.appendChild(conceptModal);
  
  // Mostrar modal con animación
  setTimeout(() => {
    conceptModal.classList.add('show');
  }, 10);
}

// Función para mostrar quiz interactivo
function showQuiz(quizId) {
  const quizModal = document.createElement('div');
  quizModal.className = 'rcm-modal';
  
  let quizContent = '';
  
  switch(quizId) {
    case 'rcm-levels':
      quizContent = `
        <div class="rcm-modal-content">
          <div class="rcm-modal-header">
            <h3>Quiz: Niveles del Proceso RCM</h3>
            <button class="rcm-modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="rcm-modal-body">
            <div class="rcm-quiz-question">
              <h4>¿Cuáles son los dos niveles del proceso RCM para identificar fallas?</h4>
            </div>
            
            <div class="rcm-quiz-options">
              <div class="rcm-quiz-option" onclick="checkAnswer('A', 'rcm-levels')">
                <span class="rcm-option-letter">A)</span>
                <span class="rcm-option-text">Análisis técnico y análisis económico</span>
              </div>
              
              <div class="rcm-quiz-option" onclick="checkAnswer('B', 'rcm-levels')">
                <span class="rcm-option-letter">B)</span>
                <span class="rcm-option-text">Identificar circunstancias que llevaron a la falla e identificar eventos que pueden causar la falla</span>
              </div>
              
              <div class="rcm-quiz-option" onclick="checkAnswer('C', 'rcm-levels')">
                <span class="rcm-option-letter">C)</span>
                <span class="rcm-option-text">Mantenimiento preventivo y mantenimiento correctivo</span>
              </div>
              
              <div class="rcm-quiz-option" onclick="checkAnswer('D', 'rcm-levels')">
                <span class="rcm-option-letter">D)</span>
                <span class="rcm-option-text">Análisis funcional y análisis estructural</span>
              </div>
            </div>
            
            <div class="rcm-quiz-result" id="quizResult" style="display: none;">
              <div class="rcm-quiz-feedback" id="quizFeedback"></div>
              <button class="rcm-quiz-retry" onclick="retryQuiz('rcm-levels')">Intentar de nuevo</button>
            </div>
          </div>
        </div>
      `;
      break;
    default:
      quizContent = `
        <div class="rcm-modal-content">
          <div class="rcm-modal-header">
            <h3>Quiz no disponible</h3>
            <button class="rcm-modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="rcm-modal-body">
            <p>Este quiz no está disponible en este momento.</p>
          </div>
        </div>
      `;
  }
  
  quizModal.innerHTML = quizContent;
  document.body.appendChild(quizModal);
  
  // Mostrar modal con animación
  setTimeout(() => {
    quizModal.classList.add('show');
  }, 10);
}

// Función para mostrar ejemplos
function showExample(exampleId) {
  const exampleModal = document.createElement('div');
  exampleModal.className = 'rcm-modal';
  
  let exampleContent = '';
  
  switch(exampleId) {
    case 'functional-failure':
      exampleContent = `
        <div class="rcm-modal-content">
          <div class="rcm-modal-header">
            <h3>Ejemplo Práctico: Bomba Centrífuga</h3>
            <button class="rcm-modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="rcm-modal-body">
            <div class="rcm-example-section">
              <h4>Función Definida:</h4>
              <p>Bombear 100 L/min a 50 PSI de presión</p>
            </div>
            
            <div class="rcm-example-section">
              <h4>Tipos de Fallas Funcionales:</h4>
              
              <div class="rcm-failure-type">
                <h5>Falla Funcional Total:</h5>
                <p>• La bomba no arranca</p>
                <p>• No hay flujo de líquido</p>
                <p>• Pérdida completa de la función</p>
              </div>
              
              <div class="rcm-failure-type">
                <h5>Falla Funcional Parcial:</h5>
                <p>• La bomba solo entrega 60 L/min</p>
                <p>• Presión reducida a 35 PSI</p>
                <p>• Función comprometida pero no perdida</p>
              </div>
            </div>
            
            <div class="rcm-example-conclusion">
              <h4>Conclusión:</h4>
              <p>Ambas son fallas funcionales porque el activo no cumple con los parámetros de funcionamiento que el usuario considera aceptables.</p>
            </div>
          </div>
        </div>
      `;
      break;
    default:
      exampleContent = `
        <div class="rcm-modal-content">
          <div class="rcm-modal-header">
            <h3>Ejemplo no disponible</h3>
            <button class="rcm-modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="rcm-modal-body">
            <p>Este ejemplo no está disponible en este momento.</p>
          </div>
        </div>
      `;
  }
  
  exampleModal.innerHTML = exampleContent;
  document.body.appendChild(exampleModal);
  
  // Mostrar modal con animación
  setTimeout(() => {
    exampleModal.classList.add('show');
  }, 10);
}

// Función para verificar respuestas del quiz
function checkAnswer(selectedAnswer, quizId) {
  const options = document.querySelectorAll('.rcm-quiz-option');
  const resultDiv = document.getElementById('quizResult');
  const feedbackDiv = document.getElementById('quizFeedback');
  
  let correctAnswer = '';
  let explanation = '';
  
  switch(quizId) {
    case 'rcm-levels':
      correctAnswer = 'B';
      explanation = 'El proceso RCM identifica las fallas en dos niveles: primero identifica las circunstancias que llevaron a la falla, y luego se pregunta qué eventos pueden causar que el activo falle.';
      break;
  }
  
  // Deshabilitar todas las opciones
  options.forEach(option => {
    option.style.pointerEvents = 'none';
    option.classList.remove('selected');
  });
  
  // Marcar la opción seleccionada
  const selectedOption = Array.from(options).find(option => 
    option.textContent.trim().startsWith(selectedAnswer + ')')
  );
  
  if (selectedOption) {
    selectedOption.classList.add('selected');
  }
  
  // Mostrar resultado
  if (selectedAnswer === correctAnswer) {
    feedbackDiv.innerHTML = `
      <div class="rcm-quiz-correct">
        <h4>¡Correcto!</h4>
        <p>${explanation}</p>
      </div>
    `;
  } else {
    const correctOption = Array.from(options).find(option => 
      option.textContent.trim().startsWith(correctAnswer + ')')
    );
    if (correctOption) {
      correctOption.classList.add('correct');
    }
    
    feedbackDiv.innerHTML = `
      <div class="rcm-quiz-incorrect">
        <h4>Respuesta incorrecta</h4>
        <p>La respuesta correcta es la opción <strong>${correctAnswer}</strong>.</p>
        <p>${explanation}</p>
      </div>
    `;
  }
  
  resultDiv.style.display = 'block';
}

// Función para reintentar el quiz
function retryQuiz(quizId) {
  const options = document.querySelectorAll('.rcm-quiz-option');
  const resultDiv = document.getElementById('quizResult');
  
  // Rehabilitar opciones
  options.forEach(option => {
    option.style.pointerEvents = 'auto';
    option.classList.remove('selected', 'correct');
  });
  
  // Ocultar resultado
  resultDiv.style.display = 'none';
}

// Función para cerrar modal
function closeModal() {
  const modal = document.querySelector('.rcm-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Event listeners para navegación por botones
document.addEventListener('DOMContentLoaded', function() {
  // Navegación por botones de slides
  const navButtons = document.querySelectorAll('.rcm-nav-btn');
  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => goToSlide(index));
  });
  
  // Navegación por teclado
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      changeSlide(-1);
    } else if (event.key === 'ArrowRight') {
      changeSlide(1);
    }
  });
  
  // Inicializar controles
  updateControls();
  updateProgress();
});

// Función para resetear el curso
function resetCourse() {
  goToSlide(0);
}

// Auto-avance opcional (descomentear si se desea)
/*
setInterval(function() {
  if (currentSlide < totalSlides - 1) {
    changeSlide(1);
  }
}, 10000); // Avanza cada 10 segundos
*/
