<?php
session_start();

// Verificar si el usuario está logueado
if (!isset($_SESSION['empleado'])) {
    header("Location: login.php");
    exit;
}

include("../php/conexion.php");

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

$fechaSeleccionada = isset($_GET['fecha']) ? $_GET['fecha'] : date('Y-m-d');

if (!strtotime($fechaSeleccionada)) {
    die("Fecha no válida");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agenda de Turnos - SkinLabs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-dark text-white">
            <h3 class="mb-0">📅 Agenda de Turnos</h3>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <a href="index_empleados.php" class="btn btn-secondary">Volver al Menú</a>
            </div>

            <form action="ver_agenda.php" method="get" class="mb-3">
                <div class="input-group">
                    <input type="date" name="fecha" value="<?php echo $fechaSeleccionada; ?>" class="form-control" required>
                    <button type="submit" class="btn btn-primary">Buscar</button>
                </div>
            </form>

            <h5 class="mb-4">Turnos para el día: <?php echo date('d/m/Y', strtotime($fechaSeleccionada)); ?></h5>

            <?php
            // Obtener consultorios disponibles
            $consultorios = [];
            $result = $conexion->query("SELECT id, nombre FROM consultorios ORDER BY id");
            while ($row = $result->fetch_assoc()) {
                $consultorios[$row['id']] = $row['nombre'];
            }

            // Inicializar estructura de turnos
            $turnos = [];

            $query = "
                SELECT c.id, c.hora, c.nombre AS cliente, c.servicio, 
                       c.consultorio_id, p.nombre AS profesional
                FROM citas c
                JOIN profesionales p ON c.profesional_id = p.id
                WHERE c.fecha = ? 
            ";

            if ($stmt = $conexion->prepare($query)) {
                $stmt->bind_param("s", $fechaSeleccionada);
                $stmt->execute();
                $result = $stmt->get_result();

                while ($row = $result->fetch_assoc()) {
                    $hora_normalizada = date('H:i', strtotime($row['hora']));
                    $turnos[$hora_normalizada][$row['consultorio_id']] = $row;
                }

                $stmt->close();
            } else {
                echo "<div class='alert alert-danger'>Error al preparar la consulta: " . $conexion->error . "</div>";
            }

            $conexion->close();

            // Generar grilla de horarios
            $horaInicio = strtotime("09:00");
            $horaFin = strtotime("18:00");

            echo "<table class='table table-bordered'>";
            echo "<thead class='table-light'><tr><th>Hora</th>";

            // Mostrar consultorios en el encabezado
            foreach ($consultorios as $nombre) {
                echo "<th>{$nombre}</th>";
            }

            echo "</tr></thead><tbody>";

            // Generar filas para cada hora de 30 minutos
            for ($hora = $horaInicio; $hora <= $horaFin; $hora += 1800) { // Incrementar cada 30 minutos
                $horaStr = date('H:i', $hora);
                echo "<tr><td><strong>{$horaStr}</strong></td>";

                foreach ($consultorios as $id => $nombre) {
                    if (isset($turnos[$horaStr][$id])) {
                        $t = $turnos[$horaStr][$id];
                        echo "<td>
                                <strong>{$t['profesional']}</strong><br>
                                Cliente: {$t['cliente']}<br>
                                Servicio: {$t['servicio']}<br>
                                <a href='eliminando_desde_agenda.php?id={$t['id']}&fecha={$fechaSeleccionada}' 
                                   class='btn btn-sm btn-danger mt-1'
                                   onclick=\"return confirm('¿Estás seguro de que deseas eliminar este turno?');\">
                                   Eliminar
                                </a>
                              </td>";
                    } else {
                        echo "<td class='text-muted'>Libre</td>";
                    }
                }

                echo "</tr>";
            }

            echo "</tbody></table>";
            ?>
        </div>
    </div>
</div>
</body>
</html>

