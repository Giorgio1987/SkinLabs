<?php
// Funciones reutilizables para el sistema

function getColorByProfesional($profesional) {
    $colors = [
        'Ana' => '#FF9F89',
        'Carlos' => '#A5DFF9',
        'María' => '#B0E3AB',
        'Pedro' => '#F9E79F'
    ];
    return $colors[$profesional] ?? '#D2B4DE';
}

function obtenerEventosCalendario($conexion, $filtros = []) {
    $start = $filtros['start'] ?? date('Y-m-01');
    $end = $filtros['end'] ?? date('Y-m-t');
    
    $sql = "SELECT * FROM citas WHERE fecha BETWEEN ? AND ?";
    $params = [$start, $end];
    $types = "ss";
    
    if (!empty($filtros['profesional'])) {
        $sql .= " AND profesional = ?";
        $params[] = $filtros['profesional'];
        $types .= "s";
    }
    
    if (!empty($filtros['cliente'])) {
        $sql .= " AND (nombre LIKE ? OR dni LIKE ?)";
        $params[] = "%{$filtros['cliente']}%";
        $params[] = "%{$filtros['cliente']}%";
        $types .= "ss";
    }
    
    if (!empty($filtros['servicio'])) {
        $sql .= " AND servicio = ?";
        $params[] = $filtros['servicio'];
        $types .= "s";
    }
    
    if (!empty($filtros['fecha'])) {
        $sql = "SELECT * FROM citas WHERE fecha = ?";
        $params = [$filtros['fecha']];
        $types = "s";
    }
    
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    return $stmt->get_result();
}

function guardarNuevoTurno($conexion, $datos) {
    $stmt = $conexion->prepare("INSERT INTO citas (nombre, dni, telefono, profesional, servicio, fecha, hora, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", 
        $datos['nombre'],
        $datos['dni'],
        $datos['telefono'],
        $datos['profesional'],
        $datos['servicio'],
        $datos['fecha'],
        $datos['hora'],
        $datos['email']
    );
    return $stmt->execute();
}