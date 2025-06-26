document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar efectos del formulario
  initializeFormEffects()

  // Configurar efectos de botones
  setupButtonEffects()

  // Configurar barra de progreso
  setupProgressBar()

  // Configurar fecha mínima
  setMinimumDate()

  // Mejorar alertas existentes
  enhanceExistingAlerts()

  // Configurar confirmación de eliminación
  setupDeleteConfirmation()

  // Configurar efectos de tabla
  setupTableEffects()

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
        <div class="loading-text">Cargando sistema...</div>
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

  for (let i = 0; i < 25; i++) {
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
  const inputs = document.querySelectorAll(".form-control")

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

      // Si es el botón de buscar, mostrar efecto de carga
      if (this.name === "buscar_fecha") {
        const fechaInput = document.querySelector('input[name="fecha"]')
        if (!fechaInput.value) {
          e.preventDefault()
          showNotification("Por favor, selecciona una fecha", "error")
          fechaInput.focus()
          return
        }

        // Mostrar efecto de búsqueda
        e.preventDefault()
        searchWithAnimation(this)
      }
    })

    // Efecto de hover mejorado
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
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

// Buscar con animación
function searchWithAnimation(button) {
  const form = button.closest("form")
  const originalText = button.innerHTML

  // Cambiar texto del botón
  button.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    <span>Buscando turnos...</span>
  `
  button.disabled = true

  // Crear efecto de búsqueda
  createSearchEffect()

  // Enviar el formulario después de mostrar los efectos
  setTimeout(() => {
    form.submit()
  }, 1200)
}

// Configurar barra de progreso
function setupProgressBar() {
  const progressBar = document.createElement("div")
  progressBar.className = "form-progress"
  progressBar.style.width = "0%"

  const card = document.querySelector(".card")
  card.appendChild(progressBar)

  // Actualizar progreso basado en si hay fecha seleccionada
  const fechaInput = document.querySelector('input[name="fecha"]')
  if (fechaInput) {
    fechaInput.addEventListener("input", () => {
      const progress = fechaInput.value ? 100 : 0
      progressBar.style.width = progress + "%"
    })
  }
}

// Configurar fecha mínima
function setMinimumDate() {
  const fechaInput = document.querySelector('input[name="fecha"]')
  if (fechaInput) {
    // Permitir fechas pasadas para buscar turnos históricos
    const today = new Date()
    today.setMonth(today.getMonth() - 6) // Permitir hasta 6 meses atrás
    const formattedDate = today.toISOString().split("T")[0]
    fechaInput.setAttribute("min", formattedDate)
  }
}

// Mejorar alertas existentes
function enhanceExistingAlerts() {
  const alerts = document.querySelectorAll(".alert")

  alerts.forEach((alert) => {
    // Agregar efecto de entrada
    alert.style.opacity = "0"
    alert.style.transform = "translateY(-30px)"

    setTimeout(() => {
      alert.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      alert.style.opacity = "1"
      alert.style.transform = "translateY(0)"
    }, 100)

    // Agregar botón de cerrar
    const closeButton = document.createElement("button")
    closeButton.innerHTML = "×"
    closeButton.className = "btn-close"
    closeButton.style.cssText = `
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.8;
      transition: all 0.3s ease;
      z-index: 10;
    `

    closeButton.addEventListener("click", () => {
      alert.style.animation = "slideOutUp 0.5s ease"
      setTimeout(() => alert.remove(), 500)
    })

    closeButton.addEventListener("mouseenter", () => {
      closeButton.style.opacity = "1"
      closeButton.style.transform = "scale(1.1)"
    })

    closeButton.addEventListener("mouseleave", () => {
      closeButton.style.opacity = "0.8"
      closeButton.style.transform = "scale(1)"
    })

    alert.style.position = "relative"
    alert.appendChild(closeButton)

    // Padding para el emoji
    if (
      alert.classList.contains("alert-success") ||
      alert.classList.contains("alert-danger") ||
      alert.classList.contains("alert-warning")
    ) {
      alert.style.paddingLeft = "60px"
    }
  })
}

// Configurar confirmación de eliminación
function setupDeleteConfirmation() {
  const deleteButtons = document.querySelectorAll('.btn-danger[onclick*="confirm"]')

  deleteButtons.forEach((button) => {
    // Remover el onclick original
    button.removeAttribute("onclick")

    button.addEventListener("click", function (e) {
      e.preventDefault()
      showCustomConfirmDialog(this)
    })
  })
}

// Mostrar diálogo de confirmación personalizado
function showCustomConfirmDialog(button) {
  const form = button.closest("form")
  const patientName = button.closest("tr").querySelector("td:first-child").textContent
  const appointmentTime = button.closest("tr").querySelector("td:nth-child(5)").textContent

  // Crear overlay del modal
  const overlay = document.createElement("div")
  overlay.className = "confirm-overlay"
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(56, 26, 75, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  // Crear modal
  const modal = document.createElement("div")
  modal.className = "confirm-modal"
  modal.style.cssText = `
    background: linear-gradient(135deg, var(--purpura-oscuro), var(--purpura-profundo));
    border-radius: 20px;
    padding: 40px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(243, 205, 200, 0.2);
    transform: scale(0.8);
    transition: transform 0.3s ease;
  `

  modal.innerHTML = `
    <div style="font-size: 4rem; margin-bottom: 20px; animation: shake 0.5s ease-in-out;">⚠️</div>
    <h3 style="color: var(--rosa-melocoton); margin-bottom: 20px; font-family: 'Playfair Display', serif;">
      ¿Eliminar Turno?
    </h3>
    <p style="color: var(--blanco-cosmico); margin-bottom: 10px; opacity: 0.9;">
      <strong>Paciente:</strong> ${patientName}
    </p>
    <p style="color: var(--blanco-cosmico); margin-bottom: 30px; opacity: 0.9;">
      <strong>Hora:</strong> ${appointmentTime}
    </p>
    <p style="color: var(--coral-salmon); margin-bottom: 30px; font-weight: 500;">
      Esta acción no se puede deshacer
    </p>
    <div style="display: flex; gap: 20px; justify-content: center;">
      <button class="btn-confirm-delete" style="
        background: linear-gradient(135deg, #dc3545, #b02a37);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      ">Sí, Eliminar</button>
      <button class="btn-cancel" style="
        background: rgba(255, 255, 255, 0.1);
        color: var(--blanco-cosmico);
        border: 2px solid rgba(243, 205, 200, 0.3);
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      ">Cancelar</button>
    </div>
  `

  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  // Mostrar modal con animación
  setTimeout(() => {
    overlay.style.opacity = "1"
    modal.style.transform = "scale(1)"
  }, 10)

  // Configurar botones del modal
  const confirmBtn = modal.querySelector(".btn-confirm-delete")
  const cancelBtn = modal.querySelector(".btn-cancel")

  confirmBtn.addEventListener("click", () => {
    // Crear efecto de eliminación
    createDeleteEffect()

    // Cerrar modal
    closeModal(overlay)

    // Enviar formulario después de un breve delay
    setTimeout(() => {
      form.submit()
    }, 800)
  })

  cancelBtn.addEventListener("click", () => {
    closeModal(overlay)
  })

  // Cerrar con click fuera del modal
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal(overlay)
    }
  })

  // Cerrar con Escape
  document.addEventListener("keydown", function escapeHandler(e) {
    if (e.key === "Escape") {
      closeModal(overlay)
      document.removeEventListener("keydown", escapeHandler)
    }
  })
}

// Cerrar modal
function closeModal(overlay) {
  const modal = overlay.querySelector(".confirm-modal")
  overlay.style.opacity = "0"
  modal.style.transform = "scale(0.8)"

  setTimeout(() => {
    overlay.remove()
  }, 300)
}

// Configurar efectos de tabla
function setupTableEffects() {
  const table = document.querySelector(".table")
  if (!table) return

  // Agregar efectos de hover a las filas
  const rows = table.querySelectorAll("tbody tr")

  rows.forEach((row, index) => {
    // Animación de entrada escalonada
    row.style.opacity = "0"
    row.style.transform = "translateX(-30px)"

    setTimeout(
      () => {
        row.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        row.style.opacity = "1"
        row.style.transform = "translateX(0)"
      },
      index * 100 + 500,
    )

    // Efecto de hover mejorado
    row.addEventListener("mouseenter", function () {
      this.style.background = "rgba(248, 175, 153, 0.1)"
      this.style.transform = "translateX(10px) scale(1.02)"
    })

    row.addEventListener("mouseleave", function () {
      this.style.background = "rgba(255, 255, 255, 0.03)"
      this.style.transform = "translateX(0) scale(1)"
    })
  })
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
  }, 4000)
}

// Crear efecto de búsqueda
function createSearchEffect() {
  const card = document.querySelector(".card")

  // Efecto de brillo que recorre la card
  const shine = document.createElement("div")
  shine.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(248, 175, 153, 0.3), transparent);
    animation: searchShine 1.2s ease-in-out;
    pointer-events: none;
    z-index: 10;
  `

  card.style.position = "relative"
  card.appendChild(shine)

  setTimeout(() => shine.remove(), 1200)
}

// Crear efecto de eliminación
function createDeleteEffect() {
  const card = document.querySelector(".card")

  // Efecto de brillo rojo que recorre la card
  const shine = document.createElement("div")
  shine.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(220, 53, 69, 0.4), transparent);
    animation: deleteShine 0.8s ease-in-out;
    pointer-events: none;
    z-index: 10;
  `

  card.style.position = "relative"
  card.appendChild(shine)

  setTimeout(() => shine.remove(), 800)
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
    
    @keyframes slideOutUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-30px); opacity: 0; }
    }
    
    @keyframes searchShine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes deleteShine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    .btn-confirm-delete:hover {
        background: linear-gradient(135deg, #b02a37, #dc3545) !important;
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 10px 25px rgba(220, 53, 69, 0.4);
    }
    
    .btn-cancel:hover {
        background: rgba(255, 255, 255, 0.2) !important;
        border-color: var(--rosa-melocoton) !important;
        color: var(--rosa-melocoton) !important;
        transform: translateY(-2px) scale(1.05);
    }
`
document.head.appendChild(additionalStyles)

// Agregar efectos de teclado para accesibilidad
document.addEventListener("keydown", (e) => {
  // Enter en el campo de fecha para buscar automáticamente
  if (e.key === "Enter" && e.target.matches('input[name="fecha"]')) {
    e.preventDefault()
    const buscarBtn = document.querySelector('button[name="buscar_fecha"]')
    if (buscarBtn) {
      buscarBtn.click()
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
