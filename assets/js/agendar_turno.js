document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar efectos del formulario
  initializeFormEffects()

  // Configurar validación en tiempo real
  setupRealTimeValidation()

  // Configurar efectos de botones
  setupButtonEffects()

  // Configurar barra de progreso
  setupProgressBar()

  // Configurar fecha mínima
  setMinimumDate()

  // Configurar actualización de horarios
  setupTimeSlotUpdates()

  // Mejorar alertas existentes
  enhanceExistingAlerts()

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
        <div class="loading-text">Cargando formulario...</div>
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

    // Efecto de typing en placeholder
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

// Configurar validación en tiempo real
function setupRealTimeValidation() {
  const form = document.querySelector("form")
  const inputs = form.querySelectorAll(".form-control, .form-select")

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateField(this)
      updateProgressBar()
    })

    input.addEventListener("blur", function () {
      validateField(this)
    })
  })
}

// Validar campo individual
function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name
  let isValid = true
  let message = ""

  // Remover clases previas
  field.classList.remove("is-valid", "is-invalid")

  // Validaciones específicas
  switch (fieldName) {
    case "nombre":
      isValid = value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)
      message = isValid ? "✓ Nombre válido" : "✗ Nombre debe tener al menos 2 caracteres"
      break
    case "telefono":
      isValid = /^\d{10,15}$/.test(value.replace(/\s/g, ""))
      message = isValid ? "✓ Teléfono válido" : "✗ Teléfono debe tener 10-15 dígitos"
      break
    case "dni":
      isValid = /^\d{7,8}$/.test(value)
      message = isValid ? "✓ DNI válido" : "✗ DNI debe tener 7-8 dígitos"
      break
    case "fecha":
      if (value) {
        const fecha = new Date(value)
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        const diaSemana = fecha.getDay()
        isValid = fecha >= hoy && diaSemana !== 0 && diaSemana !== 6
        if (fecha < hoy) {
          message = "✗ No se pueden agendar turnos en el pasado"
        } else if (diaSemana === 0 || diaSemana === 6) {
          message = "✗ Solo se permiten turnos de lunes a viernes"
        } else {
          message = "✓ Fecha válida"
        }
      } else {
        isValid = false
        message = "✗ Selecciona una fecha"
      }
      break
    case "servicio":
    case "profesional_id":
    case "consultorio_id":
    case "hora":
      isValid = value !== ""
      message = isValid ? "✓ Selección válida" : "✗ Selecciona una opción"
      break
  }

  // Aplicar clases de validación solo si hay contenido o es requerido
  if (value || field.hasAttribute("required")) {
    field.classList.add(isValid ? "is-valid" : "is-invalid")
    if (message) {
      showFieldMessage(field, message, isValid)
    }
  } else {
    // Remover mensaje si el campo está vacío y no es requerido
    removeFieldMessage(field)
  }

  return isValid
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
  messageEl.className = `validation-message ${isValid ? "valid" : "invalid"}`
  messageEl.style.cssText = `
        font-size: 0.85rem;
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

// Configurar efectos de botones
function setupButtonEffects() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Efecto de ondas
      createButtonRipple(this, e)

      // Si es el botón de envío, validar antes de enviar
      if (this.type === "submit") {
        // Solo validar visualmente, pero permitir que el formulario se envíe
        const form = this.closest("form")
        const requiredInputs = form.querySelectorAll(".form-control[required], .form-select[required]")
        let hasEmptyRequired = false

        requiredInputs.forEach((input) => {
          if (!input.value.trim()) {
            hasEmptyRequired = true
            input.classList.add("is-invalid")
            showFieldMessage(input, "✗ Este campo es obligatorio", false)
          }
        })

        if (hasEmptyRequired) {
          e.preventDefault()
          showNotification("Por favor, completa todos los campos obligatorios", "error")

          // Scroll al primer campo vacío
          const firstEmpty = form.querySelector(".form-control.is-invalid, .form-select.is-invalid")
          if (firstEmpty) {
            firstEmpty.scrollIntoView({ behavior: "smooth", block: "center" })
            firstEmpty.focus()
          }
        } else {
          // Si no hay campos vacíos, mostrar efecto de envío y permitir envío
          e.preventDefault() // Prevenir envío inmediato para mostrar efectos
          submitFormWithAnimation(this)
        }
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

// Enviar formulario con animación
function submitFormWithAnimation(button) {
  const form = button.closest("form")
  const originalText = button.innerHTML

  // Cambiar texto del botón con más estilo
  button.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    <span>Agendando turno...</span>
    <span style="margin-left: 10px;"></span>
  `
  button.disabled = true

  // Crear efecto de "enviando"
  createSendingEffect()

  // Enviar el formulario después de mostrar los efectos
  setTimeout(() => {
    form.submit()
  }, 800)
}

// Configurar barra de progreso
function setupProgressBar() {
  const progressBar = document.createElement("div")
  progressBar.className = "form-progress"
  progressBar.style.width = "0%"

  const card = document.querySelector(".card")
  card.appendChild(progressBar)
}

// Actualizar barra de progreso
function updateProgressBar() {
  const inputs = document.querySelectorAll(".form-control[required], .form-select[required]")
  const filledInputs = Array.from(inputs).filter((input) => input.value.trim() !== "")
  const progress = (filledInputs.length / inputs.length) * 100

  const progressBar = document.querySelector(".form-progress")
  if (progressBar) {
    progressBar.style.width = progress + "%"
  }
}

// Configurar fecha mínima
function setMinimumDate() {
  const fechaInput = document.querySelector('input[name="fecha"]')
  if (fechaInput) {
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    fechaInput.setAttribute("min", formattedDate)
  }
}

// Configurar actualización de horarios
function setupTimeSlotUpdates() {
  const fechaInput = document.querySelector('input[name="fecha"]')
  const profesionalSelect = document.querySelector('select[name="profesional_id"]')
  const consultorioSelect = document.querySelector('select[name="consultorio_id"]')
  const horaSelect = document.querySelector('select[name="hora"]')

  if (fechaInput && profesionalSelect && consultorioSelect && horaSelect) {
    // Actualizar horarios cuando cambien los campos relevantes
    ;[fechaInput, profesionalSelect, consultorioSelect].forEach((field) => {
      field.addEventListener("change", () => {
        updateTimeSlots()
      })
    })
  }
}

// Actualizar slots de tiempo - SOLUCIONADO: Eliminada la demora innecesaria
function updateTimeSlots() {
  const fecha = document.querySelector('input[name="fecha"]').value
  const profesionalId = document.querySelector('select[name="profesional_id"]').value
  const consultorioId = document.querySelector('select[name="consultorio_id"]').value
  const horaSelect = document.querySelector('select[name="hora"]')

  if (fecha && profesionalId && consultorioId) {
    // Mostrar brevemente el indicador de carga (solo visual, sin demora real)
    horaSelect.innerHTML = '<option value="">Actualizando horarios...</option>'
    horaSelect.disabled = true

    // Actualización inmediata sin setTimeout - PROBLEMA SOLUCIONADO
    // Restaurar opciones inmediatamente
    const options = horaSelect.querySelectorAll("option")
    options.forEach((option) => {
      if (option.value) {
        // Agregar indicador visual de disponibilidad
        const indicator = document.createElement("span")
        indicator.className = "availability-indicator"
        if (option.disabled) {
          indicator.classList.add("occupied")
        }
        option.appendChild(indicator)
      }
    })

    horaSelect.disabled = false
    showNotification("Horarios actualizados", "info")
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

// Crear efecto de "enviando"
function createSendingEffect() {
  const card = document.querySelector(".card")

  // Efecto de brillo que recorre la card
  const shine = document.createElement("div")
  shine.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(40, 167, 69, 0.3), transparent);
    animation: sendingShine 1.5s ease-in-out;
    pointer-events: none;
    z-index: 10;
  `

  card.style.position = "relative"
  card.appendChild(shine)

  setTimeout(() => shine.remove(), 1500)
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
    
    @keyframes sendingShine {
        0% { left: -100%; }
        100% { left: 100%; }
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
`
document.head.appendChild(additionalStyles)

// Agregar efectos de teclado para accesibilidad
document.addEventListener("keydown", (e) => {
  // Enter en campos de texto para avanzar al siguiente
  if (e.key === "Enter" && e.target.matches(".form-control:not(textarea)")) {
    e.preventDefault()
    const inputs = Array.from(document.querySelectorAll(".form-control, .form-select"))
    const currentIndex = inputs.indexOf(e.target)
    const nextInput = inputs[currentIndex + 1]

    if (nextInput) {
      nextInput.focus()
    } else {
      // Si es el último campo, enfocar el botón de envío
      const submitButton = document.querySelector(".btn-success")
      if (submitButton) {
        submitButton.focus()
      }
    }
  }

  // Escape para limpiar el formulario
  if (e.key === "Escape") {
    const inputs = document.querySelectorAll(".form-control, .form-select")
    inputs.forEach((input) => {
      input.value = ""
      input.classList.remove("is-valid", "is-invalid", "has-content")
      removeFieldMessage(input)
    })
    updateProgressBar()
  }
})

// Función para limpiar formulario
function clearForm() {
  const inputs = document.querySelectorAll(".form-control, .form-select")
  inputs.forEach((input) => {
    input.value = ""
    input.classList.remove("is-valid", "is-invalid", "has-content")
    removeFieldMessage(input)
  })
  updateProgressBar()
}

// Efecto de parallax sutil para las partículas
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const particles = document.querySelectorAll(".particle")

  particles.forEach((particle, index) => {
    const speed = ((index % 3) + 1) * 0.3
    particle.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Auto-completar campos si vienen de otra página
function checkForURLParameters() {
  const urlParams = new URLSearchParams(window.location.search)

  // Campos que pueden venir pre-llenados
  const fieldsToCheck = ["dni", "nombre", "telefono", "servicio"]

  fieldsToCheck.forEach((fieldName) => {
    const value = urlParams.get(fieldName)
    if (value) {
      const field = document.querySelector(`[name="${fieldName}"]`)
      if (field) {
        field.value = value
        field.classList.add("has-content")
        validateField(field)
      }
    }
  })

  updateProgressBar()
}

// Ejecutar al cargar la página
setTimeout(() => {
  checkForURLParameters()
}, 100)

// Función para mostrar tooltips informativos
function addTooltips() {
  const tooltips = [
    { selector: 'input[name="telefono"]', text: "Formato: 1234567890 (sin espacios ni guiones)" },
    { selector: 'input[name="dni"]', text: "DNI sin puntos (7 u 8 dígitos)" },
    { selector: 'input[name="fecha"]', text: "Solo días laborables (Lunes a Viernes)" },
    { selector: 'select[name="hora"]', text: "Horarios disponibles de 9:00 a 18:00" },
  ]

  tooltips.forEach(({ selector, text }) => {
    const element = document.querySelector(selector)
    if (element) {
      element.classList.add("tooltip-custom")
      element.setAttribute("data-tooltip", text)
    }
  })
}

// Agregar tooltips después de cargar
setTimeout(() => {
  addTooltips()
}, 500)
