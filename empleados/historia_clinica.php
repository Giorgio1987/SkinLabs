<!-- Buscar historial clínico de un paciente -->
<?php
// Iniciar la sesión
session_start();

// Evitar caché para proteger los datos al volver atrás
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Verificar si el usuario está logueado
if (!isset($_SESSION['empleado'])) {
    header("Location: login.php");
    exit;
}

include("../php/conexion.php");

$historial = null;
$mensaje_error = '';

if (isset($_GET['dni']) && !empty($_GET['dni'])) {
    $dni = $_GET['dni'];

    // Obtener el ID del paciente por su DNI
    $sql = "SELECT id FROM pacientes WHERE dni = '$dni'";
    $result = $conexion->query($sql);

    if ($result && $result->num_rows > 0) {
        $paciente = $result->fetch_assoc();
        $id_paciente = $paciente['id'];

        // Obtener historial clínico desde la tabla tratamientos
        $sql_historial = "SELECT t.fecha, t.descripcion, t.observaciones, p.nombre AS profesional, t.historial_fecha
                          FROM tratamientos t
                          JOIN profesionales p ON t.id_profesional = p.id
                          WHERE t.id_paciente = '$id_paciente'
                          ORDER BY t.fecha DESC";

        $historial = $conexion->query($sql_historial);
    } else {
        $mensaje_error = "⚠️ Paciente con DNI <strong>$dni</strong> no encontrado.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historial Clínico</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/historia_clinica.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
</head>
<body class="bg-light">
    <?php include "../Includes/navbar.php"; ?>
    <div class="container py-5">
        <h2 class="mb-4">Historial Clínico del Paciente</h2>

        <!-- Formulario de búsqueda -->
        <form method="GET" action="historia_clinica.php">
            <div class="mb-3">
                <label for="dni" class="form-label">DNI del paciente</label>
                <input type="text" class="form-control" name="dni" id="dni" placeholder="Ej: 12345678" required>
            </div>
            <button type="submit" class="btn btn-primary">🔍 Ver Historial</button>
            <a href="index_empleados.php" class="btn btn-secondary">Volver al Menú</a>
        </form>

        <!-- Mostrar error si corresponde -->
        <?php if (!empty($mensaje_error)): ?>
            <div class="alert alert-warning mt-4">
                <?php echo $mensaje_error; ?>
            </div>
        <?php endif; ?>

        <!-- Mostrar historial si hay resultados -->
        <?php if ($historial && $historial->num_rows > 0): ?>
            <h4 class="mt-5">🩺 Tratamientos anteriores</h4>
            <?php while ($row = $historial->fetch_assoc()): ?>
                <div class="border rounded p-3 mb-3 bg-white shadow-sm">
                    <strong>📅 Fecha:</strong> <?php echo $row['fecha']; ?><br>
                    <strong>👨‍⚕️ Profesional:</strong> <?php echo $row['profesional']; ?><br>
                    <strong>📝 Descripción:</strong> <?php echo $row['descripcion']; ?><br>
                    <strong>🗒️ Observaciones:</strong> <?php echo $row['observaciones']; ?><br>
                    <strong>🗓️ Fecha de Historial:</strong> <?php echo $row['historial_fecha']; ?>
                </div>
            <?php endwhile; ?>
        <?php elseif (isset($_GET['dni']) && empty($mensaje_error)): ?>
            <div class="alert alert-info mt-4">No hay tratamientos registrados para este paciente.</div>
        <?php endif; ?>
    </div>
</body>
</html>
