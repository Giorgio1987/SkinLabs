<?php
// Iniciar la sesión
session_start();

// Verificar si el usuario está logueado
if (!isset($_SESSION['empleado'])) {
    header("Location: login.php");
    exit;
}

// Incluir el archivo de conexión
include("../php/conexion.php");

// Verificar conexión
if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Verificar que se haya enviado el ID
if (isset($_GET['id'])) {
    $turnoId = $_GET['id'];

    // Si viene la fecha por GET, la usamos para redireccionar luego
    $fecha = isset($_GET['fecha']) ? $_GET['fecha'] : date('Y-m-d');

    // Preparar la consulta
    $query = "DELETE FROM citas WHERE id = ?";

    if ($stmt = $conexion->prepare($query)) {
        $stmt->bind_param("i", $turnoId);

        if ($stmt->execute()) {
            // Redirigir con la fecha seleccionada
            header("Location: ver_agenda.php?fecha=" . urlencode($fecha));
            exit;
        } else {
            echo "❌ Error al eliminar el turno: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "❌ Error al preparar la consulta: " . $conexion->error;
    }
} else {
    echo "❌ ID de turno no proporcionado.";
}

$conexion->close();
?>
