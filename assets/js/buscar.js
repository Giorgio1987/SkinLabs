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

  // Mejorar resultados existentes
  enhanceExistingResults()

  // Remover overlay después de la carga
  setTimeout(() => {
    removeLoadingOverlay()
  }, 1200)
})

// Crear overlay de carga
function createLoadingOverlay() {
  const overlay = document.createElement("div")
  overlay.className = "loading-overlay"
  overlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Cargando búsqueda...</div>
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

  for (let i = 0; i < 20; i++) {
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

      // Si es el botón de búsqueda, agregar efecto de loading
      if (this.type === "submit" && this.classList.contains("btn-primary")) {
        handleSearchSubmit(this, e)
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

// Manejar envío de búsqueda
function handleSearchSubmit(button, event) {
  const dniInput = document.querySelector("#dni")
  const dniValue = dniInput.value.trim()

  // Validar DNI antes de enviar
  if (!dniValue) {
    event.preventDefault()
    showNotification("Por favor, ingresa un DNI para buscar", "error")
    dniInput.focus()
    return
  }

  if (!/^\d{7,8}$/.test(dniValue)) {
    event.preventDefault()
    showNotification("El DNI debe tener 7 u 8 dígitos", "error")
    dniInput.focus()
    return
  }

  // Agregar efecto de loading al botón
  const originalText = button.innerHTML
  button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        <span>Buscando...</span>
        <span style="margin-left: 10px;">🔍</span>
    `
  button.classList.add("loading")
  button.disabled = true

  // Crear efecto de búsqueda
  createSearchEffect()

  // El formulario se enviará naturalmente después del efecto
  setTimeout(() => {
    // Si por alguna razón no se envía automáticamente, forzar envío
    if (button.disabled) {
      button.closest("form").submit()
    }
  }, 1000)
}

// Configurar validación en tiempo real
function setupRealTimeValidation() {
  const dniInput = document.querySelector("#dni")

  if (dniInput) {
    dniInput.addEventListener("input", function () {
      validateDNI(this)
    })

    dniInput.addEventListener("blur", function () {
      validateDNI(this)
    })
  }
}

// Validar DNI
function validateDNI(input) {
  const value = input.value.trim()
  let isValid = true
  let message = ""

  // Remover clases previas
  input.classList.remove("is-valid", "is-invalid")

  if (value) {
    if (/^\d{7,8}$/.test(value)) {
      isValid = true
      message = "✓ DNI válido"
    } else {
      isValid = false
      message = "✗ DNI debe tener 7-8 dígitos"
    }

    input.classList.add(isValid ? "is-valid" : "is-invalid")
    showFieldMessage(input, message, isValid)
  } else {
    removeFieldMessage(input)
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
        animation: searchShine 1.5s ease-in-out;
        pointer-events: none;
        z-index: 10;
    `

  card.style.position = "relative"
  card.appendChild(shine)

  setTimeout(() => shine.remove(), 1500)
}

// Mejorar resultados existentes
function enhanceExistingResults() {
  // Buscar si ya hay resultados en la página
  const cardBody = document.querySelector(".card-body")
  const existingResults = cardBody.querySelector("h3")

  if (existingResults) {
    // Envolver los resultados en un contenedor con clase
    const resultsContainer = document.createElement("div")
    resultsContainer.className = "search-results show"

    // Mover todos los elementos de resultados al contenedor
    let currentElement = existingResults
    const elementsToMove = []

    // Recopilar elementos hasta encontrar el botón "Volver al menú"
    while (currentElement && !currentElement.classList.contains("text-center")) {
      elementsToMove.push(currentElement)
      currentElement = currentElement.nextElementSibling
    }

    // Mover elementos al contenedor de resultados
    elementsToMove.forEach((element) => {
      resultsContainer.appendChild(element)
    })

    // Insertar el contenedor antes del botón "Volver al menú"
    const backButton = cardBody.querySelector(".text-center")
    if (backButton) {
      cardBody.insertBefore(resultsContainer, backButton)
    } else {
      cardBody.appendChild(resultsContainer)
    }

    // Agregar efectos a los párrafos de resultados
    const resultParagraphs = resultsContainer.querySelectorAll("p")
    resultParagraphs.forEach((p, index) => {
      p.style.animationDelay = `${index * 0.1}s`
    })
  }

  // Buscar mensaje de "no encontrado"
  const noResultsText = Array.from(cardBody.querySelectorAll("p")).find((p) => p.textContent.includes("No se encontró"))

  if (noResultsText) {
    noResultsText.className = "no-results"
    const container = document.createElement("div")
    container.className = "search-results show"
    container.appendChild(noResultsText)

    const backButton = cardBody.querySelector(".text-center")
    if (backButton) {
      cardBody.insertBefore(container, backButton)
    }
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
    
    @keyframes searchShine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .form-control.has-content {
        background: rgba(255, 255, 255, 0.12) !important;
    }
    
    .form-control.is-valid {
        border-color: rgba(40, 167, 69, 0.6) !important;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.2);
    }
    
    .form-control.is-invalid {
        border-color: rgba(220, 53, 69, 0.6) !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2);
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

// Efecto de parallax sutil en el navbar (si existe)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const particles = document.querySelectorAll(".particle")

  particles.forEach((particle, index) => {
    const speed = ((index % 3) + 1) * 0.5
    particle.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Agregar efectos de teclado para accesibilidad
document.addEventListener("keydown", (e) => {
  // Enter en el input de DNI
  if (e.key === "Enter" && e.target.id === "dni") {
    const submitButton = document.querySelector(".btn-primary")
    if (submitButton) {
      submitButton.click()
    }
  }

  // Escape para limpiar el formulario
  if (e.key === "Escape") {
    const dniInput = document.querySelector("#dni")
    if (dniInput && dniInput.value) {
      dniInput.value = ""
      dniInput.classList.remove("is-valid", "is-invalid", "has-content")
      removeFieldMessage(dniInput)
      dniInput.focus()
    }
  }
})

// Función para limpiar formulario
function clearForm() {
  const dniInput = document.querySelector("#dni")
  if (dniInput) {
    dniInput.value = ""
    dniInput.classList.remove("is-valid", "is-invalid", "has-content")
    removeFieldMessage(dniInput)
  }

  // Remover resultados existentes
  const existingResults = document.querySelector(".search-results")
  if (existingResults) {
    existingResults.style.animation = "fadeOut 0.5s ease"
    setTimeout(() => {
      existingResults.remove()
    }, 500)
  }
}

// Agregar animación de fadeOut
const fadeOutStyle = document.createElement("style")
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-30px); }
    }
`
document.head.appendChild(fadeOutStyle)
