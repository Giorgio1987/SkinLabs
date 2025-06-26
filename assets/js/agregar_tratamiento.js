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

  // Configurar fecha por defecto
  setDefaultDate()

  // Remover overlay después de la carga
  setTimeout(() => {
    removeLoadingOverlay()
  }, 1500)

  // Verificar si hay mensaje de éxito
  checkForSuccessMessage()
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
    case "dni":
      isValid = /^\d{7,8}$/.test(value)
      message = isValid ? "✓ DNI válido" : "✗ DNI debe tener 7-8 dígitos"
      break
    case "id_profesional":
      isValid = value !== ""
      message = isValid ? "✓ Profesional seleccionado" : "✗ Selecciona un profesional"
      break
    case "fecha":
      if (value) {
        const fecha = new Date(value)
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        isValid = fecha >= hoy
        message = isValid ? "✓ Fecha válida" : "✗ La fecha no puede ser anterior a hoy"
      } else {
        isValid = false
        message = "✗ Selecciona una fecha"
      }
      break
    case "descripcion":
      isValid = value.length >= 10
      message = isValid ? "✓ Descripción válida" : "✗ Descripción muy corta (mín. 10 caracteres)"
      break
    case "observaciones":
      // Las observaciones son opcionales
      if (value.length > 0) {
        isValid = value.length >= 5
        message = isValid ? "✓ Observaciones válidas" : "✗ Observaciones muy cortas (mín. 5 caracteres)"
      } else {
        isValid = true
        message = ""
      }
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
    <span>Guardando tratamiento...</span>
    <span style="margin-left: 10px;">💾</span>
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

// Configurar fecha por defecto
function setDefaultDate() {
  const fechaInput = document.querySelector('input[name="fecha"]')
  if (fechaInput && !fechaInput.value) {
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    fechaInput.value = formattedDate
  }
}

// Mostrar notificación
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon">${type === "error" ? "⚠️" : "✅"}</i>
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

// Verificar mensaje de éxito
function checkForSuccessMessage() {
  const alertInfo = document.querySelector(".alert-info")

  if (alertInfo) {
    // Mejorar el mensaje de éxito
    enhanceSuccessMessage(alertInfo)

    // Crear efecto de confetti
    createConfetti()

    // Crear overlay de éxito
    createSuccessOverlay()

    // Agregar contador de redirección
    addRedirectCounter()

    // Reproducir sonido de éxito (opcional)
    playSuccessSound()
  }
}

// Mejorar mensaje de éxito
function enhanceSuccessMessage(alert) {
  // Agregar padding para el emoji
  alert.style.paddingLeft = "60px"

  // Agregar efecto de pulsación
  setInterval(() => {
    alert.style.transform = "scale(1.02)"
    setTimeout(() => {
      alert.style.transform = "scale(1)"
    }, 200)
  }, 2000)
}

// Crear efecto confetti
function createConfetti() {
  const confettiContainer = document.createElement("div")
  confettiContainer.className = "confetti"

  // Crear 50 piezas de confetti
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement("div")
    piece.className = "confetti-piece"

    // Posición aleatoria
    piece.style.left = Math.random() * 100 + "%"
    piece.style.animationDelay = Math.random() * 3 + "s"
    piece.style.animationDuration = Math.random() * 2 + 2 + "s"

    confettiContainer.appendChild(piece)
  }

  document.body.appendChild(confettiContainer)

  // Remover después de 5 segundos
  setTimeout(() => {
    confettiContainer.remove()
  }, 5000)
}

// Crear overlay de éxito
function createSuccessOverlay() {
  const overlay = document.createElement("div")
  overlay.className = "success-overlay"
  document.body.appendChild(overlay)

  // Remover después de 3 segundos
  setTimeout(() => {
    overlay.remove()
  }, 3000)
}

// Agregar contador de redirección
function addRedirectCounter() {
  const alert = document.querySelector(".alert-info")
  if (!alert) return

  const counter = document.createElement("div")
  counter.className = "redirect-counter"
  counter.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 700;
    animation: pulse 1s ease-in-out infinite;
  `
  alert.style.position = "relative"
  alert.appendChild(counter)

  let seconds = 5

  const updateCounter = () => {
    counter.textContent = `${seconds}s`
    seconds--

    if (seconds >= 0) {
      setTimeout(updateCounter, 1000)
    }
  }

  updateCounter()
}

// Reproducir sonido de éxito (opcional)
function playSuccessSound() {
  // Crear sonido usando Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    // Crear una secuencia de tonos para simular "éxito"
    const frequencies = [523.25, 659.25, 783.99] // Do, Mi, Sol

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime + index * 0.15)
      oscillator.stop(audioContext.currentTime + index * 0.15 + 0.3)
    })
  } catch (error) {
    // Si no se puede reproducir sonido, no hacer nada
    console.log("Audio no disponible")
  }
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

// Agregar estilos CSS adicionales para los efectos de envío
const sendingStyles = document.createElement("style")
sendingStyles.textContent = `
  @keyframes sendingShine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .form-control:disabled,
  .form-select:disabled {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(243, 205, 200, 0.1) !important;
    opacity: 0.6;
  }
  
  .btn:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  
  .loading .form-control,
  .loading .form-select {
    pointer-events: none;
    opacity: 0.7;
  }
`
document.head.appendChild(sendingStyles)

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
      if (input.name !== "fecha") {
        // No limpiar la fecha
        input.value = ""
        input.classList.remove("is-valid", "is-invalid", "has-content")
        removeFieldMessage(input)
      }
    })
    updateProgressBar()
  }
})

// Función para limpiar formulario
function clearForm() {
  const inputs = document.querySelectorAll(".form-control, .form-select")
  inputs.forEach((input) => {
    if (input.name !== "fecha") {
      // Mantener la fecha actual
      input.value = ""
      input.classList.remove("is-valid", "is-invalid", "has-content")
      removeFieldMessage(input)
    }
  })
  updateProgressBar()
}

// Auto-completar DNI si viene de otra página
function checkForDNIParameter() {
  const urlParams = new URLSearchParams(window.location.search)
  const dni = urlParams.get("dni")

  if (dni) {
    const dniInput = document.querySelector('input[name="dni"]')
    if (dniInput) {
      dniInput.value = dni
      dniInput.classList.add("has-content")
      validateField(dniInput)
      updateProgressBar()
    }
  }
}

// Ejecutar al cargar la página
setTimeout(() => {
  checkForDNIParameter()
}, 100)
