<?php
session_start();

// Si el usuario ya inició sesión, redirigirlo
if (isset($_SESSION['empleado'])) {
    session_unset();
    session_destroy();
    header("Location: empleados/index_empleados.php");
    exit;
}

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include("php/conexion.php");

    $usuario = trim($_POST['usuario']);
    $clave = trim($_POST['clave']);

    $stmt = mysqli_prepare($conexion, "SELECT * FROM empleados WHERE usuario = ? AND clave = SHA2(?, 256)");
    mysqli_stmt_bind_param($stmt, "ss", $usuario, $clave);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($resultado) === 1) {
        $_SESSION['empleado'] = $usuario;
        header("Location: empleados/index_empleados.php");
        exit;
    } else {
        $error = "Usuario o contraseña incorrectos.";
    }

    mysqli_stmt_close($stmt);
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
    <link rel="stylesheet" href="assets/css/login.css?v=skinlabs2">
    <link rel="icon" type="image/png" href="assets/img/favicon_v2.png">
    <meta http-equiv="Cache-Control" content="no-store" />
</head>
<body>
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
                    <!-- Hidden inputs to prevent autofill -->
                    <input type="text" style="display: none">
                    <input type="password" style="display: none">

                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuario</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" required autocomplete="off" placeholder="Ingresa tu usuario">
                    </div>
                    
                    <div class="mb-3">
                        <label for="clave" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="clave" name="clave" required autocomplete="new-password" placeholder="Ingresa tu contraseña">
                    </div>
                    
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-sign-in-alt me-2"></i>Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/login.js?v=skinlabs2"></script>
    
    <script>
        // Additional security: Clear form on back/forward navigation
        window.onload = () => {
            if (performance.navigation.type === 2 || 
                (performance.getEntriesByType("navigation")[0] && 
                 performance.getEntriesByType("navigation")[0].type === "back_forward")) {
                document.getElementById("usuario").value = "";
                document.getElementById("clave").value = "";
            }
        };
    </script>
</body>
</html>