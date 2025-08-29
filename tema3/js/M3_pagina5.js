// Funciones de navegación y SCORM
function goToNextPage() {
    // Redirigir a la siguiente página
    window.location.href = 'M3_pagina6.html';
}

function backPage() {
    // Redirigir a la página anterior
    window.location.href = 'M3_pagina4.html';
}

// Iniciar SCORM
ScormManager.init();

// Guardar progreso de esta página
ScormManager.guardarProgreso("M3_pagina5.html");

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
    // --- DATOS CENTRALIZADOS DE LOS SLIDES ---
    const ishikawaData = {
        definition: { title: 'Definición.', html: `<p>El diagrama de Ishikawa, conocido también como causa-efecto, espina de pescado o análisis de 6Ms, es una técnica para organizar y representar las diferentes teorías sobre las causas de un problema de forma gráfica y detallada.</p><p>Con el diagrama se identifican todos los potenciales factores que contribuyen a la generación de un problema. Los factores analizados son: Mano de Obra, Método, Máquina, Material, Medio ambiente y Medición.</p>` },
        construction: { title: 'Pasos y Construcción del Diagrama', html: `<ul><li>Se debe concretar cuál va a ser el problema o "efecto" a solucionar, y se pone al final de la espina dorsal.</li><li>Se usan 6 categorías (6M's) para definir el esquema: materiales, maquinas, métodos, mano de obra, medio ambiente y medidas.</li><li>Identificar las causas principales a través de flechas o espinas principales que salen de la espina dorsal.</li><li>Se debe identificar las sub-causas a través de flechas que se desprenden de las espinas principales.</li><li>Se puede hacer una asignación de la importancia y relevancia de cada factor para tratar unas antes que otras.</li></ul>` },
        errors: { title: 'Errores Comunes del Diagrama Causa-Efecto', html: `<ul><li>Construir el diagrama antes de analizar globalmente los síntomas.</li><li>Limitar las teorías propuestas, enmascarando involuntariamente la causa raíz.</li><li>Cometer errores en la relación causal o en el orden de las teorías, suponiendo un gasto de tiempo importante.</li></ul>` },
        strengths: { title: 'Fortalezas del Método', html: `<ul><li>Fomenta la participación del grupo para identificar las percepciones de las personas sobre los factores causales.</li><li>Busca factores causales bajo un conjunto de categorías, identificando una gama de factores (humanos, organizacionales, hardware, procedimiento).</li><li>Utiliza un formato ordenado y fácil de leer.</li><li>Indica posibles factores causales para investigaciones simples o complejas.</li></ul>` },
        weaknesses: { title: 'Debilidades o Limitaciones del Método', html: `<ul><li>No existe un modelo o teoría de causalidad subyacente, por lo que los factores causales identificados se basan en las percepciones del equipo.</li></ul>` }
    };

    // --- 1. EXPLORADOR DE CONTENIDO ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const explorerTitle = document.getElementById('explorer-title');
    const explorerDetails = document.getElementById('explorer-details');

    function updateExplorerContent(topicId) {
        const data = ishikawaData[topicId];
        if(data) {
            explorerTitle.textContent = data.title;
            explorerDetails.innerHTML = data.html;
            explorerDetails.classList.remove('showContent');
            void explorerDetails.offsetWidth; // Trigger reflow to restart animation
            explorerDetails.classList.add('showContent');
        }
    }

    if(tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateExplorerContent(btn.dataset.topic);
            });
        });
        updateExplorerContent('definition'); // Carga inicial
    }

    // --- 2. MINI-EJERCICIO CLASIFICADOR ---
    const causesList = document.querySelector('.causes-list');
    const categoryButtons = document.querySelector('.category-buttons');
    const feedbackEl = document.querySelector('.sorter-feedback');
    let selectedCause = null;

    const quizData = [
        { text: 'Molino de café mal calibrado', category: 'machine' },
        { text: 'Falta de entrenamiento del barista', category: 'people' },
        { text: 'Granos de café de mala calidad', category: 'material' },
        { text: 'Procedimiento de limpieza incorrecto', category: 'method' },
        { text: 'Temperatura del agua muy alta', category: 'measurement' },
        { text: 'Humedad alta en el almacén', category: 'environment' }
    ];
    const categories = {
        people: 'Mano de Obra', machine: 'Máquina', method: 'Método',
        material: 'Material', environment: 'Medio Ambiente', measurement: 'Medición'
    };
    // Nueva matriz para definir un orden específico y más visual
    const categoryOrder = ['method', 'machine', 'people', 'material', 'measurement', 'environment'];

    if (causesList && categoryButtons) {
        // Poblar causas
        quizData.sort(() => Math.random() - 0.5).forEach(item => {
            const causeEl = document.createElement('div');
            causeEl.className = 'cause-item';
            causeEl.textContent = item.text;
            causeEl.dataset.category = item.category;
            causeEl.addEventListener('click', () => {
                if (causeEl.classList.contains('correct')) return;
                document.querySelectorAll('.cause-item').forEach(c => c.classList.remove('selected'));
                causeEl.classList.add('selected');
                selectedCause = causeEl;
            });
            causesList.appendChild(causeEl);
        });

        // Poblar categorías usando el nuevo orden
        categoryOrder.forEach(key => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = categories[key];
            btn.dataset.category = key;
            btn.addEventListener('click', () => {
                if (!selectedCause) {
                    feedbackEl.textContent = "Primero selecciona una causa de la lista de arriba.";
                    return;
                }
                if (selectedCause.dataset.category === btn.dataset.category) {
                    selectedCause.classList.remove('selected', 'incorrect');
                    selectedCause.classList.add('correct');
                    selectedCause.disabled = true;
                    feedbackEl.textContent = "¡Correcto!";
                    feedbackEl.style.color = '#28a745';
                    selectedCause = null;
                    checkWin();
                } else {
                    selectedCause.classList.add('incorrect');
                    feedbackEl.textContent = "Incorrecto. Intenta con otra categoría.";
                    feedbackEl.style.color = 'var(--color-rojo)';
                    setTimeout(() => selectedCause.classList.remove('incorrect'), 1000);
                }
            });
            categoryButtons.appendChild(btn);
        });
    }
    
    function checkWin() {
        const totalCauses = quizData.length;
        const correctCauses = document.querySelectorAll('.cause-item.correct').length;
        if (totalCauses === correctCauses) {
            feedbackEl.textContent = "¡Felicidades! Has clasificado todas las causas correctamente.";
        }
    }
});
