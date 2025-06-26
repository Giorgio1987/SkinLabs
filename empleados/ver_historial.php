<?php
include("../php/conexion.php");

// Iniciar la sesión
session_start();

// Verificar si el usuario está logueado
if (!isset($_SESSION['empleado'])) {
    // Redirigir al login si no está logueado
    header("Location: login.php");
    exit;
}

$sql = "SELECT 
            pacientes.nombre AS nombre_paciente,
            pacientes.dni,
            tratamientos.descripcion AS tratamiento,
            tratamientos.fecha,
            profesionales.nombre AS nombre_profesional,
            tratamientos.observaciones,
            tratamientos.historial_fecha
        FROM tratamientos
        INNER JOIN pacientes ON tratamientos.id_paciente = pacientes.id
        INNER JOIN profesionales ON tratamientos.id_profesional = profesionales.id
        ORDER BY tratamientos.fecha DESC";

$resultado = $conexion->query($sql);

// Verificar si la consulta devolvió resultados
if (!$resultado) {
    echo "<p>Error en la consulta: " . $conexion->error . "</p>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historial Completo de Pacientes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/ver_historial.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
</head>
<body class="container mt-4">
    <?php include "../Includes/navbar.php"; ?>
    <h2 class="mb-4">📋 Historial Completo de Pacientes</h2>
    <a href="index_empleados.php" class="btn btn-secondary mb-3">← Volver al Menú</a>
    <table class="table table-bordered">
        <thead class="table-dark">
            <tr>
                <th>Paciente</th>
                <th>DNI</th>
                <th>Tratamiento</th>
                <th>Fecha</th>
                <th>Profesional</th>
                <th>Observaciones</th>
                <th>Fecha de Historial</th>
            </tr>
        </thead>
        <tbody>
            <?php if ($resultado->num_rows > 0): ?>
                <?php while($fila = $resultado->fetch_assoc()): ?>
                    <tr>
                        <td><?= htmlspecialchars($fila["nombre_paciente"]) ?></td>
                        <td><?= htmlspecialchars($fila["dni"]) ?></td>
                        <td><?= htmlspecialchars($fila["tratamiento"]) ?></td>
                        <td><?= htmlspecialchars($fila["fecha"]) ?></td>
                        <td><?= htmlspecialchars($fila["nombre_profesional"]) ?></td>
                        <td><?= htmlspecialchars($fila["observaciones"]) ?></td>
                        <td><?= htmlspecialchars($fila["historial_fecha"]) ?></td>
                    </tr>
                <?php endwhile; ?>
            <?php else: ?>
                <tr>
                    <td colspan="7" class="text-center">No se encontraron registros en el historial</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
    <script src="../assets/js/ver_historial.js"></script>
</body>
</html>
