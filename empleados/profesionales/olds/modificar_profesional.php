<?php
session_start();
require_once "../../php/conexion.php";
header('Content-Type: application/json');

try {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $especialidad = $_POST['especialidad'];
    $color = $_POST['color'];

    $stmt = $conexion->prepare("UPDATE profesionales SET nombre = ?, especialidad = ?, color = ? WHERE id = ?");
    $stmt->bind_param("sssi", $nombre, $especialidad, $color, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        throw new Exception('Error al actualizar');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
