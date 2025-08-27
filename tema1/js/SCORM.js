// SCORM.js

class ScormManager {
  static init() {
    if (typeof API !== "undefined") {
      API.LMSInitialize("");
      API.LMSSetValue("cmi.lesson_status", "incomplete");
      API.LMSCommit("");
    } 
    // else {
    //   console.log("SCORM no disponible. Modo web.");
    // }
  }

  static guardarProgreso(pagina) {
    // Remover 'views/' del inicio de la ruta si existe
    pagina = pagina.replace('views/', '');
    
    const paginasCurso = ScormManager.paginasCurso;
    const paginaIndex = paginasCurso.indexOf(pagina);

    if (paginaIndex === -1) {
      console.warn("Página no registrada en el curso:", pagina);
      return;
    }

    const porcentaje = Math.round(((paginaIndex + 1) / paginasCurso.length) * 100);

    if (typeof API !== "undefined") {
      API.LMSSetValue("cmi.core.lesson_location", pagina);
      API.LMSSetValue("cmi.core.score.raw", porcentaje.toString());
      if (porcentaje === 100) {
        API.LMSSetValue("cmi.lesson_status", "completed");
      }
      API.LMSCommit("");
    } else {
      localStorage.setItem("ultimaPagina", pagina);
      localStorage.setItem("porcentaje", porcentaje);
    }

    // Actualizar la barra de progreso visual
    const barra = document.getElementById("progreso-barra");
    const texto = document.getElementById("progreso-texto");
    if (barra && texto) {
      barra.style.width = porcentaje + "%";
      texto.textContent = porcentaje + "%";
    }

    // console.log(`✅ Progreso guardado: ${porcentaje}% (${pagina})`);
  }

  static cargarProgreso() {
    if (typeof API !== "undefined") {
      const pagina = API.LMSGetValue("cmi.core.lesson_location");
      const score = API.LMSGetValue("cmi.core.score.raw");
      return { ultimaPagina: pagina, score };
    } else {
      const pagina = localStorage.getItem("ultimaPagina");
      const score = localStorage.getItem("porcentaje");
      return { ultimaPagina: pagina, score };
    }
  }
}

// 👉 Lista actualizada de páginas del curso según el menú actual
ScormManager.paginasCurso = [

  // Módulo 1: Acabados superficiales
  "M1_inicio.html",
  "M1_pagina1.html",
  "M1_pagina2.html", 
  "M1_pagina3.html",
  "M1_pagina4.html",

  
  // Módulo 2: Selección de la clase según la aplicación
  "M2_inicio.html",
  "M2_pagina1.html",
  "M2_pagina2.html", 


  // Módulo 3: Obtención de clase según proceso
  "M3_inicio.html",
  "M3_pagina1.html",
  "M3_pagina2.html", 
  "M3_pagina3.html", 
  "M3_pagina4.html", 

  // Módulo 4: Instrumentos de medición
  "M4_inicio.html",
  "M4_pagina1.html",
  "M4_pagina2.html", 
  "M4_pagina3.html",

  // Conclusiones
  "conclusiones.html"
];

// 👉 Lo hace accesible globalmente
window.ScormManager = ScormManager;
