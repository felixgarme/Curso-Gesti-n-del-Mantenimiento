let currentSlide = 0
let slides = []
let navButtons = []
let prevBtn = null
let nextBtn = null
let progressFill = null
let slideCounter = null
let totalSlides = 0

function init() {
  slides = Array.from(document.querySelectorAll('.rcm-slide'))
  navButtons = Array.from(document.querySelectorAll('.rcm-nav .rcm-nav-btn'))
  prevBtn = document.getElementById('prevBtn')
  nextBtn = document.getElementById('nextBtn')
  progressFill = document.getElementById('progressFill')
  slideCounter = document.getElementById('slideCounter')
  totalSlides = slides.length || navButtons.length || 0

  const initialNavIndex = navButtons.findIndex(b => b.classList.contains('active'))
  currentSlide = initialNavIndex >= 0 ? initialNavIndex : 0

  slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide))
  navButtons.forEach((b, i) => {
    b.classList.toggle('active', i === currentSlide)
    b.removeAttribute('onclick')
    b.addEventListener('click', () => {
      const ds = parseInt(b.dataset.slide)
      const index = Number.isFinite(ds) ? ds : i
      goToSlide(index)
    })
  })

  if (prevBtn) {
    prevBtn.removeAttribute('onclick')
    prevBtn.addEventListener('click', () => changeSlide(-1))
  }
  if (nextBtn) {
    nextBtn.removeAttribute('onclick')
    nextBtn.addEventListener('click', () => changeSlide(1))
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') changeSlide(-1)
    else if (e.key === 'ArrowRight') changeSlide(1)
  })

  updateControls()
  updateProgress()
}

function changeSlide(direction) {
  if (!totalSlides) {
    slides = Array.from(document.querySelectorAll('.rcm-slide'))
    navButtons = Array.from(document.querySelectorAll('.rcm-nav .rcm-nav-btn'))
    totalSlides = slides.length || navButtons.length || 0
  }
  let newIndex = currentSlide + direction
  if (newIndex < 0) newIndex = 0
  if (newIndex >= totalSlides) newIndex = totalSlides - 1
  if (newIndex !== currentSlide) goToSlide(newIndex)
}

function goToSlide(slideIndex) {
  if (!totalSlides) {
    slides = Array.from(document.querySelectorAll('.rcm-slide'))
    navButtons = Array.from(document.querySelectorAll('.rcm-nav .rcm-nav-btn'))
    totalSlides = slides.length || navButtons.length || 0
  }
  if (slideIndex < 0) slideIndex = 0
  if (slideIndex >= totalSlides) slideIndex = totalSlides - 1

  if (slides[currentSlide]) slides[currentSlide].classList.remove('active')
  if (navButtons[currentSlide]) navButtons[currentSlide].classList.remove('active')

  currentSlide = slideIndex

  if (slides[currentSlide]) slides[currentSlide].classList.add('active')
  if (navButtons[currentSlide]) navButtons[currentSlide].classList.add('active')

  updateControls()
  updateProgress()
}

function updateControls() {
  if (prevBtn) prevBtn.disabled = currentSlide === 0
  if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1
}

function updateProgress() {
  if (progressFill) {
    const progress = totalSlides ? ((currentSlide + 1) / totalSlides) * 100 : 0
    progressFill.style.width = progress + '%'
  }
  if (slideCounter) slideCounter.textContent = `${currentSlide + 1} de ${totalSlides}`
}

function showConcept(conceptId) {
  const conceptModal = document.createElement('div')
  conceptModal.className = 'rcm-modal'
  let conceptContent = ''

  switch (conceptId) {
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
      `
      break
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
      `
  }

  conceptModal.innerHTML = conceptContent
  document.body.appendChild(conceptModal)
  setTimeout(() => conceptModal.classList.add('show'), 10)
}

function showQuiz(quizId) {
  const quizModal = document.createElement('div')
  quizModal.className = 'rcm-modal'
  let quizContent = ''

  switch (quizId) {
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
      `
      break
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
      `
  }

  quizModal.innerHTML = quizContent
  document.body.appendChild(quizModal)
  setTimeout(() => quizModal.classList.add('show'), 10)
}

function showExample(exampleId) {
  const exampleModal = document.createElement('div')
  exampleModal.className = 'rcm-modal'
  let exampleContent = ''

  switch (exampleId) {
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
      `
      break
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
      `
  }

  exampleModal.innerHTML = exampleContent
  document.body.appendChild(exampleModal)
  setTimeout(() => exampleModal.classList.add('show'), 10)
}

function checkAnswer(selectedAnswer, quizId) {
  const options = document.querySelectorAll('.rcm-quiz-option')
  const resultDiv = document.getElementById('quizResult')
  const feedbackDiv = document.getElementById('quizFeedback')
  let correctAnswer = ''
  let explanation = ''

  switch (quizId) {
    case 'rcm-levels':
      correctAnswer = 'B'
      explanation = 'El proceso RCM identifica las fallas en dos niveles: primero identifica las circunstancias que llevaron a la falla, y luego se pregunta qué eventos pueden causar que el activo falle.'
      break
  }

  options.forEach(option => {
    option.style.pointerEvents = 'none'
    option.classList.remove('selected')
  })

  const selectedOption = Array.from(options).find(option =>
    option.textContent.trim().startsWith(selectedAnswer + ')')
  )

  if (selectedOption) selectedOption.classList.add('selected')

  if (selectedAnswer === correctAnswer) {
    feedbackDiv.innerHTML = `
      <div class="rcm-quiz-correct">
        <h4>¡Correcto!</h4>
        <p>${explanation}</p>
      </div>
    `
  } else {
    const correctOption = Array.from(options).find(option =>
      option.textContent.trim().startsWith(correctAnswer + ')')
    )
    if (correctOption) correctOption.classList.add('correct')
    feedbackDiv.innerHTML = `
      <div class="rcm-quiz-incorrect">
        <h4>Respuesta incorrecta</h4>
        <p>La respuesta correcta es la opción <strong>${correctAnswer}</strong>.</p>
        <p>${explanation}</p>
      </div>
    `
  }

  if (resultDiv) resultDiv.style.display = 'block'
}

function retryQuiz(quizId) {
  const options = document.querySelectorAll('.rcm-quiz-option')
  const resultDiv = document.getElementById('quizResult')
  options.forEach(option => {
    option.style.pointerEvents = 'auto'
    option.classList.remove('selected', 'correct')
  })
  if (resultDiv) resultDiv.style.display = 'none'
}

function closeModal() {
  const modal = document.querySelector('.rcm-modal')
  if (modal) {
    modal.classList.remove('show')
    setTimeout(() => modal.remove(), 300)
  }
}

document.addEventListener('DOMContentLoaded', init)

function resetCourse() {
  goToSlide(0)
}
