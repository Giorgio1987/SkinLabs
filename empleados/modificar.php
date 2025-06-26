<?php
session_start();

// Evitar caché del navegador
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Verificar si el usuario está logueado
if (!isset($_SESSION['empleado'])) {
    header("Location: login.php");
    exit;
}

include("../php/conexion.php");

// Obtener el DNI del paciente desde la URL (cuando se hace clic en el botón de modificar)
if (isset($_GET['dni'])) {
    $dni = $_GET['dni'];
    
    // Obtener los datos del paciente de la base de datos
    $sql = "SELECT * FROM pacientes WHERE dni = '$dni'";
    $result = $conexion->query($sql);
    
    if ($result->num_rows > 0) {
        $patient = $result->fetch_assoc();
    } else {
        echo "Paciente no encontrado.";
        exit;
    }
} else {
    echo "No se ha proporcionado un DNI.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Modificar Paciente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/modificar.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
</head>
<body class="bg-light">
    <?php include "../Includes/navbar.php"; ?>
    <div class="container py-5">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h2 class="mb-0">Modificar Paciente</h2>
            </div>
            <div class="card-body">
                <form method="POST" action="modificar_paciente.php">
                    <div class="mb-3">
                        <label for="dni" class="form-label">DNI</label>
                        <input type="text" class="form-control" name="dni" id="dni" value="<?php echo $patient['dni']; ?>" readonly required>
                    </div>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" name="nombre" id="nombre" value="<?php echo $patient['nombre']; ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" name="telefono" id="telefono" value="<?php echo $patient['telefono']; ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control" name="direccion" id="direccion" value="<?php echo $patient['direccion']; ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="fecha_nacimiento" class="form-label">Fecha de Nacimiento</label>
                        <input type="date" class="form-control" name="fecha_nacimiento" id="fecha_nacimiento" value="<?php echo $patient['fecha_nacimiento']; ?>" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                </form>
                <div class="text-center mt-4">
                    <a href="buscar.php" class="btn btn-secondary">Volver a búsqueda</a>
                    <a href="index_empleados.php" class="btn btn-secondary">Volver al menú</a>
                </div>
            </div>
        </div>
    </div>
    <script src="../assets/js/modificar.js"></script>
</body>
</html>
