document.addEventListener("DOMContentLoaded", function() {
    // Cache DOM elements
    const loginForm = document.getElementById("loginForm");
    const usuarioInput = document.getElementById("usuario");
    const claveInput = document.getElementById("clave");
    const submitBtn = document.querySelector(".btn-primary");
    const togglePassword = document.getElementById("togglePassword");

    // Enfoque automático en el campo de usuario
    usuarioInput.focus();

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener("click", function() {
            const type = claveInput.getAttribute("type") === "password" ? "text" : "password";
            claveInput.setAttribute("type", type);
            
            const icon = this.querySelector("i");
            icon.className = type === "password" ? "fas fa-eye" : "fas fa-eye-slash";
            
            this.setAttribute("aria-label", type === "password" ? "Mostrar contraseña" : "Ocultar contraseña");
        });
    }

    // Manejar el envío del formulario
    loginForm.addEventListener("submit", function(e) {
        const usuario = usuarioInput.value.trim();
        const clave = claveInput.value;
        
        if (usuario === "" || clave === "") {
            e.preventDefault();
            alert("Por favor, completa todos los campos.");
            return false;
        }
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Ingresando...';
        submitBtn.disabled = true;
    });
    
    // Limpiar formulario al volver atrás
    if (performance.navigation && performance.navigation.type === 2) {
        usuarioInput.value = "";
        claveInput.value = "";
    }

    // Caps Lock detection
    claveInput.addEventListener("keydown", function(e) {
        const capsLockOn = e.getModifierState && e.getModifierState("CapsLock");
        toggleCapsLockWarning(capsLockOn);
    });

    function toggleCapsLockWarning(isOn) {
        let warning = document.querySelector(".caps-lock-warning");
        
        if (isOn && !warning) {
            warning = document.createElement("div");
            warning.className = "caps-lock-warning alert alert-warning mt-2";
            warning.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Bloq Mayús está activado';
            warning.style.fontSize = "0.85rem";
            warning.style.padding = "8px 12px";
            
            claveInput.parentNode.parentNode.appendChild(warning);
        } else if (!isOn && warning) {
            warning.remove();
        }
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", function(e) {
        // Escape key to clear form
        if (e.key === "Escape") {
            usuarioInput.value = "";
            claveInput.value = "";
            usuarioInput.focus();
        }
    });

    console.log("🎨 SkinLabs Login System initialized successfully!");
});