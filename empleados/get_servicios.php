<?php
session_start();
require_once "../php/conexion.php";

header('Content-Type: application/json');

try {
    $sql = "SELECT id_servicio as id, nombre FROM servicios";
    $result = $conexion->query($sql);
    
    if (!$result) {
        throw new Exception('Error en consulta: ' . $conexion->error);
    }

    $servicios = [];
    while ($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $servicios]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} finally {
    $conexion->close();
}
?>
