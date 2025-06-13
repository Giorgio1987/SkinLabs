<?php
session_start();
require_once "../php/conexion.php";

header('Content-Type: application/json');

if (empty($_GET['getTurnos']) || $_GET['getTurnos'] != '1') {
    echo json_encode(['error' => 'Parámetro getTurnos faltante o inválido']);
    exit;
}

try {
    $colores = [];
    $sql = "SELECT nombre, color FROM profesionales";
    $result = $conexion->query($sql);
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $colores[$row['nombre']] = $row['color'];
        }
    }

    $query = "SELECT c.id, TIME_FORMAT(c.hora, '%H:%i:%s') as hora, c.fecha, 
                     c.nombre AS cliente, c.servicio, 
                     p.nombre AS profesional, cs.nombre AS consultorio
              FROM citas c
              JOIN profesionales p ON c.profesional_id = p.id
              JOIN consultorios cs ON c.consultorio_id = cs.id";

    $result = $conexion->query($query);
    if (!$result) {
        throw new Exception('Error en consulta: ' . $conexion->error);
    }

    $turnos = [];
    while ($row = $result->fetch_assoc()) {
        $turnos[] = [
            'id' => $row['id'],
            'title' => $row['profesional'] . " - " . $row['servicio'],
            'start' => $row['fecha'] . "T" . $row['hora'],
            'color' => $colores[$row['profesional']] ?? '#1976D2',
            'extendedProps' => [
                'cliente' => $row['cliente'],
                'consultorio' => $row['consultorio'],
                'servicio' => $row['servicio'],
                'profesional' => $row['profesional']
            ]
        ];
    }

    echo json_encode($turnos);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    $conexion->close();
}
?>