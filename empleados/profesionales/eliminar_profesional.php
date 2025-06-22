<?php
session_start();
require_once "../../php/conexion.php";

header('Content-Type: application/json');

if (!isset($_SESSION['empleado'])) {
    echo json_encode(['success' => false, 'error' => 'Sesión no válida']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = intval($_POST['id']);

    $sql = "DELETE FROM profesionales WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('i', $id);

    try {
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            // En caso de error, verificamos si es por clave foránea
            if ($stmt->errno === 1451) {
                echo json_encode([
                    'success' => false,
                    'error' => 'No se puede eliminar este profesional porque tiene turnos asignados. Por favor, elimine o cancele los turnos antes de continuar.'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'error' => 'Error al eliminar: ' . $stmt->error
                ]);
            }
        }
    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() === 1451) {
            echo json_encode([
                'success' => false,
                'error' => 'No se puede eliminar este profesional porque tiene turnos asignados. Por favor, elimine o cancele los turnos antes de continuar.'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Error inesperado: ' . $e->getMessage()
            ]);
        }
    }

    $stmt->close();
    $conexion->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
}
