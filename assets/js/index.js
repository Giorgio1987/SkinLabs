document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeApp();

    function initializeApp() {
        // Initialize components
        initializeParticles();
        initializeTime();
        initializeQuotes();
        initializeInteractions();
        initializeAnimations();
        initializeAccessibility();
        
        // Show welcome modal after everything loads
        setTimeout(() => {
            showWelcomeModal();
        }, 1000);
    }

    // Particles System
    function initializeParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 8000);
        }

        // Create initial particles
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => createParticle(), i * 100);
        }

        // Continuously create new particles
        setInterval(createParticle, 200);
    }

    // Time Display
    function initializeTime() {
        const timeElement = document.getElementById('currentTime');
        
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
            timeElement.textContent = timeString;
        }
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Inspirational Quotes
    function initializeQuotes() {
        const quotes = [
            {
                text: "La belleza comienza en el momento en que decides ser tú misma.",
                author: "Coco Chanel"
            },
            {
                text: "La confianza es el mejor maquillaje que puedes usar.",
                author: "Bobbi Brown"
            },
            {
                text: "La belleza no está en el rostro, está en la luz del corazón.",
                author: "Kahlil Gibran"
            },
            {
                text: "Cuida tu cuerpo, es el único lugar que tienes para vivir.",
                author: "Jim Rohn"
            },
            {
                text: "La verdadera belleza viene de adentro, pero un poco de ayuda externa no hace daño.",
                author: "Anónimo"
            },
            {
                text: "Invierte en tu piel, te acompañará toda la vida.",
                author: "Linden Tyler"
            }
        ];

        const quoteText = document.getElementById('inspirationalQuote');
        const quoteAuthor = document.getElementById('quoteAuthor');
        let currentQuoteIndex = 0;

        function changeQuote() {
            const quote = quotes[currentQuoteIndex];
            
            // Fade out
            quoteText.style.opacity = '0';
            quoteAuthor.style.opacity = '0';
            
            setTimeout(() => {
                quoteText.textContent = quote.text;
                quoteAuthor.textContent = `- ${quote.author}`;
                
                // Fade in
                quoteText.style.opacity = '1';
                quoteAuthor.style.opacity = '1';
            }, 300);
            
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }

        // Change quote every 8 seconds
        setInterval(changeQuote, 8000);
    }

    // Interactive Elements
    function initializeInteractions() {
        // Button hover effects
        const actionButtons = document.querySelectorAll('.btn-action');
        actionButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                addRippleEffect(this);
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('click', function(e) {
                const role = this.getAttribute('data-role');
                trackUserInteraction('button_click', role);
                addClickEffect(this, e);
            });
        });

        // Quick access items
        const quickItems = document.querySelectorAll('.quick-item');
        quickItems.forEach(item => {
            item.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                handleQuickAction(action);
                addPulseEffect(this);
            });
        });

        // Feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('click', function() {
                const feature = this.getAttribute('data-feature');
                showFeatureDetails(feature);
            });
        });

        // Social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('data-platform');
                handleSocialClick(platform);
            });
        });

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Animation Effects
    function initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature-item, .quick-item');
        animatedElements.forEach(el => observer.observe(el));

        // Parallax effect for floating elements
        window.addEventListener('scroll', debounce(handleParallax, 10));
        
        // Mouse movement parallax
        document.addEventListener('mousemove', debounce(handleMouseParallax, 16));
    }

    // Accessibility Features
    function initializeAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Escape':
                    closeAllModals();
                    break;
                case 'Enter':
                    if (e.target.classList.contains('quick-item')) {
                        e.target.click();
                    }
                    break;
                case '1':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        document.querySelector('.btn-client').focus();
                    }
                    break;
                case '2':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        document.querySelector('.btn-employee').focus();
                    }
                    break;
            }
        });

        // Focus management
        const focusableElements = document.querySelectorAll('.btn-action, .quick-item, .social-link');
        focusableElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--coral-salmon)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });

        // Screen reader announcements
        announceToScreenReader('Página de inicio de SkinLabs cargada. Use las teclas Ctrl+1 para cliente o Ctrl+2 para empleado.');
    }

    // Utility Functions
    function addRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    function addClickEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: var(--rosa-melocoton);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: clickPulse 0.4s ease-out;
            pointer-events: none;
        `;
        
        element.appendChild(clickEffect);
        setTimeout(() => clickEffect.remove(), 400);
    }

    function addPulseEffect(element) {
        element.style.animation = 'pulse 0.3s ease-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 300);
    }

    function handleQuickAction(action) {
        const actions = {
            appointment: () => {
                showNotification('Redirigiendo a agendar cita...', 'info');
                setTimeout(() => {
                    window.location.href = 'clientes/servicios.php#reservar';
                }, 1000);
            },
            services: () => {
                showNotification('Mostrando servicios disponibles...', 'info');
                setTimeout(() => {
                    window.location.href = 'clientes/servicios.php#servicios';
                }, 1000);
            },
            contact: () => {
                showNotification('Abriendo información de contacto...', 'info');
                setTimeout(() => {
                    window.location.href = 'clientes/servicios.php#contacto';
                }, 1000);
            }
        };
        
        if (actions[action]) {
            actions[action]();
        }
    }

    function showFeatureDetails(feature) {
        const features = {
            treatments: {
                title: 'Tratamientos Naturales',
                description: 'Utilizamos productos orgánicos de primera calidad, libres de químicos dañinos, para cuidar tu piel de manera natural y efectiva.'
            },
            professionals: {
                title: 'Profesionales Certificados',
                description: 'Nuestro equipo cuenta con certificaciones internacionales y años de experiencia en estética y bienestar.'
            },
            technology: {
                title: 'Tecnología Avanzada',
                description: 'Equipos de última generación que garantizan resultados superiores y tratamientos más efectivos.'
            }
        };
        
        const featureInfo = features[feature];
        if (featureInfo) {
            showCustomModal(featureInfo.title, featureInfo.description);
        }
    }

    function handleSocialClick(platform) {
        const socialUrls = {
            instagram: 'https://instagram.com/skinlabs',
            facebook: 'https://facebook.com/skinlabs',
            whatsapp: 'https://wa.me/1234567890'
        };
        
        showNotification(`Abriendo ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`, 'info');
        
        setTimeout(() => {
            if (socialUrls[platform]) {
                window.open(socialUrls[platform], '_blank');
            }
        }, 500);
    }

    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    function handleMouseParallax(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const parallaxElements = document.querySelectorAll('.floating-element');
        parallaxElements.forEach((element, index) => {
            const speed = 10 + (index * 5);
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            element.style.transform += ` translate(${x}px, ${y}px)`;
        });
    }

    function showWelcomeModal() {
        // Only show if it's the user's first visit
        if (!localStorage.getItem('skinlabs_visited')) {
            const modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
            modal.show();
            localStorage.setItem('skinlabs_visited', 'true');
        }
    }

    function showCustomModal(title, content) {
        // Create custom modal
        const modalHtml = `
            <div class="modal fade" id="customModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title">
                                <i class="fas fa-info-circle text-primary me-2"></i>
                                ${title}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>${content}</p>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                                <i class="fas fa-check me-2"></i>Entendido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing custom modal
        const existingModal = document.getElementById('customModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add new modal
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById('customModal'));
        modal.show();
        
        // Remove modal after hiding
        document.getElementById('customModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification alert alert-${type} alert-dismissible fade show`;
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
            backdrop-filter: blur(10px);
        `;
        
        const iconClass = type === 'error' ? 'fa-exclamation-circle' : 
                         type === 'warning' ? 'fa-exclamation-triangle' : 
                         type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas ${iconClass} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }

    function trackUserInteraction(event, data) {
        // Analytics tracking (implement with your preferred analytics service)
        console.log(`User interaction: ${event}`, data);
        
        // Example: Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                custom_parameter: data
            });
        }
    }

    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add custom CSS animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes clickPulse {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
        
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
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(additionalStyles);

    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 SkinLabs loaded in ${loadTime}ms`);
        
        // Track performance
        trackUserInteraction('page_load_time', loadTime);
    });

    console.log('✨ SkinLabs Index initialized successfully!');
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}