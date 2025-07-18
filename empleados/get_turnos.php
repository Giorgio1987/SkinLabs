<?php
session_start();
require_once "../php/conexion.php";

header('Content-Type: application/json');

if (empty($_GET['getTurnos']) || $_GET['getTurnos'] != '1') {
    echo json_encode(['error' => 'Parámetro getTurnos faltante o inválido']);
    exit;
}

try {
    // Consulta principal
    $query = "SELECT 
                c.id AS turno_id, 
                TIME_FORMAT(c.hora, '%H:%i:%s') AS hora, 
                c.fecha, 
                c.nombre AS cliente, 
                c.servicio, 
                p.nombre AS profesional, 
                p.id AS profesional_id, 
                p.color,
                cs.nombre AS consultorio
              FROM citas c
              JOIN profesionales p ON c.profesional_id = p.id
              JOIN consultorios cs ON c.consultorio_id = cs.id
              WHERE 1=1";

    // Filtros opcionales
    if (!empty($_GET['profesional'])) {
        $profesionalId = $conexion->real_escape_string($_GET['profesional']);
        $query .= " AND p.id = '$profesionalId'";
    }

    if (!empty($_GET['servicio'])) {
        $servicio = $conexion->real_escape_string($_GET['servicio']);
        $query .= " AND c.servicio = '$servicio'";
    }

    if (!empty($_GET['fecha'])) {
        $fecha = $conexion->real_escape_string($_GET['fecha']);
        $query .= " AND c.fecha = '$fecha'";
    }

    if (!empty($_GET['cliente'])) {
        $cliente = $conexion->real_escape_string($_GET['cliente']);
        $query .= " AND (c.nombre LIKE '%$cliente%' OR c.dni LIKE '%$cliente%')";
    }

    $result = $conexion->query($query);

    if (!$result) {
        throw new Exception('Error en consulta: ' . $conexion->error);
    }

    $turnos = [];
    while ($row = $result->fetch_assoc()) {
        $turnos[] = [
            'id' => $row['turno_id'],  // ✅ El ID del turno correcto
            'title' => $row['cliente'] . " - " . $row['servicio'],
            'start' => $row['fecha'] . "T" . $row['hora'],
            'color' => $row['color'] ?? '#1976D2',
            'extendedProps' => [
                'cliente' => $row['cliente'],
                'consultorio' => $row['consultorio'],
                'servicio' => $row['servicio'],
                'profesional' => $row['profesional'],
                'profesional_id' => $row['profesional_id']
            ]
        ];
    }

    echo json_encode($turnos);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    $conexion->close();
}
