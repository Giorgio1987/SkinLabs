<?php
require_once "../../php/conexion.php";
header('Content-Type: application/json');

$result = $conexion->query("SELECT * FROM servicios ORDER BY nombre");
$datos = [];

while ($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

echo json_encode($datos);
