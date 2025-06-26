document.addEventListener("DOMContentLoaded", () => {
  // Crear overlay de carga
  createLoadingOverlay()

  // Crear partículas de fondo
  createParticles()

  // Inicializar efectos de la tabla
  initializeTableEffects()

  // Configurar efectos de botones
  setupButtonEffects()

  // Agregar contador de registros
  addRecordsCounter()

  // Configurar efectos de scroll
  setupScrollEffects()

  // Mejorar accesibilidad
  enhanceAccessibility()

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
        <div class="loading-text">Cargando historial...</div>
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

// Inicializar efectos de la tabla
function initializeTableEffects() {
  const table = document.querySelector(".table")
  if (!table) return

  // Envolver la tabla en un contenedor con efectos
  wrapTableWithContainer(table)

  // Configurar efectos de filas
  setupRowEffects()

  // Agregar indicadores de columna
  // addColumnIndicators() - función removida para simplicidad

  // Configurar efectos de header
  setupHeaderEffects()

  // Agregar efectos de datos
  enhanceDataCells()
}

// Envolver tabla con contenedor
function wrapTableWithContainer(table) {
  const container = document.createElement("div")
  container.className = "table-container"

  const responsive = document.createElement("div")
  responsive.className = "table-responsive"

  table.parentNode.insertBefore(container, table)
  container.appendChild(responsive)
  responsive.appendChild(table)
}

// Configurar efectos de filas
function setupRowEffects() {
  const rows = document.querySelectorAll(".table tbody tr")

  rows.forEach((row, index) => {
    // Efecto de click para selección
    row.addEventListener("click", function () {
      selectRow(this)
    })

    // Efecto de focus para accesibilidad
    row.setAttribute("tabindex", "0")
    row.addEventListener("focus", function () {
      this.style.outline = "2px solid rgba(248, 175, 153, 0.6)"
      this.style.outlineOffset = "2px"
    })

    row.addEventListener("blur", function () {
      this.style.outline = "none"
    })

    // Agregar delay de animación escalonado
    row.style.animationDelay = `${index * 0.05}s`
  })
}

// Crear efecto ripple en filas
function createRowRipple(row) {
  // Efecto más sutil - solo un ligero cambio de color
  row.style.transition = "background-color 0.2s ease"
}

// Seleccionar fila
function selectRow(row) {
  // Remover selección previa
  const previousSelected = document.querySelector(".table tbody tr.selected")
  if (previousSelected) {
    previousSelected.classList.remove("selected")
  }

  // Agregar selección actual
  row.classList.add("selected")
}

// Mostrar detalles de la fila
function showRowDetails(row) {
  const cells = row.querySelectorAll("td")
  if (cells.length === 0) return

  const patientName = cells[0].textContent
  const dni = cells[1].textContent
  const treatment = cells[2].textContent

  showNotification(`Seleccionado: ${patientName} (DNI: ${dni}) - ${treatment}`, "info")
}

// Agregar indicadores de columna
// function addColumnIndicators() {
//   const rows = document.querySelectorAll(".table tbody tr")

//   rows.forEach((row) => {
//     const indicator = document.createElement("div")
//     indicator.className = "column-indicator"
//     row.style.position = "relative"
//     row.appendChild(indicator)
//   })
// }

// Configurar efectos de header
function setupHeaderEffects() {
  const headers = document.querySelectorAll(".table thead th")

  headers.forEach((header, index) => {
    // Remover efectos de hover complejos
    header.addEventListener("mouseenter", function () {
      this.style.background = "rgba(248, 175, 153, 0.05)"
    })

    header.addEventListener("mouseleave", function () {
      this.style.background = ""
    })

    // Mantener solo los iconos
    const icon = getColumnIcon(index)
    if (icon) {
      header.innerHTML = `${icon} ${header.textContent}`
    }
  })
}

// Obtener icono para columna
function getColumnIcon(index) {
  const icons = ["👤", "🆔", "💊", "📅", "👨‍⚕️", "📝", "🕒"]
  return icons[index] || "📋"
}

// Mejorar celdas de datos
function enhanceDataCells() {
  const cells = document.querySelectorAll(".table tbody td")

  cells.forEach((cell, index) => {
    // Remover efectos de hover en celdas individuales
    // Solo formatear datos específicos
    formatCellData(cell, index % 7) // 7 columnas
  })
}

// Formatear datos de celda
function formatCellData(cell, columnIndex) {
  const text = cell.textContent.trim()

  switch (columnIndex) {
    case 0: // Nombre del paciente
      cell.style.fontWeight = "700"
      cell.style.color = "var(--rosa-melocoton)"
      break
    case 1: // DNI
      cell.style.fontFamily = '"Courier New", monospace'
      cell.style.fontWeight = "600"
      cell.style.color = "var(--coral-salmon)"
      break
    case 3: // Fecha
      if (text && text !== "") {
        const date = new Date(text)
        if (!isNaN(date)) {
          cell.textContent = date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }
      }
      cell.style.color = "var(--rosa-empolvado)"
      break
    case 4: // Profesional
      cell.style.fontWeight = "600"
      break
    case 6: // Fecha de historial
      if (text && text !== "") {
        const date = new Date(text)
        if (!isNaN(date)) {
          cell.textContent = date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      }
      cell.style.fontSize = "0.9rem"
      cell.style.opacity = "0.8"
      break
  }
}

// Configurar efectos de botones
function setupButtonEffects() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      createButtonRipple(this, e)
    })

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

// Agregar contador de registros
function addRecordsCounter() {
  const rows = document.querySelectorAll(".table tbody tr")
  const totalRows = rows.length

  // Verificar si hay datos reales (no solo mensaje de "no hay registros")
  const hasData = totalRows > 0 && !rows[0].querySelector('td[colspan="7"]')
  const count = hasData ? totalRows : 0

  const counter = document.createElement("div")
  counter.className = "records-counter"
  counter.innerHTML = `${count} registro${count !== 1 ? "s" : ""}`

    const container = document.querySelector(".table-container")
    if (container) {
    container.insertAdjacentElement("afterend", counter)
    }

}

// Configurar efectos de scroll
function setupScrollEffects() {
  const tableResponsive = document.querySelector(".table-responsive")
  if (!tableResponsive) return

  // Efecto de sombra al hacer scroll
  tableResponsive.addEventListener("scroll", function () {
    const scrollTop = this.scrollTop
    const scrollHeight = this.scrollHeight
    const clientHeight = this.clientHeight

    // Sombra superior
    if (scrollTop > 0) {
      this.style.boxShadow = "inset 0 10px 20px -10px rgba(0, 0, 0, 0.3)"
    } else {
      this.style.boxShadow = "none"
    }

    // Sombra inferior
    if (scrollTop + clientHeight < scrollHeight) {
      this.style.boxShadow += ", inset 0 -10px 20px -10px rgba(0, 0, 0, 0.3)"
    }
  })

  // Scroll suave con rueda del mouse
  tableResponsive.addEventListener("wheel", function (e) {
    e.preventDefault()
    this.scrollTop += e.deltaY * 0.5
  })
}

// Mejorar accesibilidad
function enhanceAccessibility() {
  const table = document.querySelector(".table")
  if (!table) return

  // Agregar atributos ARIA
  table.setAttribute("role", "table")
  table.setAttribute("aria-label", "Historial completo de pacientes")

  // Mejorar headers
  const headers = table.querySelectorAll("thead th")
  headers.forEach((header, index) => {
    header.setAttribute("scope", "col")
    header.setAttribute("id", `header-${index}`)
  })

  // Mejorar filas
  const rows = table.querySelectorAll("tbody tr")
  rows.forEach((row, index) => {
    row.setAttribute("role", "row")
    row.setAttribute("aria-rowindex", index + 1)

    const cells = row.querySelectorAll("td")
    cells.forEach((cell, cellIndex) => {
      cell.setAttribute("role", "cell")
      cell.setAttribute("headers", `header-${cellIndex}`)
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
        max-width: 300px;
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
    @keyframes rowRipple {
        0% { height: 0; }
        50% { height: 100%; }
        100% { height: 0; }
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
    
    .table tbody tr.selected {
        background: rgba(248, 175, 153, 0.15) !important;
        border-left: 4px solid var(--coral-salmon) !important;
        transform: translateX(8px) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    /* Efecto de carga para nuevos datos */
    .table tbody tr.loading-data {
        opacity: 0.6;
        background: rgba(248, 175, 153, 0.1);
        animation: loadingPulse 1.5s ease-in-out infinite;
    }
    
    @keyframes loadingPulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 0.9; }
    }
`
document.head.appendChild(additionalStyles)

// Funciones de utilidad adicionales

// Filtrar tabla (función para uso futuro)
function filterTable(searchTerm) {
  const rows = document.querySelectorAll(".table tbody tr")

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td")
    let found = false

    cells.forEach((cell) => {
      if (cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
        found = true
      }
    })

    if (found || searchTerm === "") {
      row.classList.remove("filtered-out")
    } else {
      row.classList.add("filtered-out")
    }
  })

  // Actualizar contador
  updateRecordsCounter()
}

// Actualizar contador de registros
function updateRecordsCounter() {
  const visibleRows = document.querySelectorAll(".table tbody tr:not(.filtered-out)")
  const counter = document.querySelector(".records-counter")

  if (counter) {
    const count = visibleRows.length
    counter.innerHTML = `${count} registro${count !== 1 ? "s" : ""} visible${count !== 1 ? "s" : ""}`
  }
}

// Exportar datos (función para uso futuro)
function exportTableData() {
  const table = document.querySelector(".table")
  if (!table) return

  const rows = table.querySelectorAll("tr")
  let csvContent = ""

  rows.forEach((row) => {
    const cells = row.querySelectorAll("th, td")
    const rowData = Array.from(cells).map((cell) => `"${cell.textContent.trim()}"`)
    csvContent += rowData.join(",") + "\n"
  })

  // Crear y descargar archivo
  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "historial_pacientes.csv"
  a.click()
  window.URL.revokeObjectURL(url)

  showNotification("Historial exportado exitosamente", "info")
}

// Configurar atajos de teclado
document.addEventListener("keydown", (e) => {
  // Ctrl + F para buscar (función futura)
  if (e.ctrlKey && e.key === "f") {
    e.preventDefault()
    // Implementar búsqueda
  }

  // Ctrl + E para exportar
  if (e.ctrlKey && e.key === "e") {
    e.preventDefault()
    exportTableData()
  }

  // Escape para limpiar selección
  if (e.key === "Escape") {
    const selected = document.querySelector(".table tbody tr.selected")
    if (selected) {
      selected.classList.remove("selected")
      selected.style.background = ""
      selected.style.borderLeft = ""
    }
  }

  // Flechas para navegar por las filas
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    navigateRows(e.key === "ArrowDown")
    e.preventDefault()
  }
})

// Navegar por filas con teclado
function navigateRows(down = true) {
  const rows = document.querySelectorAll(".table tbody tr")
  const currentFocused = document.activeElement

  let currentIndex = -1
  rows.forEach((row, index) => {
    if (row === currentFocused) {
      currentIndex = index
    }
  })

  let nextIndex
  if (down) {
    nextIndex = currentIndex < rows.length - 1 ? currentIndex + 1 : 0
  } else {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : rows.length - 1
  }

  if (rows[nextIndex]) {
    rows[nextIndex].focus()
  }
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
