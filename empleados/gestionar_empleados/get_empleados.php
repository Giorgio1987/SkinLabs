<?php
session_start();
require_once "../../php/conexion.php";

header('Content-Type: application/json');

$sql = "SELECT id, usuario FROM empleados ORDER BY usuario";
$result = $conexion->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
