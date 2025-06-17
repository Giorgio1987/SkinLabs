document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar animaciones
  initializeAnimations()

  // Configurar efectos de hover mejorados
  setupEnhancedHovers()

  // Configurar efectos de clic
  setupClickEffects()

  // Remover overlay de carga después de un breve delay
  setTimeout(() => {
    removeLoadingOverlay()
  }, 800)
})

// Crear overlay de carga
function createLoadingOverlay() {
  const overlay = document.createElement("div")
  overlay.className = "loading-overlay"
  overlay.innerHTML = `
        <div class="loading-spinner"></div>
    `
  document.body.appendChild(overlay)
}

// Remover overlay de carga
function removeLoadingOverlay() {
  const overlay = document.querySelector(".loading-overlay")
  if (overlay) {
    overlay.classList.add("fade-out")
    setTimeout(() => {
      overlay.remove()
    }, 500)
  }
}

// Crear partículas de fondo
function createParticles() {
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles-bg"

  // Crear 15 partículas
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Posición aleatoria
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Delay aleatorio para la animación
    particle.style.animationDelay = Math.random() * 6 + "s"

    particlesContainer.appendChild(particle)
  }

  document.body.appendChild(particlesContainer)
}

// Inicializar animaciones de entrada
function initializeAnimations() {
  // Observador para animaciones al hacer scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observar elementos con animación
  const animatedElements = document.querySelectorAll(".mb-4")
  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Configurar efectos de hover mejorados
function setupEnhancedHovers() {
  const listItems = document.querySelectorAll(".list-group-item")

  listItems.forEach((item) => {
    // Efecto de entrada del mouse
    item.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"

      // Efecto de onda
      createRippleEffect(this, event)
    })

    // Efecto de salida del mouse
    item.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.3s ease"
    })

    // Efecto de focus para accesibilidad
    item.addEventListener("focus", function () {
      this.style.outline = "3px solid rgba(248, 175, 153, 0.5)"
      this.style.outlineOffset = "2px"
    })

    item.addEventListener("blur", function () {
      this.style.outline = "none"
    })
  })
}

// Crear efecto de onda (ripple)
function createRippleEffect(element, event) {
  const ripple = document.createElement("span")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = (event?.clientX || rect.left + rect.width / 2) - rect.left - size / 2
  const y = (event?.clientY || rect.top + rect.height / 2) - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(248, 175, 153, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `

  element.style.position = "relative"
  element.appendChild(ripple)

  // Remover el ripple después de la animación
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove()
    }
  }, 600)
}

// Configurar efectos de clic
function setupClickEffects() {
  const listItems = document.querySelectorAll(".list-group-item")

  listItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Prevenir navegación inmediata para mostrar efecto
      e.preventDefault()

      // Agregar clase de carga
      this.classList.add("loading")

      // Crear efecto de pulso
      this.style.animation = "pulse 0.3s ease"

      // Navegar después del efecto
      const href = this.getAttribute("href")
      setTimeout(() => {
        if (href) {
          window.location.href = href
        }
      }, 300)
    })
  })
}

// Efecto de scroll suave para la página
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Agregar efectos de teclado para accesibilidad
document.addEventListener("keydown", (e) => {
  // Enter o Espacio en elementos focuseados
  if (e.key === "Enter" || e.key === " ") {
    const focused = document.activeElement
    if (focused && focused.classList.contains("list-group-item")) {
      e.preventDefault()
      focused.click()
    }
  }
})

// Efecto de parallax sutil en el navbar
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const navbar = document.querySelector(".navbar")

  if (navbar) {
    const opacity = Math.max(0.95 - scrolled * 0.001, 0.85)
    navbar.style.background = `rgba(56, 26, 75, ${opacity})`
  }
})

// Agregar estilos CSS dinámicos para las animaciones
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .list-group-item {
        position: relative;
        overflow: hidden;
    }
    
    /* Efecto de brillo en hover */
    .list-group-item::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(248, 175, 153, 0.1), transparent);
        transform: rotate(45deg) translateX(-100%);
        transition: transform 0.6s ease;
        pointer-events: none;
    }
    
    .list-group-item:hover::after {
        transform: rotate(45deg) translateX(100%);
    }
`
document.head.appendChild(style)

// Función para mostrar notificaciones (opcional)
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} position-fixed`
  notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        border: none;
        border-radius: 15px;
        background: rgba(248, 175, 153, 0.9);
        color: var(--purpura-muy-oscuro);
        backdrop-filter: blur(10px);
        animation: slideInRight 0.5s ease;
    `

  notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-2"></i>
            <span>${message}</span>
        </div>
    `

  document.body.appendChild(notification)

  // Auto remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.5s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 500)
  }, 3000)
}

// Agregar animaciones de entrada y salida para notificaciones
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(notificationStyles)
