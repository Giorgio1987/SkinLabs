<?php
require_once "../../php/conexion.php";
header('Content-Type: application/json');

$id = $_POST['id'];

$stmt = $conexion->prepare("DELETE FROM servicios WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}
