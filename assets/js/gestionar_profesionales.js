document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar efectos de la interfaz
  initializeInterfaceEffects()

  // Configurar efectos de botones
  setupButtonEffects()

  // Configurar efectos de tabla
  setupTableEffects()

  // Configurar efectos de modales
  setupModalEffects()

  // Configurar efectos de formularios
  setupFormEffects()

  // Configurar notificaciones
  setupNotifications()

  // Cargar profesionales con efectos
  loadProfessionalsWithEffects()

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
        <div class="loading-text">Cargando gestión de profesionales...</div>
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

// Inicializar efectos de la interfaz
function initializeInterfaceEffects() {
  // Efecto de aparición escalonada para elementos
  const elements = document.querySelectorAll(".btn, .table, h4")
  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"

    setTimeout(
      () => {
        element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      },
      index * 200 + 500,
    )
  })

  // Efecto de typing en el título
  const title = document.querySelector("h4")
  if (title) {
    const originalText = title.textContent
    title.textContent = ""

    setTimeout(() => {
      typeWriter(title, originalText, 0, 100)
    }, 1000)
  }
}

// Efecto de máquina de escribir
function typeWriter(element, text, index, speed) {
  if (index < text.length) {
    element.textContent += text.charAt(index)
    setTimeout(() => typeWriter(element, text, index + 1, speed), speed)
  }
}

// Configurar efectos de botones
function setupButtonEffects() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    // Efecto ripple al hacer click
    button.addEventListener("click", function (e) {
      createButtonRipple(this, e)
    })

    // Efecto de hover mejorado
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    // Efecto de focus para accesibilidad
    button.addEventListener("focus", function () {
      this.style.boxShadow = "0 0 0 3px rgba(248, 175, 153, 0.5)"
    })

    button.addEventListener("blur", function () {
      this.style.boxShadow = ""
    })
  })

  // Configurar botón de nuevo profesional
  const newProfessionalBtn = document.querySelector('[data-bs-target="#modalAgregar"]')
  if (newProfessionalBtn) {
    newProfessionalBtn.addEventListener("click", function () {
      createSparkleEffect(this)
      showNotification("Abriendo formulario de nuevo profesional", "info")
    })
  }
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

// Crear efecto de chispas
function createSparkleEffect(element) {
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div")
    sparkle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--coral-salmon);
      border-radius: 50%;
      pointer-events: none;
      animation: sparkle 1s ease-out forwards;
    `

    const rect = element.getBoundingClientRect()
    sparkle.style.left = rect.left + rect.width / 2 + "px"
    sparkle.style.top = rect.top + rect.height / 2 + "px"

    document.body.appendChild(sparkle)

    // Animación de dispersión
    const angle = (i / 8) * Math.PI * 2
    const distance = 50
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    sparkle.style.setProperty("--x", x + "px")
    sparkle.style.setProperty("--y", y + "px")

    setTimeout(() => sparkle.remove(), 1000)
  }
}

// Configurar efectos de tabla
function setupTableEffects() {
  const table = document.querySelector(".table")
  if (!table) return

  // Observador para animar filas cuando se agregan
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.tagName === "TR") {
          animateNewRow(node)
        }
      })
    })
  })

  const tbody = table.querySelector("tbody")
  if (tbody) {
    observer.observe(tbody, { childList: true })
  }

  // Configurar efectos de hover en filas existentes
  setupRowHoverEffects()
}

// Configurar efectos de hover en filas
function setupRowHoverEffects() {
  const rows = document.querySelectorAll(".table tbody tr")

  rows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.background = "rgba(248, 175, 153, 0.1)"
      this.style.transform = "translateX(10px) scale(1.02)"
      this.style.boxShadow = "0 10px 30px rgba(248, 175, 153, 0.2)"

      // Efecto en indicador de color
      const colorIndicator = this.querySelector(".color-indicator")
      if (colorIndicator) {
        colorIndicator.style.transform = "scale(1.2)"
        colorIndicator.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.4)"
      }
    })

    row.addEventListener("mouseleave", function () {
      this.style.background = "rgba(255, 255, 255, 0.03)"
      this.style.transform = "translateX(0) scale(1)"
      this.style.boxShadow = "none"

      // Restaurar indicador de color
      const colorIndicator = this.querySelector(".color-indicator")
      if (colorIndicator) {
        colorIndicator.style.transform = "scale(1)"
        colorIndicator.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)"
      }
    })
  })
}

// Animar nueva fila
function animateNewRow(row) {
  row.style.opacity = "0"
  row.style.transform = "translateY(30px) scale(0.9)"
  row.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"

  setTimeout(() => {
    row.style.opacity = "1"
    row.style.transform = "translateY(0) scale(1)"
  }, 100)

  // Efecto de brillo
  setTimeout(() => {
    row.classList.add("success-glow")
    setTimeout(() => row.classList.remove("success-glow"), 2000)
  }, 600)
}

// Configurar efectos de modales
function setupModalEffects() {
  const modals = document.querySelectorAll(".modal")

  modals.forEach((modal) => {
    modal.addEventListener("show.bs.modal", function () {
      const modalContent = this.querySelector(".modal-content")
      modalContent.style.transform = "scale(0.8) translateY(-50px)"
      modalContent.style.opacity = "0"

      setTimeout(() => {
        modalContent.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        modalContent.style.transform = "scale(1) translateY(0)"
        modalContent.style.opacity = "1"
      }, 100)
    })

    modal.addEventListener("hide.bs.modal", function () {
      const modalContent = this.querySelector(".modal-content")
      modalContent.style.transform = "scale(0.8) translateY(-50px)"
      modalContent.style.opacity = "0"
    })
  })
}

// Configurar efectos de formularios
function setupFormEffects() {
  const inputs = document.querySelectorAll(".form-control, .form-select")

  inputs.forEach((input) => {
    // Efecto de focus
    input.addEventListener("focus", function () {
      createInputRipple(this)
    })

    // Efecto de validación en tiempo real
    input.addEventListener("input", function () {
      validateFieldRealTime(this)
    })

    // Efecto de hover
    input.addEventListener("mouseenter", function () {
      if (!this.matches(":focus")) {
        this.style.transform = "translateY(-2px)"
      }
    })

    input.addEventListener("mouseleave", function () {
      if (!this.matches(":focus")) {
        this.style.transform = "translateY(0)"
      }
    })
  })

  // Configurar input de color
  const colorInputs = document.querySelectorAll('input[type="color"]')
  colorInputs.forEach((input) => {
    input.addEventListener("change", function () {
      createColorChangeEffect(this)
    })
  })
}

// Crear efecto ripple en inputs
function createInputRipple(input) {
  const ripple = document.createElement("span")
  const rect = input.getBoundingClientRect()

  ripple.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(248, 175, 153, 0.3) 0%, transparent 70%);
        border-radius: 15px;
        animation: inputRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `

  input.style.position = "relative"
  input.parentElement.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

// Validación en tiempo real
function validateFieldRealTime(field) {
  const value = field.value.trim()
  const fieldName = field.name || field.id

  let isValid = true
  let message = ""

  // Validaciones específicas
  switch (fieldName) {
    case "nombre":
      isValid = value.length >= 2
      message = isValid ? "✓ Nombre válido" : "✗ Mínimo 2 caracteres"
      break
    case "especialidad":
      isValid = value.length >= 3
      message = isValid ? "✓ Especialidad válida" : "✗ Mínimo 3 caracteres"
      break
    case "color":
      isValid = /^#[0-9A-F]{6}$/i.test(value)
      message = isValid ? "✓ Color válido" : "✗ Formato de color inválido"
      break
  }

  // Aplicar estilos de validación
  field.classList.remove("is-valid", "is-invalid")
  if (value) {
    field.classList.add(isValid ? "is-valid" : "is-invalid")
    showFieldMessage(field, message, isValid)
  } else {
    removeFieldMessage(field)
  }
}

// Mostrar mensaje de validación
function showFieldMessage(field, message, isValid) {
  let messageEl = field.parentElement.querySelector(".validation-message")

  if (!messageEl) {
    messageEl = document.createElement("div")
    messageEl.className = "validation-message"
    field.parentElement.appendChild(messageEl)
  }

  messageEl.textContent = message
  messageEl.style.cssText = `
        font-size: 0.8rem;
        margin-top: 5px;
        padding: 5px 10px;
        border-radius: 10px;
        transition: all 0.3s ease;
        color: ${isValid ? "#28a745" : "#dc3545"};
        background: ${isValid ? "rgba(40, 167, 69, 0.1)" : "rgba(220, 53, 69, 0.1)"};
        border: 1px solid ${isValid ? "rgba(40, 167, 69, 0.3)" : "rgba(220, 53, 69, 0.3)"};
    `
}

// Remover mensaje de validación
function removeFieldMessage(field) {
  const messageEl = field.parentElement.querySelector(".validation-message")
  if (messageEl) {
    messageEl.remove()
  }
}

// Efecto de cambio de color
function createColorChangeEffect(colorInput) {
  const color = colorInput.value
  const effect = document.createElement("div")

  effect.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: ${color};
    border-radius: 50%;
    opacity: 0.8;
    animation: colorBurst 1s ease-out forwards;
    pointer-events: none;
    z-index: 10000;
  `

  document.body.appendChild(effect)
  setTimeout(() => effect.remove(), 1000)
}

// Configurar notificaciones
function setupNotifications() {
  // Crear contenedor de notificaciones si no existe
  if (!document.querySelector(".toast-container")) {
    const container = document.createElement("div")
    container.className = "toast-container"
    document.body.appendChild(container)
  }
}

// Mostrar notificación
function showNotification(message, type = "info", duration = 4000) {
  const container = document.querySelector(".toast-container")
  const toast = document.createElement("div")
  toast.className = "toast show"

  const iconMap = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  }

  toast.innerHTML = `
    <div class="toast-header">
      <span class="me-2">${iconMap[type] || iconMap.info}</span>
      <strong class="me-auto">SkinLabs</strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `

  container.appendChild(toast)

  // Auto-remover después del tiempo especificado
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  }, duration)

  // Configurar botón de cerrar
  const closeBtn = toast.querySelector(".btn-close")
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  })
}

// Cargar profesionales con efectos
function loadProfessionalsWithEffects() {
  // Esta función se integraría con el sistema existente de carga
  // Por ahora simula la carga con efectos visuales

  const tbody = document.querySelector("#tablaProfesionales")
  if (!tbody) return

  // Mostrar indicador de carga
  tbody.innerHTML = `
    <tr>
      <td colspan="4" class="text-center">
        <div class="loading-spinner mx-auto mb-2"></div>
        <div>Cargando profesionales...</div>
      </td>
    </tr>
  `

  // Simular carga (esto se reemplazaría con la lógica real)
  setTimeout(() => {
    // Aquí se cargarían los datos reales
    showNotification("Profesionales cargados exitosamente", "success")
  }, 1000)
}

// Funciones para integrar con el sistema existente
function addProfessionalWithEffects(professionalData) {
  // Agregar profesional con efectos visuales
  showNotification("Agregando nuevo profesional...", "info")

  // Aquí se haría la llamada AJAX real
  // Por ahora solo mostramos el efecto
  setTimeout(() => {
    showNotification("Profesional agregado exitosamente", "success")
    // Recargar tabla con efectos
    loadProfessionalsWithEffects()
  }, 1000)
}

function editProfessionalWithEffects(id, professionalData) {
  // Editar profesional con efectos visuales
  const row = document.querySelector(`tr[data-id="${id}"]`)
  if (row) {
    row.classList.add("loading-row")
  }

  showNotification("Actualizando profesional...", "info")

  // Aquí se haría la llamada AJAX real
  setTimeout(() => {
    if (row) {
      row.classList.remove("loading-row")
      row.classList.add("success-glow")
      setTimeout(() => row.classList.remove("success-glow"), 2000)
    }
    showNotification("Profesional actualizado exitosamente", "success")
  }, 1000)
}

function deleteProfessionalWithEffects(id) {
  // Eliminar profesional con efectos visuales
  const row = document.querySelector(`tr[data-id="${id}"]`)
  if (row) {
    row.style.animation = "errorShake 0.5s ease-in-out"

    setTimeout(() => {
      row.style.animation = "fadeOut 0.5s ease-out forwards"
      setTimeout(() => {
        row.remove()
        showNotification("Profesional eliminado exitosamente", "success")
      }, 500)
    }, 500)
  }
}

// Agregar estilos CSS adicionales
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
    @keyframes buttonRipple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes inputRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    @keyframes sparkle {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
    }
    
    @keyframes colorBurst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.4; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-100%); }
    }
    
    .form-control.is-valid,
    .form-select.is-valid {
        border-color: #28a745 !important;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25) !important;
    }
    
    .form-control.is-invalid,
    .form-select.is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25) !important;
    }
`
document.head.appendChild(additionalStyles)

// Efecto de parallax sutil para las partículas
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const particles = document.querySelectorAll(".particle")

  particles.forEach((particle, index) => {
    const speed = ((index % 3) + 1) * 0.3
    particle.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Atajos de teclado
document.addEventListener("keydown", (e) => {
  // Ctrl+N para nuevo profesional
  if (e.ctrlKey && e.key === "n") {
    e.preventDefault()
    const newBtn = document.querySelector('[data-bs-target="#modalAgregar"]')
    if (newBtn) {
      newBtn.click()
    }
  }

  // Escape para cerrar modales
  if (e.key === "Escape") {
    const openModals = document.querySelectorAll(".modal.show")
    openModals.forEach((modal) => {
      const bsModal = window.bootstrap.Modal.getInstance(modal)
      if (bsModal) {
        bsModal.hide()
      }
    })
  }
})

// Exportar funciones para uso global
window.SkinLabsProfessionals = {
  addProfessionalWithEffects,
  editProfessionalWithEffects,
  deleteProfessionalWithEffects,
  showNotification,
}
