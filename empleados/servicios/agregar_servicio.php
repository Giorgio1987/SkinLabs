<?php
require_once "../../php/conexion.php";

$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$activo = $_POST['activo'];

$stmt = $conexion->prepare("INSERT INTO servicios (nombre, descripcion, activo) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $nombre, $descripcion, $activo);

if ($stmt->execute()) {
    header("Location: gestionar_servicios.php?msg=ok");
} else {
    echo "Error: " . $stmt->error;
}
