<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');
session_start();
include("../php/conexion.php");

if (!isset($_SESSION['empleado'])) {
    header("Location: ../login.php");
    exit;
}

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo "ID de turno no válido.";
    exit;
}

$id = (int) $_GET['id'];
$mensaje = "";

// Obtener turno actual
$res = mysqli_query($conexion, "SELECT * FROM citas WHERE id = $id");
if (mysqli_num_rows($res) === 0) {
    echo "Turno no encontrado.";
    exit;
}
$turno = mysqli_fetch_assoc($res);

// Listas dinámicas
$profesionales_arr = mysqli_fetch_all(mysqli_query($conexion, "SELECT * FROM profesionales"), MYSQLI_ASSOC);
$consultorios_arr  = mysqli_fetch_all(mysqli_query($conexion, "SELECT * FROM consultorios"), MYSQLI_ASSOC);
$servicios_arr     = mysqli_fetch_all(mysqli_query($conexion, "SELECT * FROM servicios WHERE activo = 1"), MYSQLI_ASSOC);

// Procesar edición
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre         = htmlspecialchars(trim($_POST['nombre']));
    $telefono       = htmlspecialchars(trim($_POST['telefono']));
    $dni            = htmlspecialchars(trim($_POST['dni']));
    $fecha          = $_POST['fecha'];
    $hora           = $_POST['hora'];
    $servicio       = htmlspecialchars(trim($_POST['servicio']));
    $profesional_id = $_POST['profesional_id'];
    $consultorio_id = $_POST['consultorio_id'];

    $fecha_actual = date('Y-m-d');
    $hora_actual  = date('H:i');

    if ($fecha < $fecha_actual || ($fecha == $fecha_actual && $hora <= $hora_actual)) {
        $mensaje = "<div class='alert alert-danger'>No se puede agendar en el pasado.</div>";
    } elseif (in_array(date('w', strtotime($fecha)), [0, 6])) {
        $mensaje = "<div class='alert alert-danger'>Solo se permiten turnos de lunes a viernes.</div>";
    } else {
        $hora_ts = strtotime($hora);
        if ($hora_ts < strtotime('09:00') || $hora_ts > strtotime('18:00')) {
            $mensaje = "<div class='alert alert-danger'>El horario debe estar entre 9:00 y 18:00.</div>";
        } else {
            // Validar conflictos con otros turnos
            $conflictos = mysqli_query($conexion, "
                SELECT 1 FROM citas
                WHERE id != $id
                AND fecha = '$fecha' AND hora = '$hora'
                AND (profesional_id = '$profesional_id' OR consultorio_id = '$consultorio_id')
            ");

            if (mysqli_num_rows($conflictos)) {
                $mensaje = "<div class='alert alert-danger'>Ya hay un turno en ese horario con ese profesional o consultorio.</div>";
            } else {
                $sql = "UPDATE citas SET
                        nombre='$nombre',
                        telefono='$telefono',
                        dni='$dni',
                        servicio='$servicio',
                        profesional_id='$profesional_id',
                        consultorio_id='$consultorio_id',
                        fecha='$fecha',
                        hora='$hora'
                        WHERE id = $id";

                if (mysqli_query($conexion, $sql)) {
                    $mensaje = "<div class='alert alert-success'>✅ Turno actualizado correctamente.</div>";
                    $turno = mysqli_fetch_assoc(mysqli_query($conexion, "SELECT * FROM citas WHERE id = $id")); // recargar actualizado
                } else {
                    $mensaje = "<div class='alert alert-danger'>Error: " . mysqli_error($conexion) . "</div>";
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Turno</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<?php include "../Includes/navbar.php"; ?>
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h3>✏️ Editar Turno</h3>
        </div>
        <div class="card-body">
            <?= $mensaje ?>
            <form method="POST">
                <div class="mb-3">
                    <label class="form-label">Servicio</label>
                    <select name="servicio" class="form-select" required>
                        <option value="">-- Seleccioná un tratamiento --</option>
                        <?php foreach ($servicios_arr as $s): ?>
                            <option value="<?= htmlspecialchars($s['nombre']) ?>"
                                <?= $turno['servicio'] === $s['nombre'] ? 'selected' : '' ?>>
                                <?= htmlspecialchars($s['nombre']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Profesional</label>
                    <select name="profesional_id" class="form-select" required>
                        <?php foreach ($profesionales_arr as $pro): ?>
                            <option value="<?= $pro['id'] ?>"
                                <?= $turno['profesional_id'] == $pro['id'] ? 'selected' : '' ?>>
                                <?= htmlspecialchars($pro['nombre']) ?> (<?= htmlspecialchars($pro['especialidad']) ?>)
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Consultorio</label>
                    <select name="consultorio_id" class="form-select" required>
                        <?php foreach ($consultorios_arr as $con): ?>
                            <option value="<?= $con['id'] ?>"
                                <?= $turno['consultorio_id'] == $con['id'] ? 'selected' : '' ?>>
                                <?= htmlspecialchars($con['nombre']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text" name="nombre" class="form-control" required value="<?= htmlspecialchars($turno['nombre']) ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Teléfono</label>
                    <input type="text" name="telefono" class="form-control" required value="<?= htmlspecialchars($turno['telefono']) ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">DNI</label>
                    <input type="text" name="dni" class="form-control" required value="<?= htmlspecialchars($turno['dni']) ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Fecha</label>
                    <input type="date" name="fecha" class="form-control" required value="<?= $turno['fecha'] ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Hora</label>
                    <input type="time" name="hora" class="form-control" required step="1800" value="<?= $turno['hora'] ?>">
                </div>

                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                <a href="ver_agenda.php" class="btn btn-secondary">Volver a la Agenda</a>
            </form>
        </div>
    </div>
</div>
</body>
</html>
