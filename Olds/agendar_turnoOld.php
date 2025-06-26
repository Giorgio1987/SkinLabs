<?php

date_default_timezone_set('America/Argentina/Buenos_Aires');
session_start();
include("../php/conexion.php");

// Protección por sesión
if (!isset($_SESSION['empleado'])) {
    header("Location: ../login.php");
    exit;
}

// Inicializamos variables
$mensaje = "";
$profesionales_arr = [];
$consultorios_arr = [];

// Cargar profesionales y consultorios una sola vez
$res_profesionales = mysqli_query($conexion, "SELECT * FROM profesionales");
while ($row = mysqli_fetch_assoc($res_profesionales)) {
    $profesionales_arr[] = $row;
}
$res_consultorios = mysqli_query($conexion, "SELECT * FROM consultorios");
while ($row = mysqli_fetch_assoc($res_consultorios)) {
    $consultorios_arr[] = $row;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
    $telefono = mysqli_real_escape_string($conexion, $_POST['telefono']);
    $dni = mysqli_real_escape_string($conexion, $_POST['dni']);
    $fecha = $_POST['fecha'];
    $hora = $_POST['hora'];
    $servicio = mysqli_real_escape_string($conexion, $_POST['servicio']);
    $profesional_id = $_POST['profesional_id'];
    $consultorio_id = $_POST['consultorio_id'];

    $fecha_actual = date('Y-m-d');
    $hora_actual = date('H:i');

    if ($fecha < $fecha_actual) {
        $mensaje = "<div class='alert alert-danger'>No se pueden agendar turnos en el pasado.</div>";
    } elseif ($fecha == $fecha_actual && $hora <= $hora_actual) {
        $mensaje = "<div class='alert alert-danger'>No se puede agendar un turno en una hora pasada de hoy.</div>";
    } else {
        $dia_semana = date('w', strtotime($fecha));
        if ($dia_semana == 0 || $dia_semana == 6) {
            $mensaje = "<div class='alert alert-danger'>Solo se permiten turnos de lunes a viernes.</div>";
        } else {
            $hora_ts = strtotime($hora);
            $inicio_ts = strtotime('09:00');
            $fin_ts = strtotime('18:00');

            if ($hora_ts < $inicio_ts || $hora_ts > $fin_ts) {
                $mensaje = "<div class='alert alert-danger'>Horario fuera del rango permitido (9:00 a 18:00).</div>";
            } else {
                // Verificar si el DNI ya tiene un turno ese día
                $sql_dni = "SELECT * FROM citas WHERE fecha = '$fecha' AND dni = '$dni'";
                $res_dni = mysqli_query($conexion, $sql_dni);

                if (mysqli_num_rows($res_dni) > 0) {
                    $mensaje = "<div class='alert alert-danger'>Ya tenés un turno agendado ese día con ese DNI.</div>";
                } else {
                    // Verificar si el profesional ya tiene un turno en esa fecha y hora
                    $sql_profe = "SELECT * FROM citas WHERE fecha = '$fecha' AND hora = '$hora' AND profesional_id = '$profesional_id'";
                    $res_profe = mysqli_query($conexion, $sql_profe);

                    if (mysqli_num_rows($res_profe) > 0) {
                        $mensaje = "<div class='alert alert-danger'>El profesional ya tiene un turno en ese horario.</div>";
                    } else {
                        // Verificar si el consultorio ya tiene un turno a esa hora
                        $sql_turno = "SELECT * FROM citas WHERE fecha = '$fecha' AND hora = '$hora' AND consultorio_id = '$consultorio_id'";
                        $res_turno = mysqli_query($conexion, $sql_turno);

                        if (mysqli_num_rows($res_turno) > 0) {
                            $mensaje = "<div class='alert alert-danger'>Ese horario ya está ocupado en ese consultorio.</div>";
                        } else {
                            // Insertar turno
                            $insert = "INSERT INTO citas 
                                (nombre, telefono, dni, servicio, profesional_id, consultorio_id, fecha, hora)
                                VALUES
                                ('$nombre', '$telefono', '$dni', '$servicio', '$profesional_id', '$consultorio_id', '$fecha', '$hora')";

                            if (mysqli_query($conexion, $insert)) {
                                $mensaje = "<div class='alert alert-success'>✅ Turno agendado con éxito.</div>";
                            } else {
                                $mensaje = "<div class='alert alert-danger'>Error al agendar el turno: " . mysqli_error($conexion) . "</div>";
                            }
                        }
                    }
                }
            }
        }
    }
}


// agegue aca

$horarios_disponibles = [];
$hora_inicio = strtotime('09:00');
$hora_fin = strtotime('18:00');

for ($hora = $hora_inicio; $hora <= $hora_fin; $hora += 1800) {
    $horarios_disponibles[] = date('H:i', $hora);
}

$horas_ocupadas = [];
if (!empty($_POST['fecha']) && !empty($_POST['profesional_id']) && !empty($_POST['consultorio_id'])) {
    $fecha = $_POST['fecha'];
    $prof_id = $_POST['profesional_id'];
    $cons_id = $_POST['consultorio_id'];

    $res_ocupadas = mysqli_query($conexion, "
        SELECT hora FROM citas
        WHERE fecha = '$fecha' 
        AND (profesional_id = '$prof_id' OR consultorio_id = '$cons_id')
    ");

    while ($row = mysqli_fetch_assoc($res_ocupadas)) {
        $horas_ocupadas[] = $row['hora'];
    }
}

// fin de la agregada
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agendar Turno - SkinLabs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-success text-white">
            <h3>📆 Agendar Turno</h3>
        </div>
        <div class="card-body">
            <?= $mensaje ?>
            <form method="POST">
                <div class="mb-3">
                    <label class="form-label">Servicio</label>
                    <select name="servicio" class="form-select" required>
                        <option value="">-- Seleccioná un tratamiento --</option>
                        <option value="Limpieza Facial">Limpieza Facial</option>
                        <option value="Tratamiento Antiacné">Tratamiento Antiacné</option>
                        <option value="Masajes terapéuticos y relajantes">Masajes terapéuticos y relajantes</option>
                        <option value="Pedicura y manicura">Pedicura y manicura</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Profesional</label>
                    <select name="profesional_id" class="form-select" required>
                        <option value="">-- Seleccioná --</option>
                        <?php foreach ($profesionales_arr as $pro): ?>
                            <option value="<?= $pro['id'] ?>">
                                <?= htmlspecialchars($pro['nombre']) ?> (<?= htmlspecialchars($pro['especialidad']) ?>)
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Consultorio</label>
                    <select name="consultorio_id" class="form-select" required>
                        <option value="">-- Seleccioná --</option>
                        <?php foreach ($consultorios_arr as $con): ?>
                            <option value="<?= $con['id'] ?>">
                                <?= htmlspecialchars($con['nombre']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Nombre y Apellido</label>
                    <!-- <input type="text" name="nombre" class="form-control" required> -->
                     <input type="text" name="nombre" class="form-control" required value="<?= isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : '' ?>">

                </div>
                <div class="mb-3">
                    <label class="form-label">Teléfono</label>
                    <!-- <input type="text" name="telefono" class="form-control" required> -->
                    <input type="text" name="telefono" class="form-control" required value="<?= isset($_POST['telefono']) ? htmlspecialchars($_POST['telefono']) : '' ?>">

                </div>
                <div class="mb-3">
                    <label class="form-label">DNI</label>
                    <!-- <input type="text" name="dni" class="form-control" required> -->
                     <input type="text" name="dni" class="form-control" required value="<?= isset($_POST['dni']) ? htmlspecialchars($_POST['dni']) : '' ?>">

                </div>
                <div class="mb-3">
                    <label class="form-label">Fecha</label>
                    <!-- <input type="date" name="fecha" class="form-control" required> -->
                     <input type="date" name="fecha" class="form-control" required value="<?= isset($_POST['fecha']) ? htmlspecialchars($_POST['fecha']) : '' ?>">

                </div>

                <div class="mb-3">
                    <label class="form-label">Hora</label>
                    <select name="hora" class="form-select" required>
                        <option value="">-- Seleccioná una hora --</option>
                        <?php foreach ($horarios_disponibles as $hora_opcion): ?>
                            <option value="<?= $hora_opcion ?>"
                                <?= in_array($hora_opcion, $horas_ocupadas) ? 'disabled' : '' ?>
                                <?= isset($_POST['hora']) && $_POST['hora'] == $hora_opcion ? 'selected' : '' ?>>
                            <?= $hora_opcion ?> <?= in_array($hora_opcion, $horas_ocupadas) ? '(Ocupado)' : '' ?>
                            </option>
                        <?php endforeach; ?>
                 </select>
                </div>

               <!--  <div class="mb-3">
                    <label class="form-label">Hora</label>
                    <input type="time" name="hora" class="form-control" step="1800" required>
                    <small class="text-muted">Turnos cada 30 minutos entre 9:00 y 18:00</small>
                </div> -->
                <button type="submit" class="btn btn-success">Agendar turno</button>
                <a href="index_empleados.php" class="btn btn-secondary">Volver</a>
            </form>
        </div>
    </div>
</div>
</body>
</html>
