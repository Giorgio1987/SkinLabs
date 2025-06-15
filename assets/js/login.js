document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const loginForm = document.querySelector("form")
  const usuarioInput = document.getElementById("usuario")
  const claveInput = document.getElementById("clave")
  const submitBtn = document.querySelector(".btn-primary")
  const alertContainer = document.querySelector(".alert")

  // Initialize login functionality
  initializeLogin()

  function initializeLogin() {
    // Clear form on page load/refresh
    clearFormOnLoad()

    // Add enhanced form elements
    enhanceFormElements()

    // Add form validation
    addFormValidation()

    // Add keyboard shortcuts
    addKeyboardShortcuts()

    // Add loading states
    addLoadingStates()

    // Add input animations
    addInputAnimations()

    // Add security features
    addSecurityFeatures()
  }

  // Clear form data on page load/refresh
  function clearFormOnLoad() {
    if (
      performance.navigation.type === 2 ||
      (performance.getEntriesByType("navigation")[0] &&
        performance.getEntriesByType("navigation")[0].type === "back_forward")
    ) {
      usuarioInput.value = ""
      claveInput.value = ""
    }

    // Clear on page visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        usuarioInput.value = ""
        claveInput.value = ""
      }
    })
  }

  // Enhance form elements with icons and functionality
  function enhanceFormElements() {
    // Add brand header if not exists
    if (!document.querySelector(".login-brand")) {
      const brandHeader = createBrandHeader()
      document.querySelector(".login-container").insertBefore(brandHeader, document.querySelector(".card"))
    }

    // Add icons to inputs
    addInputIcons()

    // Add password toggle
    addPasswordToggle()

    // Add remember me checkbox
    addRememberMe()

    // Add footer links
    addFooterLinks()
  }

  function createBrandHeader() {
    const brandDiv = document.createElement("div")
    brandDiv.className = "login-brand"
    brandDiv.innerHTML = `
            <img src="assets/img/logo.png" alt="SkinLabs Logo" class="brand-logo-img">
        `
    return brandDiv
  }

  function addInputIcons() {
    // Wrap usuario input
    wrapInputWithIcon(usuarioInput, "fas fa-user")

    // Wrap clave input
    wrapInputWithIcon(claveInput, "fas fa-lock")
  }

  function wrapInputWithIcon(input, iconClass) {
    const wrapper = document.createElement("div")
    wrapper.className = "input-group"

    const icon = document.createElement("i")
    icon.className = `input-icon ${iconClass}`

    input.parentNode.insertBefore(wrapper, input)
    wrapper.appendChild(icon)
    wrapper.appendChild(input)

    input.classList.add("with-icon")
  }

  function addPasswordToggle() {
    const claveGroup = claveInput.closest(".input-group")
    const toggleBtn = document.createElement("button")
    toggleBtn.type = "button"
    toggleBtn.className = "password-toggle"
    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>'
    toggleBtn.setAttribute("aria-label", "Mostrar contraseña")

    claveGroup.appendChild(toggleBtn)

    toggleBtn.addEventListener("click", function () {
      const type = claveInput.getAttribute("type") === "password" ? "text" : "password"
      claveInput.setAttribute("type", type)

      const icon = this.querySelector("i")
      icon.className = type === "password" ? "fas fa-eye" : "fas fa-eye-slash"

      this.setAttribute("aria-label", type === "password" ? "Mostrar contraseña" : "Ocultar contraseña")
    })
  }

  function addRememberMe() {
    const rememberDiv = document.createElement("div")
    rememberDiv.className = "form-check mb-3"
    rememberDiv.innerHTML = `
            <input class="form-check-input" type="checkbox" id="remember" name="remember">
            <label class="form-check-label" for="remember">
                Recordar sesión
            </label>
        `

    const submitContainer = document.querySelector(".d-grid")
    submitContainer.parentNode.insertBefore(rememberDiv, submitContainer)
  }

  function addFooterLinks() {
    if (!document.querySelector(".login-footer")) {
      const footerDiv = document.createElement("div")
      footerDiv.className = "login-footer"
      footerDiv.innerHTML = `
                <a href="index.php">← Volver al sitio principal</a>
            `

      document.querySelector(".login-container").appendChild(footerDiv)
    }
  }

  // Add form validation
  function addFormValidation() {
    // Real-time validation
    usuarioInput.addEventListener("input", validateUsuario)
    claveInput.addEventListener("input", validateClave)

    // Form submission validation
    loginForm.addEventListener("submit", handleFormSubmit)
  }

  function validateUsuario() {
    const value = usuarioInput.value.trim()
    const isValid = value.length >= 3

    toggleInputValidation(usuarioInput, isValid)
    return isValid
  }

  function validateClave() {
    const value = claveInput.value
    const isValid = value.length >= 4

    toggleInputValidation(claveInput, isValid)
    return isValid
  }

  function toggleInputValidation(input, isValid) {
    const icon = input.parentNode.querySelector(".input-icon")

    if (input.value.length > 0) {
      if (isValid) {
        input.style.borderColor = "var(--success-color)"
        icon.style.color = "var(--success-color)"
        input.classList.remove("is-invalid")
        input.classList.add("is-valid")
      } else {
        input.style.borderColor = "var(--error-color)"
        icon.style.color = "var(--error-color)"
        input.classList.remove("is-valid")
        input.classList.add("is-invalid")
      }
    } else {
      input.style.borderColor = ""
      icon.style.color = ""
      input.classList.remove("is-valid", "is-invalid")
    }
  }

  function handleFormSubmit(e) {
    const isUsuarioValid = validateUsuario()
    const isClaveValid = validateClave()

    if (!isUsuarioValid || !isClaveValid) {
      e.preventDefault()
      showNotification("Por favor, completa todos los campos correctamente.", "error")

      // Focus first invalid field
      if (!isUsuarioValid) {
        usuarioInput.focus()
      } else if (!isClaveValid) {
        claveInput.focus()
      }

      return false
    }

    // Show loading state
    setLoadingState(true)

    // Add a small delay for better UX
    setTimeout(() => {
      // Form will submit naturally
    }, 500)
  }

  // Add keyboard shortcuts
  function addKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Enter key to submit (when not in form)
      if (e.key === "Enter" && !e.target.closest("form")) {
        e.preventDefault()
        submitBtn.click()
      }

      // Escape key to clear form
      if (e.key === "Escape") {
        clearForm()
      }

      // Ctrl/Cmd + L to focus username
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault()
        usuarioInput.focus()
      }
    })
  }

  // Add loading states
  function addLoadingStates() {
    // Handle form submission loading
    loginForm.addEventListener("submit", () => {
      setLoadingState(true)
    })
  }

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.classList.add("btn-loading")
      submitBtn.disabled = true
      usuarioInput.disabled = true
      claveInput.disabled = true
    } else {
      submitBtn.classList.remove("btn-loading")
      submitBtn.disabled = false
      usuarioInput.disabled = false
      claveInput.disabled = false
    }
  }

  // Add input animations
  function addInputAnimations() {
    const inputs = [usuarioInput, claveInput]

    inputs.forEach((input) => {
      // Focus animations
      input.addEventListener("focus", function () {
        this.parentNode.classList.add("focused")
        animateLabel(this, true)
      })

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentNode.classList.remove("focused")
          animateLabel(this, false)
        }
      })

      // Typing animation
      input.addEventListener("input", function () {
        addTypingEffect(this)
      })
    })
  }

  function animateLabel(input, isFocused) {
    const label = input.parentNode.parentNode.querySelector(".form-label")
    if (label) {
      if (isFocused) {
        label.style.color = "var(--coral-salmon)"
        label.style.transform = "translateY(-2px)"
      } else {
        label.style.color = ""
        label.style.transform = ""
      }
    }
  }

  function addTypingEffect(input) {
    input.style.transform = "scale(1.02)"
    setTimeout(() => {
      input.style.transform = ""
    }, 100)
  }

  // Add security features
  function addSecurityFeatures() {
    // Prevent right-click on password field
    claveInput.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })

    // Clear clipboard on password paste
    claveInput.addEventListener("paste", (e) => {
      setTimeout(() => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("")
        }
      }, 100)
    })

    // Add caps lock detection
    addCapsLockDetection()

    // Add session timeout warning
    addSessionTimeout()
  }

  function addCapsLockDetection() {
    claveInput.addEventListener("keydown", (e) => {
      const capsLockOn = e.getModifierState && e.getModifierState("CapsLock")
      toggleCapsLockWarning(capsLockOn)
    })
  }

  function toggleCapsLockWarning(isOn) {
    let warning = document.querySelector(".caps-lock-warning")

    if (isOn && !warning) {
      warning = document.createElement("div")
      warning.className = "caps-lock-warning alert alert-warning mt-2"
      warning.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Bloq Mayús está activado'
      warning.style.fontSize = "0.85rem"
      warning.style.padding = "8px 12px"

      claveInput.parentNode.parentNode.appendChild(warning)
    } else if (!isOn && warning) {
      warning.remove()
    }
  }

  function addSessionTimeout() {
    let timeoutWarning
    const TIMEOUT_DURATION = 15 * 60 * 1000 // 15 minutes

    function resetTimeout() {
      clearTimeout(timeoutWarning)
      timeoutWarning = setTimeout(() => {
        showNotification("Tu sesión expirará pronto por inactividad.", "warning")
      }, TIMEOUT_DURATION)
    }
    // Reset timeout on user activity
    ;["mousedown", "mousemove", "keypress", "scroll", "touchstart"].forEach((event) => {
      document.addEventListener(event, resetTimeout, true)
    })

    resetTimeout()
  }

  // Utility functions
  function clearForm() {
    usuarioInput.value = ""
    claveInput.value = ""
    usuarioInput.focus()

    // Clear validation states
    ;[usuarioInput, claveInput].forEach((input) => {
      input.style.borderColor = ""
      input.classList.remove("is-valid", "is-invalid")
      const icon = input.parentNode.querySelector(".input-icon")
      if (icon) icon.style.color = ""
    })
  }

  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".custom-notification")
    existingNotifications.forEach((notification) => notification.remove())

    const notification = document.createElement("div")
    notification.className = `custom-notification alert alert-${type === "error" ? "danger" : type === "warning" ? "warning" : "success"} alert-dismissible fade show`
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            border: none;
            border-radius: 12px;
            animation: slideInRight 0.3s ease-out;
        `

    const iconClass =
      type === "error" ? "fa-exclamation-circle" : type === "warning" ? "fa-exclamation-triangle" : "fa-check-circle"

    notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas ${iconClass} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 5000)
  }

  // Add CSS for additional animations
  const additionalStyles = document.createElement("style")
  additionalStyles.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .caps-lock-warning {
            animation: slideInDown 0.3s ease-out;
        }
        
        .input-group.focused .input-icon {
            color: var(--coral-salmon) !important;
            transform: translateY(-50%) scale(1.1);
        }
        
        .form-control.is-valid {
            border-color: var(--success-color) !important;
        }
        
        .form-control.is-invalid {
            border-color: var(--error-color) !important;
        }
    `
  document.head.appendChild(additionalStyles)

  // Initialize tooltips if Bootstrap is available
  const bootstrap = window.bootstrap // Declare the bootstrap variable
  if (typeof bootstrap !== "undefined") {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  }

  // Performance optimization
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Apply debounce to validation functions
  const debouncedValidateUsuario = debounce(validateUsuario, 300)
  const debouncedValidateClave = debounce(validateClave, 300)

  console.log("🎨 SkinLabs Login System initialized successfully!")
})
