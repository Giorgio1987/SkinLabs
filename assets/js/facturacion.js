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

  // Mejorar alertas existentes
  enhanceExistingAlerts()

  // Configurar efectos de factura
  setupInvoiceEffects()

  // Verificar si hay factura generada
  checkForGeneratedInvoice()

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
        <div class="loading-text">Cargando sistema de facturación...</div>
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

      // Mostrar emoji en el label
      const label = this.parentElement.querySelector(".form-label")
      if (label && label.querySelector("::before")) {
        label.style.setProperty("--emoji-opacity", "1")
      }
    })

    // Efecto de blur
    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused")
      }

      // Ocultar emoji en el label
      const label = this.parentElement.querySelector(".form-label")
      if (label) {
        label.style.setProperty("--emoji-opacity", "0")
      }
    })

    // Efecto de typing en placeholder
    input.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.classList.add("has-content")
      } else {
        this.classList.remove("has-content")
      }

      // Actualizar barra de progreso
      updateProgressBar()
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
    case "dni":
      isValid = /^\d{7,8}$/.test(value)
      message = isValid ? "✓ DNI válido" : "✗ DNI debe tener 7-8 dígitos"
      break
    case "cuil":
      isValid = /^\d{11}$/.test(value.replace(/[-\s]/g, ""))
      message = isValid ? "✓ CUIL válido" : "✗ CUIL debe tener 11 dígitos"
      break
    case "direccion":
      isValid = value.length >= 5
      message = isValid ? "✓ Dirección válida" : "✗ Dirección muy corta"
      break
    case "email":
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      message = isValid ? "✓ Email válido" : "✗ Email inválido"
      break
    case "fecha":
      if (value) {
        const fecha = new Date(value)
        const hoy = new Date()
        isValid = fecha <= hoy
        message = isValid ? "✓ Fecha válida" : "✗ No se pueden usar fechas futuras"
      } else {
        isValid = false
        message = "✗ Selecciona una fecha"
      }
      break
    case "monto":
      const monto = Number.parseFloat(value)
      isValid = !isNaN(monto) && monto > 0
      message = isValid ? "✓ Monto válido" : "✗ Monto debe ser mayor a 0"
      break
    case "metodo_pago":
      isValid = value !== ""
      message = isValid ? "✓ Método seleccionado" : "✗ Selecciona un método de pago"
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

      // Si es el botón de generar factura
      if (this.type === "submit") {
        const form = this.closest("form")
        const requiredInputs = form.querySelectorAll(".form-control[required], .form-select[required]")
        let hasEmptyRequired = false
        let hasInvalidFields = false

        requiredInputs.forEach((input) => {
          if (!input.value.trim()) {
            hasEmptyRequired = true
            input.classList.add("is-invalid")
            showFieldMessage(input, "✗ Este campo es obligatorio", false)
          } else if (!validateField(input)) {
            hasInvalidFields = true
          }
        })

        if (hasEmptyRequired || hasInvalidFields) {
          e.preventDefault()
          showNotification("Por favor, completa todos los campos correctamente", "error")

          // Scroll al primer campo con error
          const firstError = form.querySelector(".form-control.is-invalid, .form-select.is-invalid")
          if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" })
            firstError.focus()
          }
        } else {
          // Si todo está correcto, mostrar efecto de generación
          e.preventDefault()
          generateInvoiceWithAnimation(this)
        }
      }

      // Si es el botón de imprimir
      if (this.onclick && this.onclick.toString().includes("print")) {
        createPrintEffect()
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

// Generar factura con animación
function generateInvoiceWithAnimation(button) {
  const form = button.closest("form")
  const originalText = button.innerHTML

  // Cambiar texto del botón
  button.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    <span>Generando factura...</span>
  `
  button.disabled = true

  // Crear efecto de generación
  createGenerationEffect()

  // Enviar el formulario después de mostrar los efectos
  setTimeout(() => {
    form.submit()
  }, 2000)
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
    updateProgressBar()
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

    alert.style.position = "relative"
    alert.appendChild(closeButton)
  })
}

// Configurar efectos de factura
function setupInvoiceEffects() {
  const ticket = document.querySelector(".ticket")
  if (!ticket) return

  // Agregar efectos hover a elementos de la factura
  const logo = ticket.querySelector("img")
  if (logo) {
    logo.addEventListener("mouseenter", () => {
      logo.style.transform = "scale(1.1) rotate(5deg)"
    })
    logo.addEventListener("mouseleave", () => {
      logo.style.transform = "scale(1) rotate(0deg)"
    })
  }

  // Efecto hover en QR
  const qrImg = ticket.querySelector(".qr img")
  if (qrImg) {
    qrImg.addEventListener("mouseenter", () => {
      qrImg.style.transform = "scale(1.1)"
    })
    qrImg.addEventListener("mouseleave", () => {
      qrImg.style.transform = "scale(1)"
    })
  }

  // Animación de entrada para elementos de la factura
  const elements = ticket.querySelectorAll("p, h5, hr")
  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        element.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      },
      index * 100 + 500,
    )
  })
}

// Verificar si hay factura generada
function checkForGeneratedInvoice() {
  const ticket = document.querySelector(".ticket")
  if (ticket) {
    // Crear efecto de confetti
    setTimeout(() => {
      createConfetti()
      showNotification("¡Factura generada exitosamente!", "success")
      playSuccessSound()
    }, 1000)

    // Scroll suave hacia la factura
    setTimeout(() => {
      ticket.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 1500)
  }
}

// Mostrar notificación
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon">${type === "error" ? "⚠️" : type === "success" ? "✅" : "ℹ️"}</i>
            <span>${message}</span>
        </div>
    `

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "error"
            ? "rgba(220, 53, 69, 0.95)"
            : type === "success"
              ? "rgba(40, 167, 69, 0.95)"
              : "rgba(0, 123, 255, 0.95)"
        };
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

// Crear efecto de generación
function createGenerationEffect() {
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
    animation: generationShine 2s ease-in-out;
    pointer-events: none;
    z-index: 10;
  `

  card.style.position = "relative"
  card.appendChild(shine)

  setTimeout(() => shine.remove(), 2000)
}

// Crear efecto de impresión
function createPrintEffect() {
  const ticket = document.querySelector(".ticket")
  if (!ticket) return

  // Efecto de flash antes de imprimir
  ticket.style.animation = "printFlash 0.3s ease-in-out"

  setTimeout(() => {
    ticket.style.animation = ""
  }, 300)
}

// Crear efecto confetti
function createConfetti() {
  const confettiContainer = document.createElement("div")
  confettiContainer.className = "confetti"

  // Crear 60 piezas de confetti
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div")
    piece.className = "confetti-piece"

    // Posición aleatoria
    piece.style.left = Math.random() * 100 + "%"
    piece.style.animationDelay = Math.random() * 3 + "s"
    piece.style.animationDuration = Math.random() * 2 + 3 + "s"

    confettiContainer.appendChild(piece)
  }

  document.body.appendChild(confettiContainer)

  // Remover después de 6 segundos
  setTimeout(() => {
    confettiContainer.remove()
  }, 6000)
}

// Reproducir sonido de éxito
function playSuccessSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    // Crear una secuencia de tonos para simular "éxito"
    const frequencies = [523.25, 659.25, 783.99, 1046.5] // Do, Mi, Sol, Do octava

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4)

      oscillator.start(audioContext.currentTime + index * 0.2)
      oscillator.stop(audioContext.currentTime + index * 0.2 + 0.4)
    })
  } catch (error) {
    console.log("Audio no disponible")
  }
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
    
    @keyframes generationShine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes printFlash {
        0%, 100% { background: rgba(255, 255, 255, 0.95); }
        50% { background: rgba(255, 255, 255, 1); }
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
    
    .form-label {
        --emoji-opacity: 0;
    }
    
    .form-label::before {
        opacity: var(--emoji-opacity);
    }
`
document.head.appendChild(additionalStyles)

// Agregar efectos de teclado para accesibilidad
document.addEventListener("keydown", (e) => {
  // Enter en campos de texto para avanzar al siguiente
  if (e.key === "Enter" && e.target.matches(".form-control:not([type='submit'])")) {
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

  // Ctrl+P para imprimir factura
  if (e.ctrlKey && e.key === "p") {
    const ticket = document.querySelector(".ticket")
    if (ticket) {
      e.preventDefault()
      createPrintEffect()
      setTimeout(() => window.print(), 300)
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

// Auto-formatear campos
document.addEventListener("input", (e) => {
  // Formatear CUIL automáticamente
  if (e.target.name === "cuil") {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length >= 2) {
      value = value.substring(0, 2) + "-" + value.substring(2)
    }
    if (value.length >= 11) {
      value = value.substring(0, 11) + "-" + value.substring(11, 12)
    }
    e.target.value = value
  }

  // Formatear monto con separadores de miles
  if (e.target.name === "monto") {
    let value = e.target.value.replace(/[^\d.]/g, "")
    // Permitir solo un punto decimal
    const parts = value.split(".")
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("")
    }
    e.target.value = value
  }
})
