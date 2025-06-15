<?php if (isset($_GET['exito']) && $_GET['exito'] == 1): ?>
    <div class="alert alert-success text-center mt-3">
        ¡Cita agendada con éxito!
    </div>
<?php endif; ?>

<?php include("../php/conexion.php"); ?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="../assets/img/favicon.png?v=2" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  <link rel="stylesheet" href="../assets/css/styles.css?v=cosmico3" />
  <title>SkinLabs - Belleza & Bienestar</title>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#inicio" style="position: relative; display: block; height: 50px;">
        <img src="../assets/img/logo.png" alt="SkinLabs logo"
            style="position: absolute; top: 50%; left: 0; transform: translateY(-50%) scale(1.5); height: 80px;">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="#inicio">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#servicios">Servicios</a></li>
          <li class="nav-item"><a class="nav-link" href="#nosotros">Nosotros</a></li>
          <li class="nav-item"><a class="nav-link" href="#reservar">Reservar cita</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero-section" id="inicio">
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="row align-items-center min-vh-100">
        <div class="col-lg-6 hero-content">
          <h1 class="hero-title">Realza tu belleza natural</h1>
          <p class="hero-text">Descubre nuestros tratamientos faciales y corporales diseñados especialmente para tu bienestar total y relajación profunda.</p>
          <div class="hero-buttons">
            <a href="agendar.php" class="btn btn-primary btn-lg">
              <i class="fas fa-calendar-alt me-2"></i>Reservar cita
            </a>
            <a href="#servicios" class="btn btn-outline-light btn-lg ms-3">
              <i class="fas fa-arrow-down me-2"></i>Ver servicios
            </a>
          </div>
        </div>
        <div class="col-lg-6 hero-image">
          <div class="hero-image-container">
            <img src="../assets/img/mujer.png" alt="Mujer con flor en el pelo" class="img-fluid hero-img">
          </div>
        </div>
      </div>
    </div>
    <div class="hero-scroll-indicator">
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>

  <!-- Services Section -->
  <section class="services-section" id="servicios">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <div class="section-badge">Nuestros Servicios</div>
          <h2 class="section-title">Tratamientos de belleza personalizados</h2>
          <p class="section-subtitle">Cada tratamiento está diseñado para realzar tu belleza natural y brindarte una experiencia única de relajación.</p>
        </div>
      </div>
      
      <div class="row g-4">
        <div class="col-lg-3 col-md-6">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/facial.png" alt="Tratamiento facial">
              <div class="service-overlay">
                <i class="fas fa-spa"></i>
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title">Tratamientos faciales</h3>
              <p class="service-description">Tratamientos personalizados para cada tipo de piel, utilizando productos de alta calidad.</p>
              <div class="service-features">
                <span class="feature-tag">Limpieza profunda</span>
                <span class="feature-tag">Hidratación</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/masajes.jpg" alt="Masaje relajante">
              <div class="service-overlay">
                <i class="fas fa-hands"></i>
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title">Masajes relajantes</h3>
              <p class="service-description">Técnicas especializadas para aliviar el estrés y la tensión muscular.</p>
              <div class="service-features">
                <span class="feature-tag">Relajación</span>
                <span class="feature-tag">Bienestar</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/corporal.jpg" alt="Cuidado corporal">
              <div class="service-overlay">
                <i class="fas fa-leaf"></i>
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title">Cuidado corporal</h3>
              <p class="service-description">Tratamientos corporales rejuvenecedores para una piel suave y radiante.</p>
              <div class="service-features">
                <span class="feature-tag">Exfoliación</span>
                <span class="feature-tag">Nutrición</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/depilacion.jpg" alt="Depilación">
              <div class="service-overlay">
                <i class="fas fa-magic"></i>
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title">Depilación</h3>
              <p class="service-description">Técnicas avanzadas y seguras para una piel perfectamente suave.</p>
              <div class="service-features">
                <span class="feature-tag">Láser</span>
                <span class="feature-tag">Cera</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="about-section" id="nosotros">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="about-content">
            <div class="section-badge">Sobre Nosotros</div>
            <h2 class="section-title">Más de 10 años cuidando tu belleza</h2>
            <p class="about-text">En SkinLabs, creemos que cada persona tiene una belleza única que merece ser realzada. Nuestro equipo de profesionales altamente capacitados utiliza las técnicas más avanzadas y productos de primera calidad.</p>
            <div class="about-stats">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Clientes satisfechos</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">10+</div>
                <div class="stat-label">Años de experiencia</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">15+</div>
                <div class="stat-label">Tratamientos disponibles</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="about-image">
            <img src="../assets/img/about.png" alt="Nuestro spa" class="img-fluid rounded-3">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section" id="reservar">
    <div class="cta-overlay"></div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="cta-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <h2 class="cta-title">¿Lista para tu transformación?</h2>
          <p class="cta-text">Agenda tu cita hoy y descubre por qué somos el centro de belleza preferido. Reserva en línea de forma fácil y rápida.</p>
          <div class="cta-buttons">
            <a href="agendar.php" class="btn btn-primary btn-lg">
              <i class="fas fa-phone me-2"></i>Reservar ahora
            </a>
            <a href="#contacto" class="btn btn-outline-light btn-lg ms-3">
              <i class="fas fa-envelope me-2"></i>Más información
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section" id="contacto">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <div class="section-badge">Contacto</div>
          <h2 class="section-title">Estamos aquí para ti</h2>
          <p class="section-subtitle">¿Tienes alguna pregunta? No dudes en contactarnos. Estaremos encantados de ayudarte.</p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-lg-8">
          <div class="contact-form-container">
            <form id="contactForm" class="contact-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre" required>
                    <label for="nombre">Nombre completo</label>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="form-floating">
                    <input type="email" class="form-control" id="email" placeholder="Email" required>
                    <label for="email">Correo electrónico</label>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-floating">
                  <input type="tel" class="form-control" id="telefono" placeholder="Teléfono">
                  <label for="telefono">Teléfono (opcional)</label>
                </div>
              </div>
              <div class="mb-4">
                <div class="form-floating">
                  <textarea class="form-control" id="mensaje" placeholder="Mensaje" style="height: 120px" required></textarea>
                  <label for="mensaje">Tu mensaje</label>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg">
                  <i class="fas fa-paper-plane me-2"></i>Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
        
        
        <div class="col-lg-4">
          <div class="contact-info-container">           
            <div class="contact-info-item">
              <div class="contact-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="contact-details">
                <h4>Teléfono</h4>
                <p>+54 11 123-456-7890</p>
              </div>
            </div>
            
            <div class="contact-info-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-details">
                <h4>Email</h4>
                <p>info@skinlabs.com</p>
              </div>
            </div>
            
            <div class="contact-info-item">
              <div class="contact-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="contact-details">
                <h4>Horarios</h4>
                <p>Lun - Vie: 9:00 - 20:00<br>Sáb: 9:00 - 18:00<br>Dom: Cerrado</p>
              </div>
            </div>
                        <div class="contact-info-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-details">
                <h4>Ubicación</h4>
                <p>Amenábar 629, Colegiales<br>CABA, Buenos Aires<br>Argentina</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-5">
      <h4 class="section-title">Encontranos acá 📍</h4>
      <p class="cta-text">Te esperamos en nuestro local ubicado en Amenábar 629, CABA</p>
    </div>

    <div class="map-container mt-4 mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13131.509119118452!2d-58.4562975940193!3d-34.570703716040465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5e6d30b21a7%3A0x4bfc36468d317cf3!2sAmen%C3%A1bar%20629%2C%20C1426AJI%20CABA!5e0!3m2!1ses-419!2sar!4v1718461000000!5m2!1ses-419!2sar"
        width="100%" height="400" style="border:0;" allowfullscreen=""
        loading="lazy" referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="footer-brand">
            <h3 class="footer-title">SkinLabs</h3>
            <p class="footer-description">Tu centro de belleza y bienestar donde realzamos tu belleza natural con tratamientos personalizados y de alta calidad.</p>
              <div class="social-icons">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://wa.me/5491112345678" target="_blank" aria-label="WhatsApp">
                  <i class="fab fa-whatsapp"></i>
                </a>
              </div>
          </div>
        </div>
        
        <div class="col-lg-2 col-md-6 mb-4">
          <h4 class="footer-title">Servicios</h4>
          <ul class="footer-links">
            <li><a href="#servicios">Tratamientos faciales</a></li>
            <li><a href="#servicios">Masajes</a></li>
            <li><a href="#servicios">Cuidado corporal</a></li>
            <li><a href="#servicios">Depilación</a></li>
          </ul>
        </div>
        
        <div class="col-lg-3 col-md-6 mb-4">
          <h4 class="footer-title">Enlaces</h4>
          <ul class="footer-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#nosotros">Sobre nosotros</a></li>
            <li><a href="#reservar">Reservar cita</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        
        <div class="col-lg-3 col-md-6 mb-4">
          <h4 class="footer-title">Contacto</h4>
          <div class="footer-contact">
            <i class="fas fa-map-marker-alt"></i>
            <span>Amenábar 629, Colegiales, CABA</span>
          </div>
          <div class="footer-contact">
            <i class="fas fa-phone"></i>
            <span>+54 11 123-456-7890</span>
          </div>
          <div class="footer-contact">
            <i class="fas fa-envelope"></i>
            <span>info@skinlabs.com</span>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="copyright">&copy; 2025 SkinLabs. Todos los derechos reservados.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="footer-bottom-links">
              <a href="#">Política de privacidad</a>
              <a href="#">Términos de servicio</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/script.js"></script>

</body>
  <a href="https://wa.me/5493446373879?text=Hola%20SkinLabs%2C%20quiero%20más%20info%20sobre%20los%20tratamientos" 
    class="whatsapp-float" 
    target="_blank" 
    aria-label="WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>
</html>