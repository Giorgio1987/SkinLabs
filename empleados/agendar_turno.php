<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');
session_start();
include("../php/conexion.php");

if (!isset($_SESSION['empleado'])) {
    header("Location: ../login.php");
    exit;
}

$mensaje = "";
$profesionales_arr = [];
$consultorios_arr = [];

// Traer profesionales, consultorios y servicios
$profesionales_arr = mysqli_fetch_all(mysqli_query($conexion, "SELECT * FROM profesionales"), MYSQLI_ASSOC);
$consultorios_arr  = mysqli_fetch_all(mysqli_query($conexion, "SELECT * FROM consultorios"), MYSQLI_ASSOC);
$servicios_arr = mysqli_fetch_all(mysqli_query($conexion, "SELECT * FROM servicios WHERE activo = 1"), MYSQLI_ASSOC);

// Agendamiento
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
        $mensaje = "<div class='alert alert-danger'>No se puede agendar en una fecha u hora pasada.</div>";
    } elseif (in_array(date('w', strtotime($fecha)), [0, 6])) {
        $mensaje = "<div class='alert alert-danger'>Solo se permiten turnos de lunes a viernes.</div>";
    } else {
        $hora_ts   = strtotime($hora);
        $inicio_ts = strtotime('09:00');
        $fin_ts    = strtotime('18:00');

        if ($hora_ts < $inicio_ts || $hora_ts > $fin_ts) {
            $mensaje = "<div class='alert alert-danger'>El horario debe estar entre 9:00 y 18:00.</div>";
        } else {
            $existe_dni = mysqli_num_rows(mysqli_query(
                $conexion,
                "SELECT 1 FROM citas WHERE fecha = '$fecha' AND dni = '$dni'"
            ));
            $existe_profesional = mysqli_num_rows(mysqli_query(
                $conexion,
                "SELECT 1 FROM citas WHERE fecha = '$fecha' AND hora = '$hora' AND profesional_id = '$profesional_id'"
            ));
            $existe_consultorio = mysqli_num_rows(mysqli_query(
                $conexion,
                "SELECT 1 FROM citas WHERE fecha = '$fecha' AND hora = '$hora' AND consultorio_id = '$consultorio_id'"
            ));

            if ($existe_dni) {
                $mensaje = "<div class='alert alert-danger'>Ya hay un turno para este DNI en esa fecha.</div>";
            } elseif ($existe_profesional) {
                $mensaje = "<div class='alert alert-danger'>El profesional ya tiene un turno en ese horario.</div>";
            } elseif ($existe_consultorio) {
                $mensaje = "<div class='alert alert-danger'>Ese consultorio ya está ocupado a esa hora.</div>";
            } else {
                $sql = "INSERT INTO citas (nombre, telefono, dni, servicio, profesional_id, consultorio_id, fecha, hora)
                        VALUES ('$nombre', '$telefono', '$dni', '$servicio', '$profesional_id', '$consultorio_id', '$fecha', '$hora')";
                $mensaje = mysqli_query($conexion, $sql)
                    ? "<div class='alert alert-success'>✅ Turno agendado con éxito.</div>"
                    : "<div class='alert alert-danger'>Error: " . mysqli_error($conexion) . "</div>";
            }
        }
    }
}

// Generar horarios disponibles
$horarios_disponibles = [];
for ($h = strtotime('09:00'); $h <= strtotime('18:00'); $h += 1800) {
    $horarios_disponibles[] = date('H:i', $h);
}

// Detectar horas ocupadas para esa fecha + profesional + consultorio
$horas_ocupadas = [];
if (!empty($_POST['fecha']) && !empty($_POST['profesional_id']) && !empty($_POST['consultorio_id'])) {
    $fecha = $_POST['fecha'];
    $prof  = $_POST['profesional_id'];
    $cons  = $_POST['consultorio_id'];

    $res_ocupadas = mysqli_query($conexion, "
        SELECT hora FROM citas
        WHERE fecha = '$fecha'
        AND (profesional_id = '$prof' OR consultorio_id = '$cons')
    ");

    while ($row = mysqli_fetch_assoc($res_ocupadas)) {
        $horas_ocupadas[] = $row['hora'];
    }
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Agendar Turno - SkinLabs</title>
    <link rel="stylesheet" href="../assets/css/agendar_turno.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
    <link rel="stylesheet" href="../assets/css/navbar.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/2025/SkinLabs/assets/css/navbar.css">
    <!-- Tipografías -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins&display=swap" rel="stylesheet">


</head>

<body class="bg-light">
    <?php include "../Includes/navbar.php"; ?>
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
                            <?php foreach ($servicios_arr as $s): ?>
                                <option value="<?= htmlspecialchars($s['nombre']) ?>"
                                    <?= isset($_POST['servicio']) && $_POST['servicio'] === $s['nombre'] ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($s['nombre']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Profesional</label>
                        <select name="profesional_id" class="form-select" required>
                            <option value="">-- Seleccioná --</option>
                            <?php foreach ($profesionales_arr as $pro): ?>
                                <option value="<?= $pro['id'] ?>"
                                    <?= isset($_POST['profesional_id']) && $_POST['profesional_id'] == $pro['id'] ? 'selected' : '' ?>>
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
                                <option value="<?= $con['id'] ?>"
                                    <?= isset($_POST['consultorio_id']) && $_POST['consultorio_id'] == $con['id'] ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($con['nombre']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nombre y Apellido</label>
                        <input type="text" name="nombre" class="form-control" required
                            value="<?= isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : '' ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Teléfono</label>
                        <input type="text" name="telefono" class="form-control" required
                            value="<?= isset($_POST['telefono']) ? htmlspecialchars($_POST['telefono']) : '' ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">DNI</label>
                        <input type="text" name="dni" class="form-control" required
                            value="<?= isset($_POST['dni']) ? htmlspecialchars($_POST['dni']) : '' ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha</label>
                        <input type="date" name="fecha" class="form-control" required
                            value="<?= isset($_POST['fecha']) ? htmlspecialchars($_POST['fecha']) : '' ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Hora</label>
                        <select name="hora" class="form-select" required>
                            <option value="">-- Seleccioná una hora --</option>
                            <?php foreach ($horarios_disponibles as $h): ?>
                                <option value="<?= $h ?>"
                                    <?= in_array($h, $horas_ocupadas) ? 'disabled' : '' ?>
                                    <?= isset($_POST['hora']) && $_POST['hora'] === $h ? 'selected' : '' ?>>
                                    <?= $h ?> <?= in_array($h, $horas_ocupadas) ? '(Ocupado)' : '' ?>
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
<script src="../assets/js/agendar_turno.js"></script>
                    <!-- <button type="submit" class="btn btn-success">Agendar turno</button>
                    <?php
                  //$volver_a = 'index_empleados.php';
                   //f (isset($_GET['volver']) && $_GET['volver'] === 'agenda') {
                //      $volver_a = 'ver_agenda.php';
                   //
                    ?>
                    <a href="<?= $volver_a ?>" class="btn btn-secondary">Volver</a> -->

                </form>
            </div>
        </div>
    </div>
</body>

</html>