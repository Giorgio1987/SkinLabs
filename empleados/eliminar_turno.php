<?php
session_start();
include("../php/conexion.php");

// Protección por sesión
if (!isset($_SESSION['empleado'])) {
    header("Location: ../login.php");
    exit;
}

$mensaje = "";
$turnos = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['buscar_fecha'])) {
        $fecha = $_POST['fecha'];
        $consulta = mysqli_query($conexion, "SELECT * FROM citas WHERE fecha = '$fecha'");
        $turnos = mysqli_fetch_all($consulta, MYSQLI_ASSOC);

        if (count($turnos) === 0) {
            $mensaje = "<div class='alert alert-warning'>No hay turnos para la fecha seleccionada.</div>";
        }
    }

    // Eliminar turno específico
    if (isset($_POST['eliminar_id'])) {
        $id_turno = $_POST['eliminar_id'];
        $eliminar = mysqli_query($conexion, "DELETE FROM citas WHERE id = $id_turno");
        if ($eliminar) {
            $mensaje = "<div class='alert alert-success'>Turno eliminado con éxito.</div>";
        } else {
            $mensaje = "<div class='alert alert-danger'>Error al eliminar el turno.</div>";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Cancelar Turno Individual - Panel Empleados</title>
    <link rel="stylesheet" href="../assets/css/eliminar_turno.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<?php include "../Includes/navbar.php"; ?>
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-danger text-white">
            <h3>Cancelar Turno Individual</h3>
        </div>
        <div class="card-body">
            <?php if (!empty($mensaje)) echo $mensaje; ?>
            <form method="POST">
                <div class="mb-3">
                    <label class="form-label">Fecha</label>
                    <input type="date" name="fecha" class="form-control" required>
                </div>
                <button type="submit" name="buscar_fecha" class="btn btn-primary">Buscar Turnos</button>
                <a href="index_empleados.php" class="btn btn-secondary">Volver</a>
            </form>

            <?php if (count($turnos) > 0): ?>
                <hr>
                <h5>Turnos para el día <?= htmlspecialchars($fecha) ?>:</h5>
                <table class="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>DNI</th>
                            <th>Teléfono</th>
                            <th>Servicio</th>
                            <th>Hora</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($turnos as $turno): ?>
                            <tr>
                                <td><?= htmlspecialchars($turno['nombre']) ?></td>
                                <td><?= htmlspecialchars($turno['dni']) ?></td>
                                <td><?= htmlspecialchars($turno['telefono']) ?></td>
                                <td><?= htmlspecialchars($turno['servicio']) ?></td>
                                <td><?= htmlspecialchars($turno['hora']) ?></td>
                                <td>
                                    <form method="POST" style="display:inline;">
                                        <input type="hidden" name="eliminar_id" value="<?= $turno['id'] ?>">
                                        <input type="hidden" name="fecha" value="<?= $fecha ?>">
                                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('¿Estás seguro de eliminar este turno?')">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
</div>
<script src="../assets/js/eliminar_turno.js"></script>
</body>
</html>
