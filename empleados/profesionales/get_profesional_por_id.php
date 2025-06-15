<?php
require_once "../php/conexion.php";
header('Content-Type: application/json');

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $sql = "SELECT * FROM profesionales WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($fila = $resultado->fetch_assoc()) {
        echo json_encode(['success' => true, 'data' => $fila]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Profesional no encontrado']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Falta el parámetro ID']);
}

$conexion->close();
?>
