<?php 
session_start();

if (!isset($_SESSION['empleado'])) {
    header("Location: login.php");
    exit;
}

include("../php/conexion.php");

// Si el paciente se guardó correctamente, redirige a la página de empleados
if (isset($_GET['msg'])) {
    echo '<div class="alert alert-info mt-3">' . htmlspecialchars($_GET['msg']) . '</div>';
    // Redirige automáticamente después de 5 segundos
    header("refresh:5;url=index_empleados.php"); 
    exit; // Asegura que el script se detenga después de la redirección
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Nuevo Paciente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/nuevo.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
    <link rel="stylesheet" href="../assets/css/navbar.css">
</head>
<body class="bg-light">
     <?php include "../Includes/navbar.php"; ?>
    <div class="container py-5">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h2 class="mb-0">Agregar Nuevo Paciente</h2>
            </div>
            <div class="card-body">
                <!-- Formulario -->
                <form method="POST" action="../php/guardar.php">
                    <div class="mb-3">
                        <label for="dni" class="form-label">DNI</label>
                        <input type="text" class="form-control" name="dni" id="dni" placeholder="Ej: 12345678" required>
                    </div>

                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre completo</label>
                        <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre y Apellido" required>
                    </div>

                    <div class="mb-3">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" name="telefono" id="telefono" placeholder="Ej: 1123456789" inputmode="numeric" pattern="[0-9]*">
                    </div>

                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control" name="direccion" id="direccion" placeholder="Calle y número" required>
                    </div>

                    <div class="mb-3">
                        <label for="fecha_nacimiento" class="form-label">Fecha de Nacimiento</label>
                        <input type="date" class="form-control" name="fecha_nacimiento" id="fecha_nacimiento" required>
                    </div>

                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-success">Guardar Paciente</button>
                        <a href="index_empleados.php" class="btn btn-secondary">Volver al Menú</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="../assets/js/nuevo.js"></script>
</body>
</html>
