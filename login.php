<?php
session_start();
require_once "php/conexion.php"; // ajustá si está en otra ruta

// Si el usuario ya inició sesión, redirigirlo
if (isset($_SESSION['empleado'])) {
    header("Location: empleados/index_empleados.php");
    exit;
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $clave = trim($_POST['clave']);

    if (!empty($usuario) && !empty($clave)) {
        $stmt = $conexion->prepare("SELECT * FROM empleados WHERE usuario = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado && $resultado->num_rows === 1) {
            $empleado = $resultado->fetch_assoc();
            if (password_verify($clave, $empleado['clave'])) {
                $_SESSION['empleado'] = $empleado['usuario'];
                header("Location: empleados/index_empleados.php");
                exit;
            }
        }
    }

    $error = "Usuario o contraseña incorrectos.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Empleado - SkinLabs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/login.css">
    <link rel="icon" type="image/png" href="assets/img/favicon_v2.png">
</head>
<body>
    <!-- Logo superior izquierdo -->
    <div class="top-logo">
        <a href="index.php" class="logo-link">
            <img src="assets/img/logo.png" alt="SkinLabs logo" class="logo-img">
        </a>
    </div>

    <div class="login-container">
        <div class="card shadow">
            <div class="card-header text-center">
                <i class="fas fa-user-shield login-icon"></i>
                <h4 class="mb-0">Ingreso del Personal</h4>
            </div>
            <div class="card-body">
                <?php if (!empty($error)): ?>
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <?php echo htmlspecialchars($error); ?>
                    </div>
                <?php endif; ?>
                
                <form method="POST" autocomplete="off" id="loginForm">
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuario</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-user input-icon"></i></span>
                            <input type="text" class="form-control" id="usuario" name="usuario" required autocomplete="off" placeholder="Ingresa tu usuario">
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="clave" class="form-label">Contraseña</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-lock input-icon"></i></span>
                            <input type="password" class="form-control" id="clave" name="clave" required autocomplete="new-password" placeholder="Ingresa tu contraseña">
                            <button type="button" class="password-toggle" id="togglePassword">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Checkbox Recordar sesión -->
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="remember" name="remember">
                        <label class="form-check-label" for="remember">
                            Recordar sesión
                        </label>
                    </div>
                    
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-sign-in-alt me-2"></i>Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Botón volver al inicio -->
        <div class="back-to-home">
            <a href="index.php" class="back-link">
                <i class="fas fa-arrow-left me-2"></i>
                Volver al sitio principal
            </a>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/login.js"></script>
</body>
</html>