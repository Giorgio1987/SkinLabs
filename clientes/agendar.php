<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');

include("../php/conexion.php");

// Inicializamos mensaje
$mensaje = "";

// Mapeo servicios con sus profesionales
$mapa_profesionales = [
    'Limpieza Facial' => 'Esteticista',
    'Tratamiento Antiacné' => 'Dermatóloga',
    'Masajes terapéuticos y relajantes' => 'Kinesiólogo',
    'Pedicura y manicura' => 'Pedicura y manicura'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
    $telefono = mysqli_real_escape_string($conexion, $_POST['telefono']);
    $dni = mysqli_real_escape_string($conexion, $_POST['dni']);
    $fecha = $_POST['fecha'];
    $hora = $_POST['hora'];
    $servicio = mysqli_real_escape_string($conexion, $_POST['servicio']);
    
    $fecha_hora_turno = DateTime::createFromFormat('Y-m-d H:i', "$fecha $hora");
    $fecha_hora_actual = new DateTime();
 
     if ($fecha_hora_turno < $fecha_hora_actual) {
      $mensaje = "<div class='alert alert-danger'><i class='fas fa-exclamation-triangle me-2'></i>No se pueden agendar turnos en el pasado.</div>";
      }

    else {
        $dia_semana = date('w', strtotime($fecha));
        if ($dia_semana == 0 || $dia_semana == 6) {
            $mensaje = "<div class='alert alert-danger'><i class='fas fa-calendar-times me-2'></i>Solo se permiten turnos de lunes a viernes.</div>";
        } else {
            $hora_ts = strtotime($hora);
            $inicio_ts = strtotime('09:00');
            $fin_ts = strtotime('18:00');

            if ($hora_ts < $inicio_ts || $hora_ts > $fin_ts) {
                $mensaje = "<div class='alert alert-danger'><i class='fas fa-clock me-2'></i>Horario fuera del rango permitido (9:00 a 18:00).</div>";
            } else {
                // Verificar si el DNI ya tiene un turno ese día
                $sql_dni = "SELECT * FROM citas WHERE fecha = '$fecha' AND dni = '$dni'";
                $res_dni = mysqli_query($conexion, $sql_dni);

                if (mysqli_num_rows($res_dni) > 0) {
                    $mensaje = "<div class='alert alert-danger'><i class='fas fa-user-times me-2'></i>Ya tenés un turno agendado ese día con ese DNI.</div>";
                } else {
                    // Obtener profesional adecuado según el servicio
                    $especialidad = $mapa_profesionales[$servicio] ?? '';
                    $sql_prof = "SELECT * FROM profesionales WHERE especialidad = '$especialidad' LIMIT 1";
                    $res_prof = mysqli_query($conexion, $sql_prof);
                    $profe = mysqli_fetch_assoc($res_prof);
                    if (!$profe) {
                        $mensaje = "<div class='alert alert-danger'><i class='fas fa-user-md me-2'></i>No se encontró un profesional para el tratamiento.</div>";
                    } else {
                        $profesional_id = $profe['id'];

                        // Verificar si el profesional ya tiene un turno en esa fecha y hora
                        $sql_profe = "SELECT * FROM citas WHERE fecha = '$fecha' AND hora = '$hora' AND profesional_id = '$profesional_id'";
                        $res_profe = mysqli_query($conexion, $sql_profe);

                        if (mysqli_num_rows($res_profe) > 0) {
                            $mensaje = "<div class='alert alert-danger'><i class='fas fa-user-clock me-2'></i>El profesional ya tiene un turno en ese horario.</div>";
                        } else {
                            // Buscar consultorios libres
                            $sql_disponibles = "
                                SELECT id FROM consultorios
                                WHERE id NOT IN (
                                    SELECT consultorio_id FROM citas WHERE fecha = '$fecha' AND hora = '$hora'
                                )
                            ";
                            $res_consultorios = mysqli_query($conexion, $sql_disponibles);

                            $consultorios_disponibles = [];
                            while ($row = mysqli_fetch_assoc($res_consultorios)) {
                                $consultorios_disponibles[] = $row['id'];
                            }

                            if (count($consultorios_disponibles) === 0) {
                                $mensaje = "<div class='alert alert-danger'><i class='fas fa-door-closed me-2'></i>No hay consultorios disponibles para esa hora.</div>";
                            } else {
                                // Seleccionar consultorio aleatorio
                                $consultorio_id = $consultorios_disponibles[array_rand($consultorios_disponibles)];

                                // Insertar turno
                                $insert = "INSERT INTO citas 
                                    (nombre, telefono, dni, servicio, profesional_id, consultorio_id, fecha, hora)
                                    VALUES
                                    ('$nombre', '$telefono', '$dni', '$servicio', '$profesional_id', '$consultorio_id', '$fecha', '$hora')";

                                if (mysqli_query($conexion, $insert)) {
                                    $mensaje = "<div class='alert alert-success'><i class='fas fa-check-circle me-2'></i>¡Turno agendado con éxito! Te esperamos en SkinLabs.</div>";
                                } else {
                                    $mensaje = "<div class='alert alert-danger'><i class='fas fa-exclamation-circle me-2'></i>Error al agendar el turno: " . mysqli_error($conexion) . "</div>";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agendar Turno - SkinLabs | Belleza & Bienestar</title>
    <meta name="description" content="Agenda tu cita en SkinLabs. Sistema de reservas online para tratamientos de belleza y bienestar.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/agendar.css?v=skinlabs4">
    
    <!-- Favicon -->
    <link rel="icon" href="../assets/img/favicon.png" type="image/png">
</head>
<body>
    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen">
        <div class="loading-content">
            <div class="loading-logo">
                <span class="logo-text">SkinLabs</span>
                <div class="loading-spinner"></div>
            </div>
            <div class="loading-text">Preparando tu agenda...</div>
        </div>
    </div>

    <!-- Background Elements -->
    <div class="background-elements">
        <div class="floating-element element-1"></div>
        <div class="floating-element element-2"></div>
        <div class="floating-element element-3"></div>
        <div class="floating-element element-4"></div>
    </div>

    <!-- Navigation -->
    <nav class="top-nav">
        <div class="nav-brand">
            <a href="../index.php" class="brand-link">
                <span class="brand-main">SkinLabs</span>
                <span class="brand-sub">Belleza & Bienestar</span>
            </a>
        </div>
        <div class="nav-actions">
            <a href="servicios.php" class="nav-link">
                <i class="fas fa-arrow-left me-2"></i>Volver a servicios
            </a>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="main-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-xl-7">
                    
                    <!-- Header Section -->
                    <div class="page-header">
                        <div class="header-icon">
                            <i class="fas fa-calendar-plus"></i>
                        </div>
                        <h1 class="page-title">Agendar tu cita</h1>
                        <p class="page-subtitle">Reserva tu momento de bienestar en SkinLabs. Selecciona el tratamiento perfecto para ti.</p>
                    </div>

                    <!-- Progress Steps -->
                    <div class="progress-steps">
                        <div class="step active" data-step="1">
                            <div class="step-icon">
                                <i class="fas fa-spa"></i>
                            </div>
                            <span class="step-label">Tratamiento</span>
                        </div>
                        <div class="step" data-step="2">
                            <div class="step-icon">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="step-label">Datos</span>
                        </div>
                        <div class="step" data-step="3">
                            <div class="step-icon">
                                <i class="fas fa-calendar"></i>
                            </div>
                            <span class="step-label">Fecha & Hora</span>
                        </div>
                        <div class="step" data-step="4">
                            <div class="step-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <span class="step-label">Confirmación</span>
                        </div>
                    </div>

                    <!-- Alert Messages -->
                    <?php if (!empty($mensaje)): ?>
                        <div class="message-container">
                            <?= $mensaje ?>
                        </div>
                    <?php endif; ?>

                    <!-- Appointment Form -->
                    <div class="appointment-card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-calendar-heart me-2"></i>
                                Completa tu reserva
                            </h3>
                            <p class="card-subtitle">Todos los campos son obligatorios para confirmar tu cita</p>
                        </div>

                        <form method="POST" id="appointmentForm" class="appointment-form">
                            
                            <!-- Step 1: Service Selection -->
                            <div class="form-step active" data-step="1">
                                <div class="step-header">
                                    <h4><i class="fas fa-spa me-2"></i>Selecciona tu tratamiento</h4>
                                    <p>Elige el servicio que mejor se adapte a tus necesidades</p>
                                </div>
                                
                                <div class="service-grid">
                                    <div class="service-option" data-service="Limpieza Facial">
                                        <div class="service-icon">
                                            <i class="fas fa-leaf"></i>
                                        </div>
                                        <div class="service-content">
                                            <h5>Limpieza Facial</h5>
                                            <p>Tratamiento profundo para purificar y renovar tu piel</p>
                                            <div class="service-details">
                                                <span class="duration"><i class="fas fa-clock me-1"></i>60 min</span>
                                                <span class="professional"><i class="fas fa-user-md me-1"></i>Esteticista</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="service-option" data-service="Tratamiento Antiacné">
                                        <div class="service-icon">
                                            <i class="fas fa-magic"></i>
                                        </div>
                                        <div class="service-content">
                                            <h5>Tratamiento Antiacné</h5>
                                            <p>Solución especializada para pieles con tendencia acneica</p>
                                            <div class="service-details">
                                                <span class="duration"><i class="fas fa-clock me-1"></i>75 min</span>
                                                <span class="professional"><i class="fas fa-user-md me-1"></i>Dermatóloga</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="service-option" data-service="Masajes terapéuticos y relajantes">
                                        <div class="service-icon">
                                            <i class="fas fa-hands"></i>
                                        </div>
                                        <div class="service-content">
                                            <h5>Masajes Relajantes</h5>
                                            <p>Libera tensiones y encuentra tu equilibrio interior</p>
                                            <div class="service-details">
                                                <span class="duration"><i class="fas fa-clock me-1"></i>90 min</span>
                                                <span class="professional"><i class="fas fa-user-md me-1"></i>Kinesiólogo</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="service-option" data-service="Pedicura y manicura">
                                        <div class="service-icon">
                                            <i class="fas fa-hand-sparkles"></i>
                                        </div>
                                        <div class="service-content">
                                            <h5>Pedicura y Manicura</h5>
                                            <p>Cuidado completo para tus manos y pies</p>
                                            <div class="service-details">
                                                <span class="duration"><i class="fas fa-clock me-1"></i>45 min</span>
                                                <span class="professional"><i class="fas fa-user-md me-1"></i>Especialista</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <input type="hidden" name="servicio" id="selectedService" required>
                            </div>

                            <!-- Step 2: Personal Information -->
                            <div class="form-step" data-step="2">
                                <div class="step-header">
                                    <h4><i class="fas fa-user me-2"></i>Tus datos personales</h4>
                                    <p>Necesitamos esta información para confirmar tu reserva</p>
                                </div>

                                <div class="row">
                                    <div class="col-12 mb-4">
                                        <div class="form-floating">
                                            <input type="text" name="nombre" id="nombre" class="form-control" placeholder="Nombre y Apellido" required>
                                            <label for="nombre"><i class="fas fa-user me-2"></i>Nombre y Apellido</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-4">
                                        <div class="form-floating">
                                            <input type="tel" name="telefono" id="telefono" class="form-control" placeholder="Teléfono" required>
                                            <label for="telefono"><i class="fas fa-phone me-2"></i>Teléfono</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-4">
                                        <div class="form-floating">
                                            <input type="text" name="dni" id="dni" class="form-control" placeholder="DNI" required>
                                            <label for="dni"><i class="fas fa-id-card me-2"></i>DNI</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Step 3: Date and Time -->
                            <div class="form-step" data-step="3">
                                <div class="step-header">
                                    <h4><i class="fas fa-calendar me-2"></i>Fecha y horario</h4>
                                    <p>Selecciona cuándo te gustaría visitarnos</p>
                                </div>

                                <div class="datetime-container">
                                    <div class="date-section">
                                        <label class="section-label">
                                            <i class="fas fa-calendar-alt me-2"></i>Fecha de la cita
                                        </label>
                                        <input type="date" name="fecha" id="fecha" class="form-control date-input" required>
                                        <small class="form-text">Disponible de lunes a viernes</small>
                                    </div>

                                    <div class="time-section">
                                        <label class="section-label">
                                            <i class="fas fa-clock me-2"></i>Horario preferido
                                        </label>
                                        <div class="time-slots" id="timeSlots">
                                            <!-- Time slots will be generated by JavaScript -->
                                        </div>
                                        <input type="hidden" name="hora" id="selectedTime" required>
                                        <small class="form-text">Turnos disponibles de 9:00 a 18:00 cada 30 minutos</small>
                                    </div>
                                </div>
                            </div>

                            <!-- Step 4: Confirmation -->
                            <div class="form-step" data-step="4">
                                <div class="step-header">
                                    <h4><i class="fas fa-check-circle me-2"></i>Confirma tu reserva</h4>
                                    <p>Revisa los detalles de tu cita antes de confirmar</p>
                                </div>

                                <div class="confirmation-summary">
                                    <div class="summary-item">
                                        <div class="summary-icon">
                                            <i class="fas fa-spa"></i>
                                        </div>
                                        <div class="summary-content">
                                            <label>Tratamiento</label>
                                            <span id="summaryService">-</span>
                                        </div>
                                    </div>

                                    <div class="summary-item">
                                        <div class="summary-icon">
                                            <i class="fas fa-user"></i>
                                        </div>
                                        <div class="summary-content">
                                            <label>Cliente</label>
                                            <span id="summaryName">-</span>
                                        </div>
                                    </div>

                                    <div class="summary-item">
                                        <div class="summary-icon">
                                            <i class="fas fa-calendar"></i>
                                        </div>
                                        <div class="summary-content">
                                            <label>Fecha y hora</label>
                                            <span id="summaryDateTime">-</span>
                                        </div>
                                    </div>

                                    <div class="summary-item">
                                        <div class="summary-icon">
                                            <i class="fas fa-phone"></i>
                                        </div>
                                        <div class="summary-content">
                                            <label>Contacto</label>
                                            <span id="summaryPhone">-</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="terms-section">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="acceptTerms" required>
                                        <label class="form-check-label" for="acceptTerms">
                                            Acepto los <a href="#" class="terms-link">términos y condiciones</a> y la <a href="#" class="terms-link">política de privacidad</a>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Form Navigation -->
                            <div class="form-navigation">
                                <button type="button" class="btn btn-secondary" id="prevBtn" style="display: none;">
                                    <i class="fas fa-arrow-left me-2"></i>Anterior
                                </button>
                                
                                <button type="button" class="btn btn-primary" id="nextBtn">
                                    Siguiente<i class="fas fa-arrow-right ms-2"></i>
                                </button>
                                
                                <button type="submit" class="btn btn-success" id="submitBtn" style="display: none;">
                                    <i class="fas fa-calendar-check me-2"></i>Confirmar cita
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Additional Info -->
                    <div class="additional-info">
                        <div class="info-card">
                            <div class="info-icon">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="info-content">
                                <h5>Información importante</h5>
                                <ul>
                                    <li>Llega 10 minutos antes de tu cita</li>
                                    <li>Trae un documento de identidad</li>
                                    <li>Puedes cancelar hasta 24hs antes</li>
                                    <li>Consulta nuestras promociones vigentes</li>
                                </ul>
                            </div>
                        </div>

                        <div class="contact-card">
                            <div class="contact-icon">
                                <i class="fas fa-headset"></i>
                            </div>
                            <div class="contact-content">
                                <h5>¿Necesitas ayuda?</h5>
                                <p>Nuestro equipo está disponible para asistirte</p>
                                <div class="contact-methods">
                                    <a href="tel:+541123456789" class="contact-method">
                                        <i class="fas fa-phone"></i>
                                        <span>+54 11 2345-6789</span>
                                    </a>
                                    <a href="mailto:info@skinlabs.com" class="contact-method">
                                        <i class="fas fa-envelope"></i>
                                        <span>info@skinlabs.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 text-center">
                    <div class="w-100">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h4 class="modal-title">¡Cita confirmada!</h4>
                    </div>
                </div>
                <div class="modal-body text-center">
                    <p class="mb-4">Tu cita ha sido agendada exitosamente. Te esperamos en SkinLabs para brindarte la mejor experiencia de bienestar.</p>
                    <div class="modal-actions">
                        <a href="servicios.php" class="btn btn-primary">
                            <i class="fas fa-home me-2"></i>Volver al inicio
                        </a>
                        <button type="button" class="btn btn-outline-primary" onclick="window.print()">
                            <i class="fas fa-print me-2"></i>Imprimir comprobante
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/agendar.js?v=skinlabs4"></script>
</body>
</html>