<?php
// Iniciar la sesión
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

            <h5 class="mb-3">Turnos para el día: <?php echo date('d/m/Y', strtotime($fechaSeleccionada)); ?></h5>

            <table class="table table-bordered table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Profesional</th>
                        <th>Consultorio</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Servicio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $query = "
                        SELECT c.id, p.nombre AS profesional, cons.nombre AS consultorio, c.hora, c.nombre AS cliente, c.servicio
                        FROM citas c
                        JOIN profesionales p ON c.profesional_id = p.id
                        JOIN consultorios cons ON c.consultorio_id = cons.id
                        WHERE c.fecha = ?
                        ORDER BY c.hora";
                    
                    if ($stmt = $conexion->prepare($query)) {
                        $stmt->bind_param("s", $fechaSeleccionada);
                        $stmt->execute();
                        $result = $stmt->get_result();

                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                echo "<tr>
                                        <td>{$row['profesional']}</td>
                                        <td>{$row['consultorio']}</td>
                                        <td>{$row['hora']}</td>
                                        <td>{$row['cliente']}</td>
                                        <td>{$row['servicio']}</td>
                                        <td>
                                            <a href='eliminando_desde_agenda.php?id={$row['id']}&fecha={$fechaSeleccionada}' 
                                               class='btn btn-danger btn-sm'
                                               onclick=\"return confirm('¿Estás seguro de que deseas eliminar este turno?');\">
                                               Eliminar
                                            </a>
                                        </td>
                                      </tr>";
                            }
                        } else {
                            echo "<tr><td colspan='6' class='text-center'>No hay turnos agendados para este día</td></tr>";
                        }
                        $stmt->close();
                    } else {
                        echo "Error al preparar la consulta: " . $conexion->error;
                    }

                    $conexion->close();
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>
