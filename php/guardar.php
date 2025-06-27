<?php
session_start();
include("conexion.php");

// Obtener y limpiar los datos del formulario
$dni = trim($_POST['dni']);
$nombre = trim($_POST['nombre']);
$telefono = trim($_POST['telefono']);
$direccion = trim($_POST['direccion']);
$fecha_nacimiento = $_POST['fecha_nacimiento'];

$errores = [];

// Validaciones
if (!preg_match('/^\d+$/', $dni)) {
    $errores[] = "El DNI debe contener solo números.";
}
if (!preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u', $nombre)) {
    $errores[] = "El nombre solo debe contener letras y espacios.";
}
if (!empty($telefono) && !preg_match('/^\d+$/', $telefono)) {
    $errores[] = "El teléfono debe contener solo números.";
}
if (empty($direccion)) {
    $errores[] = "La dirección no puede estar vacía.";
}
if (empty($fecha_nacimiento)) {
    $errores[] = "Debe ingresar la fecha de nacimiento.";
}

// Verificar si el DNI ya existe
$verificar_dni = $conexion->prepare("SELECT id FROM pacientes WHERE dni = ?");
$verificar_dni->bind_param("s", $dni);
$verificar_dni->execute();
$verificar_dni->store_result();
if ($verificar_dni->num_rows > 0) {
    $errores[] = "El DNI ya está registrado en la base de datos.";
}
$verificar_dni->close();

// Mostrar errores si hay
if (!empty($errores)) {
    echo '<!DOCTYPE html><html lang="es"><head>
            <meta charset="UTF-8">
            <link href="../assets/css/guardar.css" rel="stylesheet">
            <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
            <title>Error al guardar</title>
          </head><body class="bg-light">
          <div class="container py-5">
            <div class="alert alert-danger">
              <h4>❌ Errores al guardar el paciente:</h4>
              <ul>';
    foreach ($errores as $error) {
        echo '<li>' . htmlspecialchars($error) . '</li>';
    }
    echo '</ul>
            <a href="../empleados/nuevo.php" class="btn btn-secondary mt-3">Volver al formulario</a>
          </div></div></body></html>';
    exit;
}

// Insertar paciente
$sql = "INSERT INTO pacientes (dni, nombre, telefono, direccion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("sssss", $dni, $nombre, $telefono, $direccion, $fecha_nacimiento);

if ($stmt->execute()) {
    // Redirige al panel con mensaje de éxito
    header("Location: ../empleados/index_empleados.php?msg=Paciente+guardado+exitosamente");
    exit;
} else {
    echo "<div class='alert alert-danger'>
            <h4>❌ Error al guardar el paciente:</h4>
            <p>" . htmlspecialchars($conexion->error) . "</p>
            <a href='../empleados/nuevo.php' class='btn btn-secondary mt-3'>Volver al formulario</a>
          </div>";
}


$stmt->close();
$conexion->close();
?>
