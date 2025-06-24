<?php
// Iniciar la sesión
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
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Buscar Paciente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/buscar.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
</head>
<body class="bg-light">
    <div class="container py-5">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h2 class="mb-0">Buscar Paciente</h2>
            </div>
            <div class="card-body">
                <form method="POST" action="buscar.php">
                    <div class="mb-3">
                        <label for="dni" class="form-label">DNI</label>
                        <input type="text" class="form-control" name="dni" id="dni" placeholder="DNI del paciente" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Buscar</button>
                </form>

                <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    $dni = $conexion->real_escape_string($_POST['dni']);
                    $sql = "SELECT * FROM pacientes WHERE dni = '$dni'";
                    $result = $conexion->query($sql);

                    if ($result->num_rows > 0) {
                        $patient = $result->fetch_assoc();
                        echo "<h3>Datos del Paciente</h3>";
                        echo "<p><strong>DNI:</strong> " . $patient['dni'] . "</p>";
                        echo "<p><strong>Nombre:</strong> " . $patient['nombre'] . "</p>";
                        echo "<p><strong>Teléfono:</strong> " . $patient['telefono'] . "</p>";
                        echo "<p><strong>Dirección:</strong> " . $patient['direccion'] . "</p>";
                        echo "<p><strong>Fecha de Nacimiento:</strong> " . $patient['fecha_nacimiento'] . "</p>";
                        echo "<a href='modificar.php?dni=" . $patient['dni'] . "' class='btn btn-warning'>Modificar</a>";
                    } else {
                        echo "<p>No se encontró el paciente.</p>";
                    }
                }
                ?>
                <div class="text-center mt-4">
                    <a href="index_empleados.php" class="btn btn-secondary"> Volver al menú </a>
                </div>

            </div>
        </div>
    </div>

    <script src="../assets/js/buscar.js"></script>
</body>
</html>