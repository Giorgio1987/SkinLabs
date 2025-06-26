document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar efectos del formulario
  initializeFormEffects()

  // Configurar efectos de botones
  setupButtonEffects()

  // Configurar filtros
  setupFilters()

  // Mejorar el calendario
  enhanceCalendar()

  // Configurar modal
  setupModal()

  // Remover overlay después de la carga
  setTimeout(() => {
    removeLoadingOverlay()
  }, 1500)
})

// Crear overlay de carga
function createLoadingOverlay() {
  const overlay = document.createElement("div")
  overlay.className = "loading-overlay"
  overlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Cargando agenda...</div>
    `
  document.body.appendChild(overlay)
}

// Remover overlay de carga
function removeLoadingOverlay() {
  const overlay = document.querySelector(".loading-overlay")
  if (overlay) {
    overlay.classList.add("fade-out")
    setTimeout(() => overlay.remove(), 800)
  }
}

// Crear partículas animadas
function createParticles() {
  const container = document.createElement("div")
  container.className = "particles-container"

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Posición aleatoria
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Delay aleatorio
    particle.style.animationDelay = Math.random() * 8 + "s"

    container.appendChild(particle)
  }

  document.body.appendChild(container)
}

// Inicializar efectos del formulario
function initializeFormEffects() {
  const inputs = document.querySelectorAll(".form-control, .form-select")

  inputs.forEach((input) => {
    // Efecto de focus mejorado
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
      createRippleEffect(this)
    })

    // Efecto de blur
    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused")
      }
    })

    // Efecto de typing
    input.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.classList.add("has-content")
      } else {
        this.classList.remove("has-content")
      }
    })

    // Efecto de hover
    input.addEventListener("mouseenter", function () {
      if (!this.matches(":focus")) {
        this.style.transform = "translateY(-1px)"
      }
    })

    input.addEventListener("mouseleave", function () {
      if (!this.matches(":focus")) {
        this.style.transform = "translateY(0)"
      }
    })
  })
}

// Crear efecto ripple
function createRippleEffect(element) {
  const ripple = document.createElement("span")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: radial-gradient(circle, rgba(248, 175, 153, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `

  element.style.position = "relative"
  element.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

// Configurar efectos de botones
function setupButtonEffects() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Efecto de ondas
      createButtonRipple(this, e)

      // Efecto de loading para botones de búsqueda
      if (this.type === "submit" || this.textContent.includes("Buscar")) {
        handleSearchSubmit(this)
      }
    })

    // Efecto de hover mejorado
    button.addEventListener("mouseenter", function () {
      if (!this.disabled) {
        this.style.transform = "translateY(-3px) scale(1.05)"
      }
    })

    button.addEventListener("mouseleave", function () {
      if (!this.disabled) {
        this.style.transform = "translateY(0) scale(1)"
      }
    })
  })
}

// Crear efecto ripple en botones
function createButtonRipple(button, event) {
  const ripple = document.createElement("span")
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: buttonRipple 0.6s linear;
        pointer-events: none;
    `

  button.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}

// Manejar envío de búsqueda
function handleSearchSubmit(button) {
  const originalContent = button.innerHTML

  // Cambiar a estado de carga
  button.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    <span>Buscando...</span>
  `
  button.disabled = true

  // Crear efecto de búsqueda
  createSearchEffect()

  // Restaurar después de un tiempo (el formulario se enviará naturalmente)
  setTimeout(() => {
    button.innerHTML = originalContent
    button.disabled = false
  }, 2000)
}

// Configurar filtros
function setupFilters() {
  // Configurar botones de limpiar campo
  const clearButtons = document.querySelectorAll(".limpiar-campo")

  clearButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetName = this.getAttribute("data-target")
      const targetField = document.querySelector(`[name="${targetName}"]`)

      if (targetField) {
        targetField.value = ""
        targetField.classList.remove("has-content")
        createClearEffect(targetField)
      }
    })
  })

  // Configurar botón de limpiar todos los filtros
  const clearAllButton = document.getElementById("btnLimpiarFiltros")
  if (clearAllButton) {
    clearAllButton.addEventListener("click", () => {
      const allInputs = document.querySelectorAll(".filter-section input, .filter-section select")

      allInputs.forEach((input, index) => {
        setTimeout(() => {
          input.value = ""
          input.classList.remove("has-content")
          createClearEffect(input)
        }, index * 100)
      })

      showNotification("Filtros limpiados", "info")
    })
  }

  // Auto-completar campos si hay valores en la URL
  populateFiltersFromURL()
}

// Poblar filtros desde URL
function populateFiltersFromURL() {
  const urlParams = new URLSearchParams(window.location.search)

  urlParams.forEach((value, key) => {
    const field = document.querySelector(`[name="${key}"]`)
    if (field && value) {
      field.value = value
      field.classList.add("has-content")
    }
  })
}

// Crear efecto de limpieza
function createClearEffect(element) {
  element.style.animation = "clearEffect 0.5s ease"

  setTimeout(() => {
    element.style.animation = ""
  }, 500)
}

// Mejorar el calendario
function enhanceCalendar() {
  const calendar = document.getElementById("calendar")
  if (!calendar) return

  // Agregar indicador de carga
  calendar.classList.add("loading-calendar")

  // Observar cuando el calendario se carga completamente
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        // El calendario se ha cargado
        setTimeout(() => {
          calendar.classList.remove("loading-calendar")
          enhanceCalendarEvents()
        }, 1000)
      }
    })
  })

  observer.observe(calendar, { childList: true, subtree: true })

  // Mejorar eventos del calendario después de que se cargue
  setTimeout(() => {
    enhanceCalendarEvents()
  }, 2000)
}

// Mejorar eventos del calendario
function enhanceCalendarEvents() {
  // Agregar efectos a los eventos existentes
  const events = document.querySelectorAll(".fc-event")

  events.forEach((event, index) => {
    // Animación de entrada escalonada
    event.style.opacity = "0"
    event.style.transform = "scale(0.8)"

    setTimeout(() => {
      event.style.transition = "all 0.3s ease"
      event.style.opacity = "1"
      event.style.transform = "scale(1)"
    }, index * 50)

    // Efecto de hover mejorado
    event.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
      this.style.zIndex = "10"
    })

    event.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.zIndex = "auto"
    })
  })

  // Mejorar botones del calendario
  const calendarButtons = document.querySelectorAll(".fc-button")
  calendarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      createButtonRipple(this, {
        clientX: this.offsetLeft + this.offsetWidth / 2,
        clientY: this.offsetTop + this.offsetHeight / 2,
      })
    })
  })
}

// Configurar modal
function setupModal() {
  const modal = document.getElementById("detalleTurnoModal")
  if (!modal) return

  modal.addEventListener("show.bs.modal", function () {
    // Efecto de entrada del modal
    this.querySelector(".modal-content").style.transform = "scale(0.8)"
    this.querySelector(".modal-content").style.opacity = "0"

    setTimeout(() => {
      this.querySelector(".modal-content").style.transition = "all 0.3s ease"
      this.querySelector(".modal-content").style.transform = "scale(1)"
      this.querySelector(".modal-content").style.opacity = "1"
    }, 50)
  })

  modal.addEventListener("hide.bs.modal", function () {
    // Efecto de salida del modal
    this.querySelector(".modal-content").style.transform = "scale(0.8)"
    this.querySelector(".modal-content").style.opacity = "0"
  })
}

// Crear efecto de búsqueda
function createSearchEffect() {
  const filterSection = document.querySelector(".filter-section")

  // Efecto de brillo que recorre la sección
  const shine = document.createElement("div")
  shine.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(248, 175, 153, 0.3), transparent);
    animation: searchShine 1.5s ease-in-out;
    pointer-events: none;
    z-index: 10;
  `

  filterSection.style.position = "relative"
  filterSection.appendChild(shine)

  setTimeout(() => shine.remove(), 1500)
}

// Mostrar notificación
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon">${type === "error" ? "⚠️" : "ℹ️"}</i>
            <span>${message}</span>
        </div>
    `

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "error" ? "rgba(220, 53, 69, 0.95)" : "rgba(40, 167, 69, 0.95)"};
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        backdrop-filter: blur(10px);
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.5s ease"
    setTimeout(() => notification.remove(), 500)
  }, 3000)
}

// Agregar estilos CSS adicionales
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
    @keyframes ripple {
        to { transform: translate(-50%, -50%) scale(4); opacity: 0; }
    }
    
    @keyframes buttonRipple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes searchShine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes clearEffect {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); background: rgba(248, 175, 153, 0.2); }
        100% { transform: scale(1); }
    }
    
    .form-control.has-content,
    .form-select.has-content {
        background: rgba(255, 255, 255, 0.12) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    /* Efectos especiales para el calendario */
    .fc-event.highlighted {
        animation: eventPulse 2s ease-in-out infinite;
    }
    
    @keyframes eventPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    /* Efecto de carga para el calendario */
    .loading-calendar::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 4px solid rgba(248, 175, 153, 0.3);
        border-top: 4px solid var(--coral-salmon);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 100;
    }
`
document.head.appendChild(additionalStyles)

// Funciones de utilidad adicionales

// Resaltar eventos que coinciden con filtros
function highlightMatchingEvents(searchTerm) {
  const events = document.querySelectorAll(".fc-event")

  events.forEach((event) => {
    const title = event.querySelector(".fc-event-title")?.textContent || ""

    if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
      event.classList.add("highlighted")
    } else {
      event.classList.remove("highlighted")
    }
  })
}

// Agregar efectos de teclado para accesibilidad
document.addEventListener("keydown", (e) => {
  // Ctrl + F para enfocar el campo de búsqueda de cliente
  if (e.ctrlKey && e.key === "f") {
    e.preventDefault()
    const clienteInput = document.querySelector('input[name="cliente"]')
    if (clienteInput) {
      clienteInput.focus()
      clienteInput.select()
    }
  }

  // Escape para limpiar filtros
  if (e.key === "Escape") {
    const clearAllButton = document.getElementById("btnLimpiarFiltros")
    if (clearAllButton) {
      clearAllButton.click()
    }
  }

  // Enter en campos de filtro para buscar
  if (e.key === "Enter" && e.target.closest(".filter-section")) {
    const submitButton = document.querySelector('.filter-section button[type="submit"]')
    if (submitButton) {
      submitButton.click()
    }
  }
})

// Efecto de parallax sutil para las partículas
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const particles = document.querySelectorAll(".particle")

  particles.forEach((particle, index) => {
    const speed = ((index % 3) + 1) * 0.3
    particle.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Mejorar la experiencia del usuario con el calendario
function improveCalendarUX() {
  // Agregar tooltips a los eventos
  const events = document.querySelectorAll(".fc-event")

  events.forEach((event) => {
    event.setAttribute("title", "Haz clic para ver detalles")

    // Efecto de preview al hover
    event.addEventListener("mouseenter", function () {
      const preview = document.createElement("div")
      preview.className = "event-preview"
      preview.innerHTML = `
        <div style="
          position: absolute;
          background: rgba(56, 26, 75, 0.95);
          color: white;
          padding: 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          z-index: 1000;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(248, 175, 153, 0.3);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        ">
          ${this.querySelector(".fc-event-title")?.textContent || "Evento"}
        </div>
      `

      this.appendChild(preview)
    })

    event.addEventListener("mouseleave", function () {
      const preview = this.querySelector(".event-preview")
      if (preview) {
        preview.remove()
      }
    })
  })
}

// Ejecutar mejoras del calendario después de que se cargue
setTimeout(() => {
  improveCalendarUX()
}, 3000)

// Auto-refresh del calendario cada 5 minutos
setInterval(() => {
  const calendar = document.getElementById("calendar")
  if (calendar && window.calendar) {
    // Si hay una instancia de FullCalendar, refrescarla
    try {
      window.calendar.refetchEvents()
      showNotification("Agenda actualizada", "info")
    } catch (error) {
      console.log("No se pudo actualizar automáticamente")
    }
  }
}, 300000) // 5 minutos
