<?php
session_start();
require_once "../../php/conexion.php";

header('Content-Type: application/json');

$sql = "SELECT * FROM profesionales ORDER BY nombre";
$result = $conexion->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
