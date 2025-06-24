document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar efectos del formulario
  initializeFormEffects()

  // Configurar efectos de botones
  setupButtonEffects()

  // Configurar validación en tiempo real
  setupRealTimeValidation()

  // Configurar detección de cambios
  setupChangeDetection()

  // Configurar barra de progreso
  setupProgressBar()

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
        <div class="loading-text">Cargando datos del paciente...</div>
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
      if (!this.readOnly) {
        this.parentElement.classList.add("focused")
        createRippleEffect(this)
      }
    })

    // Efecto de blur
    input.addEventListener("blur", function () {
      if (!this.value && !this.readOnly) {
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
      if (!this.matches(":focus") && !this.readOnly) {
        this.style.transform = "translateY(-1px)"
      }
    })

    input.addEventListener("mouseleave", function () {
      if (!this.matches(":focus") && !this.readOnly) {
        this.style.transform = "translateY(0)"
      }
    })

    // Marcar campos como que tienen contenido si ya tienen valor
    if (input.value) {
      input.classList.add("has-content")
    }
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
    // Efecto especial para el botón de volver
    if (button.classList.contains("btn-back")) {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        // Verificar si hay cambios sin guardar
        const modifiedInputs = document.querySelectorAll(".form-control.modified")
        if (modifiedInputs.length > 0) {
          if (confirm("Tienes cambios sin guardar. ¿Estás seguro de que quieres volver?")) {
            window.location.href = "buscar.php"
          }
        } else {
          window.location.href = "buscar.php"
        }
      })
    }
    // Efecto de ondas
    button.addEventListener("click", function (e) {
      // Efecto de ondas
      createButtonRipple(this, e)

      // Si es el botón de guardar, manejar envío especial
      if (this.type === "submit") {
        handleSaveSubmit(this, e)
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

// Manejar envío de guardado
function handleSaveSubmit(button, event) {
  const form = button.closest("form")
  const modifiedInputs = form.querySelectorAll(".form-control.modified")

  // Verificar si hay cambios
  if (modifiedInputs.length === 0) {
    event.preventDefault()
    showNotification("No se han realizado cambios", "warning")
    return
  }

  // Validar campos antes de enviar
  const requiredInputs = form.querySelectorAll(".form-control[required]:not([readonly])")
  let hasEmptyRequired = false

  requiredInputs.forEach((input) => {
    if (!input.value.trim()) {
      hasEmptyRequired = true
      input.classList.add("is-invalid")
      showFieldMessage(input, "✗ Este campo es obligatorio", false)
    }
  })

  if (hasEmptyRequired) {
    event.preventDefault()
    showNotification("Por favor, completa todos los campos obligatorios", "error")
    return
  }

  // Si llegamos aquí, todo está bien - mostrar efectos pero permitir envío natural
  const originalText = button.innerHTML
  button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        <span>Guardando cambios...</span>
        <span style="margin-left: 10px;">💾</span>
    `

  // Crear efecto de guardado
  createSaveEffect()

  // NO prevenir el envío - dejar que el formulario se envíe naturalmente
  // El botón mantendrá el estado de "guardando" hasta que la página se recargue
}

// Configurar validación en tiempo real
function setupRealTimeValidation() {
  const inputs = document.querySelectorAll(".form-control:not([readonly])")

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
      if (value === "") {
        isValid = true
        message = ""
      } else {
        isValid = /^\d{10,15}$/.test(value.replace(/\s/g, ""))
        message = isValid ? "✓ Teléfono válido" : "✗ Teléfono debe tener 10-15 dígitos"
      }
      break
    case "direccion":
      isValid = value.length >= 5
      message = isValid ? "✓ Dirección válida" : "✗ Dirección muy corta"
      break
    case "fecha_nacimiento":
      const fecha = new Date(value)
      const hoy = new Date()
      const edad = hoy.getFullYear() - fecha.getFullYear()
      isValid = fecha < hoy && edad >= 0 && edad <= 120
      message = isValid ? "✓ Fecha válida" : "✗ Fecha inválida"
      break
  }

  // Aplicar clases de validación solo si hay contenido
  if (value || fieldName === "fecha_nacimiento") {
    field.classList.add(isValid ? "is-valid" : "is-invalid")
    if (message) {
      showFieldMessage(field, message, isValid)
    }
  } else {
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

// Configurar detección de cambios
function setupChangeDetection() {
  const inputs = document.querySelectorAll(".form-control:not([readonly])")
  const originalValues = {}
  let changesIndicator = null
  let isSubmitting = false // Nueva variable para controlar el envío

  // Guardar valores originales
  inputs.forEach((input) => {
    originalValues[input.name] = input.value
  })

  // Crear indicador de cambios
  function createChangesIndicator() {
    if (!changesIndicator) {
      changesIndicator = document.createElement("div")
      changesIndicator.className = "changes-indicator"
      changesIndicator.textContent = "Hay cambios sin guardar"
      document.body.appendChild(changesIndicator)
    }
  }

  // Detectar cambios en inputs
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const hasChanged = this.value !== originalValues[this.name]

      if (hasChanged) {
        this.classList.add("modified")
        createChangesIndicator()
        changesIndicator.classList.add("show")
      } else {
        this.classList.remove("modified")

        // Verificar si quedan cambios
        const stillHasChanges = Array.from(inputs).some((inp) => inp.value !== originalValues[inp.name])

        if (!stillHasChanges && changesIndicator) {
          changesIndicator.classList.remove("show")
        }
      }
    })
  })

  // Detectar cuando se envía el formulario para deshabilitar la advertencia
  const form = document.querySelector("form")
  if (form) {
    form.addEventListener("submit", () => {
      isSubmitting = true
    })
  }

  // Advertir antes de salir si hay cambios (SOLO si no se está enviando)
  window.addEventListener("beforeunload", (e) => {
    // Si se está enviando el formulario, no mostrar advertencia
    if (isSubmitting) {
      return
    }

    const hasChanges = Array.from(inputs).some((inp) => inp.value !== originalValues[inp.name])

    if (hasChanges) {
      e.preventDefault()
      e.returnValue = "Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?"
      return e.returnValue
    }
  })
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
  const inputs = document.querySelectorAll(".form-control[required]:not([readonly])")
  const filledInputs = Array.from(inputs).filter((input) => input.value.trim() !== "")
  const progress = (filledInputs.length / inputs.length) * 100

  const progressBar = document.querySelector(".form-progress")
  if (progressBar) {
    progressBar.style.width = progress + "%"
  }
}

// Mostrar notificación
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icons = {
    error: "⚠️",
    warning: "⚡",
    info: "ℹ️",
    success: "✅",
  }

  notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon">${icons[type] || "ℹ️"}</i>
            <span>${message}</span>
        </div>
    `

  const colors = {
    error: "rgba(220, 53, 69, 0.95)",
    warning: "rgba(255, 193, 7, 0.95)",
    info: "rgba(13, 202, 240, 0.95)",
    success: "rgba(40, 167, 69, 0.95)",
  }

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
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

// Crear efecto de guardado
function createSaveEffect() {
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
        animation: saveShine 1.5s ease-in-out;
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
    
    @keyframes saveShine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .form-control.has-content {
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
  // Ctrl+S para guardar
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault()
    const submitButton = document.querySelector(".btn-primary")
    if (submitButton) {
      submitButton.click()
    }
  }

  // Escape para cancelar cambios
  if (e.key === "Escape") {
    const modifiedInputs = document.querySelectorAll(".form-control.modified")
    if (modifiedInputs.length > 0) {
      if (confirm("¿Deseas descartar todos los cambios?")) {
        location.reload()
      }
    }
  }
})

// Función para resaltar cambios
function highlightChanges() {
  const modifiedInputs = document.querySelectorAll(".form-control.modified")
  modifiedInputs.forEach((input) => {
    input.style.animation = "highlightPulse 1s ease-in-out"
    setTimeout(() => {
      input.style.animation = ""
    }, 1000)
  })
}

// Agregar animación de resaltado
const highlightStyle = document.createElement("style")
highlightStyle.textContent = `
    @keyframes highlightPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(255, 193, 7, 0.5); }
    }
`
document.head.appendChild(highlightStyle)
