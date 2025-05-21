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
  <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
  <title>SkinLabs - Belleza & Bienestar</title>
  <!-- Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
  <!-- Fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  <!-- CSS personalizado -->
  <link rel="stylesheet" href="../assets/css/styles.css" />
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        SkinLabs
        <small>Belleza & Bienestar</small>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="#">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#servicios">Servicios</a></li>
          <li class="nav-item"><a class="nav-link" href="#nosotros">Nosotros</a></li>
          <li class="nav-item"><a class="nav-link" href="#reservar">Reservar cita</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 hero-content">
          <h1 class="hero-title">Realza tu belleza natural</h1>
          <p class="hero-text">Descubre nuestros tratamientos faciales y corporales para el bienestar total.</p>
          <a href="agendar.php" class="btn btn-primary">Reservar cita</a>
        </div>
        <div class="col-lg-6 hero-image">
          <!-- Imagen de la hero section -->
          <img src="../assets/img/mujer1.png" alt="Mujer con flor en el pelo" class="img-fluid">
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="services-section" id="servicios">
    <div class="container">
      <h2 class="section-title">Nuestros servicios</h2>
      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/facial.png" alt="Tratamiento facial">
            </div>
            <h3 class="service-title">Tratamientos faciales</h3>
            <p class="service-description">Tratamientos personalizados para cada tipo de piel.</p>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/masajes.jpg" alt="Masaje relajante">
            </div>
            <h3 class="service-title">Masajes relajantes</h3>
            <p class="service-description">Técnicas especializadas para aliviar el estrés.</p>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/corporal.jpg" alt="Cuidado corporal">
            </div>
            <h3 class="service-title">Cuidado corporal</h3>
            <p class="service-description">Tratamientos corporales rejuvenecedores.</p>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <div class="service-card">
            <div class="service-icon">
              <img src="../assets/img/depilacion.jpg" alt="Depilación">
            </div>
            <h3 class="service-title">Depilación</h3>
            <p class="service-description">Técnicas avanzadas para una piel suave.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section" id="reservar">
    <div class="container text-center">
      <h2 class="section-title">Agenda tu cita hoy</h2>
      <p class="mb-4">Reserva tu cita en línea de forma fácil y rápida.</p>
      <a href="agendar.php" class="btn btn-primary">Reservar cita</a>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section" id="contacto">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="contact-title text-center">Contáctanos</h2>
          <form id="contactForm">
            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Nombre" required>
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email" required>
            </div>
            <div class="mb-3">
              <textarea class="form-control" rows="4" placeholder="Mensaje" required></textarea>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Enviar mensaje</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <h3 class="footer-title">SkinLabs</h3>
          <p>Tu centro de belleza y bienestar donde realzamos tu belleza natural con tratamientos personalizados y de alta calidad.</p>
        </div>
        <div class="col-md-4 mb-4">
          <h3 class="footer-title">Contacto</h3>
          <div class="footer-contact">
            <i class="fas fa-map-marker-alt"></i>
            <p>Amenábar 629, Colegiales, Ciudad Autónoma de Buenos Aires, Argentina</p>
          </div>
          <div class="footer-contact">
            <i class="fas fa-phone"></i>
            <p>123-456-7890</p>
          </div>
          <div class="footer-contact">
            <i class="fas fa-envelope"></i>
            <p>info@skinlabs.com</p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <h3 class="footer-title">Síguenos</h3>
          <p>Mantente al día con nuestras últimas novedades y promociones.</p>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
          </div>
        </div>
      </div>
      <div class="text-center">
        <p class="mb-0">&copy; 2025 SkinLabs. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/script.js"></script>

</body>
</html>
