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
    // LÓGICA DEL CARRUSEL DE TARJETAS
    // =========================================================================
    const navBtns = document.querySelectorAll('.card-nav-btn');
    const slides = document.querySelectorAll('.card-slide');

    if(navBtns.length > 0) {
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.card;

                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                slides.forEach(slide => {
                    if (slide.id === targetId) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
            });
        });
    }

    // =========================================================================
    // LÓGICA MEJORADA DEL MINI-EJERCICIO DE SWIPE
    // =========================================================================
    const swipeDeck = document.querySelector('.swipe-deck');
    const progressBar = document.querySelector('.swipe-progress-bar');
    if (!swipeDeck) return;

    const swipeData = [
        { text: 'Aceptar todas las ideas, incluso las no convencionales', type: 'do' },
        { text: 'Analizar y criticar cada idea en cuanto se propone', type: 'dont' },
        { text: 'Establecer un límite de tiempo para la sesión', type: 'do' },
        { text: 'Dejar que una sola persona domine la conversación', type: 'dont' },
        { text: 'Construir sobre las ideas de otros para mejorarlas', type: 'do' },
        { text: 'Ignorar las ideas que parecen "tontas" al principio', type: 'dont' },
    ];
    let remainingCards = swipeData.length;

    function createSwipeCard(item, index) {
        const card = document.createElement('div');
        card.className = 'swipe-card';
        card.style.zIndex = swipeData.length - index;
        card.innerHTML = `<span>${item.text}</span><div class="feedback-icon"></div>`;
        card.dataset.type = item.type;
        swipeDeck.appendChild(card);
        
        let isDragging = false, startX = 0;
        let startY = 0;
        
        function onPointerStart(e) {
            if (card !== swipeDeck.lastElementChild) return;
            isDragging = true;
            startX = e.pageX || e.touches[0].pageX;
            startY = e.pageY || e.touches[0].pageY;
            card.classList.add('dragging');
            document.addEventListener('mousemove', onPointerMove);
            document.addEventListener('mouseup', onPointerEnd);
            document.addEventListener('touchmove', onPointerMove, { passive: true });
            document.addEventListener('touchend', onPointerEnd);
        }
        
        function onPointerMove(e) {
            if (!isDragging) return;
            const currentX = e.pageX || e.touches[0].pageX;
            const currentY = e.pageY || e.touches[0].pageY;
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            const rotation = deltaX / 20;

            card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
            
            // Feedback en tiempo real en las zonas
            if (deltaX > 20) document.querySelector('.swipe-zone-right').classList.add('active');
            else if (deltaX < -20) document.querySelector('.swipe-zone-left').classList.add('active');
            else {
                document.querySelector('.swipe-zone-right').classList.remove('active');
                document.querySelector('.swipe-zone-left').classList.remove('active');
            }
        }

        function onPointerEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            card.classList.remove('dragging');
            document.removeEventListener('mousemove', onPointerMove);
            document.removeEventListener('mouseup', onPointerEnd);
            document.removeEventListener('touchmove', onPointerMove);
            document.removeEventListener('touchend', onPointerEnd);
            
            const deltaX = (e.pageX || e.changedTouches[0].pageX) - startX;
            
            if (Math.abs(deltaX) > 80) { // Umbral de swipe
                const direction = deltaX > 0 ? 'right' : 'left';
                const choice = direction === 'right' ? 'do' : 'dont';
                const isCorrect = choice === card.dataset.type;
                
                const feedbackIcon = card.querySelector('.feedback-icon');
                feedbackIcon.textContent = isCorrect ? '✓' : '✗';
                feedbackIcon.classList.add(isCorrect ? 'correct' : 'incorrect', 'visible');
                
                card.style.transform = `translateX(${deltaX > 0 ? 500 : -500}px) rotate(${deltaX/10}deg)`;
                card.style.opacity = 0;
                
                setTimeout(() => card.remove(), 500);
                updateProgress();
            } else {
                card.style.transform = ''; // Volver al centro
            }
            
            document.querySelector('.swipe-zone-right').classList.remove('active');
            document.querySelector('.swipe-zone-left').classList.remove('active');
        }
        
        card.addEventListener('mousedown', onPointerStart);
        card.addEventListener('touchstart', onPointerStart, { passive: true });
    }

    function initSwipeDeck() {
        swipeData.sort(() => Math.random() - 0.5).forEach(createSwipeCard);
    }
    
    function updateProgress() {
        remainingCards--;
        const percentage = (remainingCards / swipeData.length) * 100;
        progressBar.style.width = `${percentage}%`;
        if (remainingCards === 0) {
            setTimeout(() => {
                swipeDeck.innerHTML = `<div class="swipe-card" style="background:var(--color-azul-degradado);color:var(--color-blanco);cursor:default;">¡Ejercicio Completado!</div>`;
            }, 500);
        }
    }

    initSwipeDeck();
});