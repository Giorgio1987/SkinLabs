<?php
require_once "../../php/conexion.php";
header('Content-Type: application/json');

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$activo = $_POST['activo'];

$stmt = $conexion->prepare("UPDATE servicios SET nombre = ?, descripcion = ?, activo = ? WHERE id = ?");
$stmt->bind_param("ssii", $nombre, $descripcion, $activo, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}
