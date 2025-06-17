<?php
session_start();
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="SkinLabs - Tu centro de estética profesional. Tratamientos de belleza personalizados para realzar tu belleza natural.">
    
    <!-- Fonts -->
     <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/index.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="assets/img/favicon_v2.png">
    
    <!-- SEO Meta Tags -->
    <meta name="keywords" content="estética, belleza, spa, tratamientos faciales, masajes, skinlabs">
    <meta name="author" content="SkinLabs">
    <meta property="og:title" content="SkinLabs - Estética Profesional">
    <meta property="og:description" content="Tu centro de belleza y bienestar donde realzamos tu belleza natural">
    <meta property="og:type" content="website">
    <title>SkinLabs - Estética Profesional | Belleza & Bienestar</title>
</head>
<body>
    <!-- Background Elements -->
    <div class="background-elements">
        <div class="floating-element element-1"></div>
        <div class="floating-element element-2"></div>
        <div class="floating-element element-3"></div>
        <div class="floating-element element-4"></div>
        <div class="floating-element element-5"></div>
    </div>

    <!-- Particles Background -->
    <div class="particles-container" id="particles"></div>

    <!-- Main Content -->
    <div class="main-overlay">
        <!-- Navigation Hint -->
        <nav class="top-nav">
            <div class="nav-time" id="currentTime"></div>
            <div class="nav-weather">
                <i class="fas fa-sun"></i>
                <span>Día perfecto para cuidarte</span>
            </div>
        </nav>

        <!-- Logo Section -->
        <div class="logo-section">
            <div class="logo-container d-flex align-items-center justify-content-center flex-column">
                <img src="assets/img/logo.png" alt="SkinLabs logo" style="max-height: 280px; margin-bottom: -50px; margin-top: 0px;">
            </div>
        </div>

        <!-- Hero Section -->
        <div class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">
                    <span class="animated-gradient-text">Bienvenido a tu espacio de bienestar</span>
                </h1>
               
                <p class="elegant-phrase">Donde la belleza se encuentra con la ciencia, y cada tratamiento es una experiencia única diseñada especialmente para ti.</p>

                <!-- Action Buttons -->
                <div class="action-buttons">
                    <a href="clientes/servicios.php" class="btn-action btn-client" data-role="client">
                        <div class="btn-icon">
                            <i class="fas fa-user-heart"></i>
                        </div>
                        <div class="btn-content">
                            <span class="btn-title">Soy Cliente</span>
                            <span class="btn-subtitle">Descubre nuestros tratamientos</span>
                        </div>
                        <div class="btn-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </a>

                    <a href="login.php" class="btn-action btn-employee" data-role="employee">
                        <div class="btn-icon">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <div class="btn-content">
                            <span class="btn-title">Soy Empleado</span>
                            <span class="btn-subtitle">Acceso al panel de control</span>
                        </div>
                        <div class="btn-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </a>
                </div>

                <!-- Quick Access -->
                <div class="quick-access">
                    <div class="quick-item" data-action="appointment">
                        <i class="fas fa-calendar-plus"></i>
                        <span>Agendar Cita</span>
                    </div>
                    <div class="quick-item" data-action="services">
                        <i class="fas fa-spa"></i>
                        <span>Ver Servicios</span>
                    </div>
                    <div class="quick-item" data-action="contact">
                        <i class="fas fa-phone"></i>
                        <span>Contactar</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Inspirational Quote -->
        <div class="quote-section">
            <div class="quote-container">
                <div class="quote-icon">
                    <i class="fas fa-quote-left"></i>
                </div>
                <blockquote class="quote-text" id="inspirationalQuote">
                    La belleza comienza en el momento en que decides ser tú misma.
                </blockquote>
                <cite class="quote-author" id="quoteAuthor">- Coco Chanel</cite>
            </div>
        </div>

        <!-- Features Preview -->
        <div class="features-preview">
            <div class="feature-item" data-feature="treatments">
                <div class="feature-icon">
                    <i class="fas fa-leaf"></i>
                </div>
                <div class="feature-text">
                    <h3>Tratamientos Naturales</h3>
                    <p>Productos orgánicos de primera calidad</p>
                </div>
            </div>

            <div class="feature-item" data-feature="professionals">
                <div class="feature-icon">
                    <i class="fas fa-user-md"></i>
                </div>
                <div class="feature-text">
                    <h3>Profesionales Certificados</h3>
                    <p>Equipo altamente capacitado y experimentado</p>
                </div>
            </div>

            <div class="feature-item" data-feature="technology">
                <div class="feature-icon">
                    <i class="fas fa-magic"></i>
                </div>
                <div class="feature-text">
                    <h3>Tecnología Avanzada</h3>
                    <p>Equipos de última generación para mejores resultados</p>
                </div>
            </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="bottom-nav">
            <div class="social-links">
                <a href="#" class="social-link" data-platform="instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="social-link" data-platform="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-link" data-platform="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" id="welcomeModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        <i class="fas fa-heart text-primary me-2"></i>
                        ¡Bienvenido a SkinLabs!
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <p>Estamos emocionados de acompañarte en tu viaje hacia el bienestar y la belleza natural.</p>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                            <i class="fas fa-sparkles me-2"></i>¡Comencemos!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/index.js?v=skinlabs3"></script>
</body>
</html>