// ui_common.js

// Crear overlay de carga
function createLoadingOverlay(text = "Cargando...") {
  const overlay = document.createElement("div")
  overlay.className = "loading-overlay"
  overlay.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">${text}</div>
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

// Crear partículas de fondo
function createParticles() {
  const container = document.createElement("div")
  container.className = "particles-container"
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 8 + "s"
    container.appendChild(particle)
  }
  document.body.appendChild(container)
}

// Mostrar notificación
function showNotification(message, type = "info", duration = 4000) {
  if (!document.querySelector(".toast-container")) {
    const container = document.createElement("div")
    container.className = "toast-container"
    document.body.appendChild(container)
  }

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

  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  }, duration)

  toast.querySelector(".btn-close").addEventListener("click", () => {
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  })
}

// Inicialización global
function initializeSkinLabsUI(customText = "Cargando...") {
  createLoadingOverlay(customText)
  createParticles()
  setTimeout(removeLoadingOverlay, 1500)
}

// Exportar funciones globalmente
window.SkinLabsUI = {
  createLoadingOverlay,
  removeLoadingOverlay,
  createParticles,
  showNotification,
  initializeSkinLabsUI,
};
