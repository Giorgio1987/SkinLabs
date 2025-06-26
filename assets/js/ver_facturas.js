document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar efectos del formulario
  initializeFormEffects()

  // Configurar efectos de botones
  setupButtonEffects()

  // Configurar efectos de tabla
  setupTableEffects()

  // Mejorar alertas existentes
  enhanceExistingAlerts()

  // Configurar filtros dinámicos
  setupDynamicFilters()

  // Calcular y mostrar totales
  calculateTotals()

  // Configurar efectos de impresión
  setupPrintEffects()

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
        <div class="loading-text">Cargando sistema de reportes...</div>
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

    // Efecto de cambio
    input.addEventListener("change", function () {
      if (this.value) {
        this.classList.add("has-content")
      } else {
        this.classList.remove("has-content")
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

      // Si es el botón de buscar
      if (this.type === "submit") {
        const tipoFiltro = document.querySelector('select[name="tipo_filtro"]').value

        if (!tipoFiltro) {
          e.preventDefault()
          showNotification("Por favor, selecciona un tipo de filtro", "error")
          return
        }

        // Validar campos específicos según el tipo de filtro
        if (tipoFiltro === "dia") {
          const fechaDia = document.querySelector('input[name="fecha_dia"]').value
          if (!fechaDia) {
            e.preventDefault()
            showNotification("Por favor, selecciona una fecha", "error")
            return
          }
        }

        // Mostrar efecto de búsqueda
        e.preventDefault()
        searchWithAnimation(this)
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

// Buscar con animación
function searchWithAnimation(button) {
  const form = button.closest("form")
  const originalText = button.innerHTML

  // Cambiar texto del botón
  button.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    <span>Buscando facturas...</span>
  `
  button.disabled = true

  // Crear efecto de búsqueda
  createSearchEffect()

  // Enviar el formulario después de mostrar los efectos
  setTimeout(() => {
    form.submit()
  }, 1500)
}

// Configurar efectos de tabla
function setupTableEffects() {
  const table = document.querySelector(".table")
  if (!table) return

  // Agregar efectos de hover a las filas
  const rows = table.querySelectorAll("tbody tr")

  rows.forEach((row, index) => {
    // Efecto de hover mejorado
    row.addEventListener("mouseenter", function () {
      this.style.background = "rgba(248, 175, 153, 0.1)"
      this.style.transform = "translateX(10px) scale(1.02)"
      this.style.boxShadow = "0 10px 30px rgba(248, 175, 153, 0.2)"

      // Efecto en las celdas
      const cells = this.querySelectorAll("td")
      cells.forEach((cell) => {
        cell.style.color = "var(--rosa-melocoton)"
        cell.style.textShadow = "0 2px 10px rgba(248, 175, 153, 0.3)"
      })
    })

    row.addEventListener("mouseleave", function () {
      this.style.background = "rgba(255, 255, 255, 0.03)"
      this.style.transform = "translateX(0) scale(1)"
      this.style.boxShadow = "none"

      // Restaurar celdas
      const cells = this.querySelectorAll("td")
      cells.forEach((cell) => {
        cell.style.color = "var(--blanco-cosmico)"
        cell.style.textShadow = "none"
      })
    })

    // Efecto de click para seleccionar fila
    row.addEventListener("click", function () {
      // Remover selección previa
      const prevSelected = table.querySelector("tbody tr.selected")
      if (prevSelected) {
        prevSelected.classList.remove("selected")
      }

      // Agregar selección actual
      this.classList.add("selected")
      createRowSelectEffect(this)
    })
  })

  // Agregar contador de resultados si hay tabla
  if (rows.length > 0) {
    addResultsCounter(rows.length)
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

    // Padding para el emoji
    if (alert.classList.contains("alert-info")) {
      alert.style.paddingLeft = "60px"
    }
  })
}

// Configurar filtros dinámicos (mejorar la función existente)
function setupDynamicFilters() {
  const tipoFiltroSelect = document.querySelector('select[name="tipo_filtro"]')
  if (!tipoFiltroSelect) return

  // Sobrescribir la función mostrarFiltros existente con efectos
  window.mostrarFiltros = (valor) => {
    const filtroDia = document.getElementById("filtro_dia")
    const filtroMes = document.getElementById("filtro_mes")
    const filtroAnio = document.getElementById("filtro_anio")

    // Ocultar todos primero con animación
    ;[filtroDia, filtroMes, filtroAnio].forEach((elemento) => {
      if (elemento) {
        elemento.style.opacity = "0"
        elemento.style.transform = "translateY(-20px)"
        setTimeout(() => {
          elemento.style.display = "none"
        }, 300)
      }
    })

    // Mostrar los relevantes con animación
    setTimeout(() => {
      if (valor === "dia" && filtroDia) {
        filtroDia.style.display = "block"
        filtroDia.classList.add("show")
        setTimeout(() => {
          filtroDia.style.opacity = "1"
          filtroDia.style.transform = "translateY(0)"
        }, 50)
      } else if (valor === "mes" && filtroMes && filtroAnio) {
        filtroMes.style.display = "block"
        filtroAnio.style.display = "block"
        filtroMes.classList.add("show")
        filtroAnio.classList.add("show")

        setTimeout(() => {
          filtroMes.style.opacity = "1"
          filtroMes.style.transform = "translateY(0)"
        }, 50)

        setTimeout(() => {
          filtroAnio.style.opacity = "1"
          filtroAnio.style.transform = "translateY(0)"
        }, 150)
      }
    }, 300)

    // Mostrar notificación de cambio de filtro
    if (valor) {
      const filterName = valor === "dia" ? "día" : "mes"
      showNotification(`Filtro cambiado a: ${filterName}`, "info")
    }

    // Asegurar que los labels sean visibles
    setTimeout(() => {
      if (valor === "dia" && filtroDia) {
        const fechaInput = filtroDia.querySelector("input")
        if (fechaInput && !fechaInput.hasAttribute("data-label")) {
          fechaInput.setAttribute("data-label", "📅 Seleccionar Fecha")
        }
      } else if (valor === "mes" && filtroMes && filtroAnio) {
        const mesSelect = filtroMes.querySelector("select")
        const anioSelect = filtroAnio.querySelector("select")

        if (mesSelect && !mesSelect.hasAttribute("data-label")) {
          mesSelect.setAttribute("data-label", "📊 Mes")
        }

        if (anioSelect && !anioSelect.hasAttribute("data-label")) {
          anioSelect.setAttribute("data-label", "🗓️ Año")
        }
      }
    }, 100)
  }

  // Agregar labels dinámicamente a los campos
  function addDynamicLabels() {
    const tipoFiltroSelect = document.querySelector('select[name="tipo_filtro"]')
    const fechaDiaInput = document.querySelector('input[name="fecha_dia"]')
    const mesSelect = document.querySelector('select[name="mes"]')
    const anioSelect = document.querySelector('select[name="anio"]')

    // Agregar data-label a los campos
    if (tipoFiltroSelect) {
      tipoFiltroSelect.setAttribute("data-label", "🔍 Tipo de Filtro")
    }

    if (fechaDiaInput) {
      fechaDiaInput.setAttribute("data-label", "📅 Seleccionar Fecha")
    }

    if (mesSelect) {
      mesSelect.setAttribute("data-label", "📊 Mes")
    }

    if (anioSelect) {
      anioSelect.setAttribute("data-label", "🗓️ Año")
    }
  }

  // Llamar la función al cargar
  addDynamicLabels()

  // Configurar fecha por defecto para filtro de día
  const fechaDiaInput = document.querySelector('input[name="fecha_dia"]')
  if (fechaDiaInput) {
    const today = new Date().toISOString().split("T")[0]
    fechaDiaInput.value = today
  }

  // Configurar mes y año por defecto
  const mesSelect = document.querySelector('select[name="mes"]')
  const anioSelect = document.querySelector('select[name="anio"]')

  if (mesSelect) {
    mesSelect.value = new Date().getMonth() + 1
  }

  if (anioSelect) {
    anioSelect.value = new Date().getFullYear()
  }
}

// Calcular y mostrar totales
function calculateTotals() {
  const table = document.querySelector(".table")
  if (!table) return

  const rows = table.querySelectorAll("tbody tr")
  let total = 0
  let count = 0

  rows.forEach((row) => {
    const montoCell = row.querySelector("td:nth-child(7)")
    if (montoCell) {
      const montoText = montoCell.textContent.replace("$", "").replace(",", "")
      const monto = Number.parseFloat(montoText)
      if (!isNaN(monto)) {
        total += monto
        count++
      }
    }
  })

  if (count > 0) {
    addTotalAmount(total, count)
  }
}

// Agregar contador de resultados
function addResultsCounter(count) {
  const tableContainer = document.querySelector(".table-responsive")
  if (!tableContainer) return

  const counter = document.createElement("div")
  counter.className = "results-counter"
  counter.textContent = `Se encontraron ${count} factura${count !== 1 ? "s" : ""}`

  tableContainer.parentNode.insertBefore(counter, tableContainer)
}

// Agregar totalizador de montos
function addTotalAmount(total, count) {
  const tableContainer = document.querySelector(".table-responsive")
  if (!tableContainer) return

  const totalDiv = document.createElement("div")
  totalDiv.className = "total-amount"
  totalDiv.innerHTML = `
    Total de ${count} factura${count !== 1 ? "s" : ""}: $${total.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  `

  tableContainer.parentNode.appendChild(totalDiv)
}

// Configurar efectos de impresión
function setupPrintEffects() {
  // Mejorar el botón de imprimir existente
  const printButton = document.querySelector('button[onclick*="print"]')
  if (printButton) {
    printButton.addEventListener("click", (e) => {
      e.preventDefault()
      createPrintEffect()
      setTimeout(() => {
        window.print()
      }, 500)
    })
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
              : "rgba(23, 162, 184, 0.95)"
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
    background: linear-gradient(90deg, transparent, rgba(23, 162, 184, 0.3), transparent);
    animation: searchShine 1.5s ease-in-out;
    pointer-events: none;
    z-index: 10;
  `

  card.style.position = "relative"
  card.appendChild(shine)

  setTimeout(() => shine.remove(), 1500)
}

// Crear efecto de impresión
function createPrintEffect() {
  const tableContainer = document.querySelector(".table-responsive")
  if (!tableContainer) return

  // Efecto de flash antes de imprimir
  tableContainer.style.animation = "printFlash 0.5s ease-in-out"

  setTimeout(() => {
    tableContainer.style.animation = ""
  }, 500)
}

// Crear efecto de selección de fila
function createRowSelectEffect(row) {
  const effect = document.createElement("div")
  effect.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(248, 175, 153, 0.2), transparent);
    animation: rowSelectShine 0.8s ease-in-out;
    pointer-events: none;
    z-index: 1;
  `

  row.style.position = "relative"
  row.appendChild(effect)

  setTimeout(() => effect.remove(), 800)
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
    
    @keyframes printFlash {
        0%, 100% { background: rgba(255, 255, 255, 0.05); }
        50% { background: rgba(255, 255, 255, 0.15); }
    }
    
    @keyframes rowSelectShine {
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
    
    .table tbody tr.selected {
        background: rgba(248, 175, 153, 0.15) !important;
        border-left: 4px solid var(--coral-salmon) !important;
    }
    
    .table tbody tr.selected td {
        color: var(--rosa-melocoton) !important;
        font-weight: 600;
    }
`
document.head.appendChild(additionalStyles)

// Agregar efectos de teclado para accesibilidad
document.addEventListener("keydown", (e) => {
  // Enter para buscar cuando hay un filtro seleccionado
  if (e.key === "Enter" && e.target.matches(".form-select, .form-control")) {
    const submitButton = document.querySelector('button[type="submit"]')
    if (submitButton) {
      submitButton.click()
    }
  }

  // Ctrl+P para imprimir
  if (e.ctrlKey && e.key === "p") {
    const table = document.querySelector(".table")
    if (table) {
      e.preventDefault()
      createPrintEffect()
      setTimeout(() => window.print(), 500)
    }
  }

  // Escape para limpiar filtros
  if (e.key === "Escape") {
    const tipoFiltroSelect = document.querySelector('select[name="tipo_filtro"]')
    if (tipoFiltroSelect) {
      tipoFiltroSelect.value = ""
      window.mostrarFiltros("") // Declare the variable before using it
      showNotification("Filtros limpiados", "info")
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

// Auto-actualización de filtros inteligente
document.addEventListener("change", (e) => {
  if (e.target.matches('select[name="tipo_filtro"]')) {
    const valor = e.target.value
    if (valor) {
      // Crear efecto de cambio de filtro
      const card = document.querySelector(".card")
      const filterEffect = document.createElement("div")
      filterEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(248, 175, 153, 0.2), transparent);
        animation: filterChange 0.8s ease-in-out;
        pointer-events: none;
        z-index: 5;
      `

      card.style.position = "relative"
      card.appendChild(filterEffect)

      setTimeout(() => filterEffect.remove(), 800)
    }
  }
})

// Agregar animación para cambio de filtro
const filterChangeStyle = document.createElement("style")
filterChangeStyle.textContent = `
  @keyframes filterChange {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`
document.head.appendChild(filterChangeStyle)
