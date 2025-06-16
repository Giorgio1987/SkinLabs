document.addEventListener('DOMContentLoaded', function() {
    // Initialize the appointment system
    initializeAppointmentSystem();

    function initializeAppointmentSystem() {
        // Show loading screen
        showLoadingScreen();
        
        // Initialize components after loading
        setTimeout(() => {
            hideLoadingScreen();
            initializeFormSteps();
            initializeServiceSelection();
            initializeFormValidation();
            initializeTimeSlots();
            initializeDateValidation();
            initializeFormSummary();
            initializeAccessibility();
            initializeAnimations();
        }, 1500);
    }

    // Loading Screen Management
    function showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Form Steps Management
    function initializeFormSteps() {
        const steps = document.querySelectorAll('.step');
        const formSteps = document.querySelectorAll('.form-step');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        let currentStep = 1;
        const totalSteps = 4;

        // Navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (validateCurrentStep(currentStep)) {
                    if (currentStep < totalSteps) {
                        currentStep++;
                        updateFormStep();
                    }
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentStep > 1) {
                    currentStep--;
                    updateFormStep();
                }
            });
        }

        function updateFormStep() {
            // Update step indicators
            steps.forEach((step, index) => {
                const stepNumber = index + 1;
                step.classList.remove('active', 'completed');
                
                if (stepNumber === currentStep) {
                    step.classList.add('active');
                } else if (stepNumber < currentStep) {
                    step.classList.add('completed');
                }
            });

            // Update form steps
            formSteps.forEach((formStep, index) => {
                const stepNumber = index + 1;
                formStep.classList.remove('active');
                
                if (stepNumber === currentStep) {
                    formStep.classList.add('active');
                    formStep.style.animation = 'fadeInRight 0.5s ease-out';
                }
            });

            // Update navigation buttons
            prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
            nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
            submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';

            // Update summary on last step
            if (currentStep === totalSteps) {
                updateFormSummary();
            }

            // Scroll to top of form
            document.querySelector('.appointment-card').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        function validateCurrentStep(step) {
            switch(step) {
                case 1:
                    return validateServiceSelection();
                case 2:
                    return validatePersonalInfo();
                case 3:
                    return validateDateTime();
                case 4:
                    return validateTerms();
                default:
                    return true;
            }
        }

        function validateServiceSelection() {
            const selectedService = document.getElementById('selectedService').value;
            if (!selectedService) {
                showNotification('Por favor, selecciona un tratamiento.', 'error');
                return false;
            }
            return true;
        }

        function validatePersonalInfo() {
            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const dni = document.getElementById('dni').value.trim();

            if (!nombre || !telefono || !dni) {
                showNotification('Por favor, completa todos los campos personales.', 'error');
                return false;
            }

            if (nombre.length < 3) {
                showNotification('El nombre debe tener al menos 3 caracteres.', 'error');
                return false;
            }

            if (!/^\d{7,8}$/.test(dni)) {
                showNotification('El DNI debe tener 7 u 8 dígitos.', 'error');
                return false;
            }

            if (!/^\+?[\d\s\-$$$$]{8,15}$/.test(telefono)) {
                showNotification('Por favor, ingresa un teléfono válido.', 'error');
                return false;
            }

            return true;
        }

        function validateDateTime() {
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('selectedTime').value;

            if (!fecha || !hora) {
                showNotification('Por favor, selecciona fecha y horario.', 'error');
                return false;
            }

            // Validate date is not in the past
            const selectedDate = new Date(fecha + 'T' + hora);
            const now = new Date();
            
            if (selectedDate <= now) {
                showNotification('No puedes agendar citas en el pasado.', 'error');
                return false;
            }

            // Validate weekday
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                showNotification('Solo se permiten citas de lunes a viernes.', 'error');
                return false;
            }

            return true;
        }

        function validateTerms() {
            const acceptTerms = document.getElementById('acceptTerms').checked;
            if (!acceptTerms) {
                showNotification('Debes aceptar los términos y condiciones.', 'error');
                return false;
            }
            return true;
        }
    }

    // Service Selection
    function initializeServiceSelection() {
        const serviceOptions = document.querySelectorAll('.service-option');
        const selectedServiceInput = document.getElementById('selectedService');

        serviceOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove previous selection
                serviceOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                this.classList.add('selected');
                
                // Update hidden input
                const serviceName = this.getAttribute('data-service');
                selectedServiceInput.value = serviceName;
                
                // Add animation effect
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Show success feedback
                showNotification(`Tratamiento "${serviceName}" seleccionado.`, 'success');
            });

            // Add hover effects
            option.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'translateY(-3px)';
                }
            });

            option.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = '';
                }
            });
        });
    }

    // Form Validation
    function initializeFormValidation() {
        const inputs = document.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', function() {
                validateInput(this);
            });

            input.addEventListener('blur', function() {
                validateInput(this);
            });

            // Format specific inputs
            if (input.id === 'dni') {
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/\D/g, '').substring(0, 8);
                });
            }

            if (input.id === 'telefono') {
                input.addEventListener('input', function() {
                    let value = this.value.replace(/\D/g, '');
                    if (value.length > 0) {
                        if (value.length <= 4) {
                            this.value = value;
                        } else if (value.length <= 8) {
                            this.value = value.substring(0, 4) + '-' + value.substring(4);
                        } else {
                            this.value = value.substring(0, 4) + '-' + value.substring(4, 8) + '-' + value.substring(8, 12);
                        }
                    }
                });
            }

            if (input.id === 'nombre') {
                input.addEventListener('input', function() {
                    // Capitalize first letter of each word
                    this.value = this.value.replace(/\b\w/g, l => l.toUpperCase());
                });
            }
        });

        function validateInput(input) {
            const value = input.value.trim();
            let isValid = true;
            let message = '';

            switch(input.id) {
                case 'nombre':
                    isValid = value.length >= 3;
                    message = 'El nombre debe tener al menos 3 caracteres';
                    break;
                case 'telefono':
                    isValid = /^\d{4}-\d{4}(-\d{4})?$/.test(value) || /^\d{8,12}$/.test(value.replace(/\D/g, ''));
                    message = 'Ingresa un teléfono válido';
                    break;
                case 'dni':
                    isValid = /^\d{7,8}$/.test(value);
                    message = 'El DNI debe tener 7 u 8 dígitos';
                    break;
            }

            updateInputValidation(input, isValid, message);
        }

        function updateInputValidation(input, isValid, message) {
            const formFloating = input.closest('.form-floating');
            
            // Remove existing validation classes
            input.classList.remove('is-valid', 'is-invalid');
            
            // Remove existing feedback
            const existingFeedback = formFloating.querySelector('.invalid-feedback');
            if (existingFeedback) {
                existingFeedback.remove();
            }

            if (input.value.length > 0) {
                if (isValid) {
                    input.classList.add('is-valid');
                } else {
                    input.classList.add('is-invalid');
                    
                    // Add error message
                    const feedback = document.createElement('div');
                    feedback.className = 'invalid-feedback';
                    feedback.textContent = message;
                    formFloating.appendChild(feedback);
                }
            }
        }
    }

    // Time Slots Management
    function initializeTimeSlots() {
        const fechaInput = document.getElementById('fecha');
        const timeSlotsContainer = document.getElementById('timeSlots');
        const selectedTimeInput = document.getElementById('selectedTime');

        // Set minimum date to today
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        fechaInput.min = tomorrow.toISOString().split('T')[0];

        // Set maximum date to 3 months from now
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);
        fechaInput.max = maxDate.toISOString().split('T')[0];

        fechaInput.addEventListener('change', function() {
            generateTimeSlots(this.value);
        });

        function generateTimeSlots(selectedDate) {
            if (!selectedDate) return;

            const date = new Date(selectedDate);
            const dayOfWeek = date.getDay();

            // Clear existing slots
            timeSlotsContainer.innerHTML = '';

            // Check if it's weekend
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                timeSlotsContainer.innerHTML = '<p class="text-center text-muted">No hay horarios disponibles los fines de semana</p>';
                return;
            }

            // Generate time slots from 9:00 to 18:00
            const startHour = 9;
            const endHour = 18;
            const slotDuration = 30; // minutes

            for (let hour = startHour; hour < endHour; hour++) {
                for (let minute = 0; minute < 60; minute += slotDuration) {
                    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    const slotElement = createTimeSlot(timeString, selectedDate);
                    timeSlotsContainer.appendChild(slotElement);
                }
            }
        }

        function createTimeSlot(time, date) {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.textContent = time;
            slot.setAttribute('data-time', time);

            // Check if slot is in the past
            const slotDateTime = new Date(`${date}T${time}`);
            const now = new Date();
            
            if (slotDateTime <= now) {
                slot.classList.add('disabled');
                slot.title = 'Horario no disponible';
                return slot;
            }

            // Add click event
            slot.addEventListener('click', function() {
                if (this.classList.contains('disabled')) return;

                // Remove previous selection
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                
                // Select this slot
                this.classList.add('selected');
                selectedTimeInput.value = time;
                
                // Add animation
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);

                showNotification(`Horario ${time} seleccionado.`, 'success');
            });

            return slot;
        }
    }

    // Date Validation
    function initializeDateValidation() {
        const fechaInput = document.getElementById('fecha');
        
        fechaInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                showNotification('Solo se permiten citas de lunes a viernes.', 'error');
                this.value = '';
                return;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate <= today) {
                showNotification('No puedes seleccionar fechas pasadas.', 'error');
                this.value = '';
                return;
            }
        });
    }

    // Form Summary
    function initializeFormSummary() {
        window.updateFormSummary = function() {
            const service = document.getElementById('selectedService').value;
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('selectedTime').value;

            // Update summary fields
            document.getElementById('summaryService').textContent = service || '-';
            document.getElementById('summaryName').textContent = nombre || '-';
            document.getElementById('summaryPhone').textContent = telefono || '-';
            
            if (fecha && hora) {
                const dateObj = new Date(fecha);
                const formattedDate = dateObj.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('summaryDateTime').textContent = `${formattedDate} a las ${hora}`;
            } else {
                document.getElementById('summaryDateTime').textContent = '-';
            }
        };
    }

    // Accessibility Features
    function initializeAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open modals or reset form
                const modals = document.querySelectorAll('.modal.show');
                modals.forEach(modal => {
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    if (bsModal) bsModal.hide();
                });
            }
        });

        // Focus management for service options
        const serviceOptions = document.querySelectorAll('.service-option');
        serviceOptions.forEach((option, index) => {
            option.setAttribute('tabindex', '0');
            option.setAttribute('role', 'button');
            option.setAttribute('aria-label', `Seleccionar ${option.getAttribute('data-service')}`);
            
            option.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Time slots accessibility
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('time-slot')) {
                const timeSlots = document.querySelectorAll('.time-slot');
                timeSlots.forEach(slot => {
                    slot.setAttribute('tabindex', '0');
                    slot.setAttribute('role', 'button');
                    slot.setAttribute('aria-label', `Seleccionar horario ${slot.textContent}`);
                });
            }
        });
    }

    // Animations
    function initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.service-option, .info-card, .contact-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Procesando...';
            submitBtn.disabled = true;
            
            // Simulate processing time
            setTimeout(() => {
                // Submit the form
                this.submit();
            }, 1500);
        });
    }

    // Utility Functions
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            border: none;
            border-radius: 12px;
            animation: slideInRight 0.3s ease-out;
            backdrop-filter: blur(10px);
        `;
        
        const iconClass = type === 'error' ? 'fa-exclamation-circle' : 
                         type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas ${iconClass} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Add custom CSS for animations
    const additionalStyles = document.createElement('style');
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
        
        .form-control.is-valid {
            border-color: var(--success-color);
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='m2.3 6.73.94-.94 1.44 1.44L7.4 4.5l.94.94L4.66 9.2z'/%3e%3c/svg%3e");
        }
        
        .form-control.is-invalid {
            border-color: var(--error-color);
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m5.8 4.6 1.4 1.4M7.2 4.6l-1.4 1.4'/%3e%3c/svg%3e");
        }
        
        .invalid-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: var(--error-color);
        }
    `;
    document.head.appendChild(additionalStyles);

    // Check for success message and show modal
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        setTimeout(() => {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
        }, 1000);
    }

    console.log('🎨 SkinLabs Appointment System initialized successfully!');
});