<?php
session_start();

// ❌ Evitar caché del navegador
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// 🔐 Verificación de sesión
if (!isset($_SESSION['empleado'])) {
    header("Location: ../login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es" data-bs-theme="dark"> <!-- Activamos modo oscuro -->
<head>
    <meta charset="UTF-8">
    <title>Panel del Personal - SkinLabs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        .list-group-item i {
            width: 25px;
        }
    </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#"><i class="bi bi-person-badge-fill me-2"></i>SkinLabs</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Menú">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="menu">
            <ul class="navbar-nav me-auto">
                <!-- Agregar más enlaces aquí si querés -->
            </ul>
            <span class="navbar-text text-light">
                <i class="bi bi-person-circle me-1"></i><?php echo $_SESSION['empleado']; ?>
            </span>
            <a href="../logout.php" class="btn btn-danger ms-3"><i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión</a>
        </div>
    </div>
</nav>

<!-- Contenido -->
<div class="container py-5">
    <div class="card shadow-lg">
        <div class="card-body">
            <?php if (isset($_GET['msg'])): ?>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="bi bi-check-circle-fill me-2"></i><?php echo htmlspecialchars($_GET['msg']); ?>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Cerrar"></button>
                </div>
            <?php endif; ?>

            <h4 class="mb-4">Seleccioná una opción:</h4>
            <div class="list-group">
                <a href="nuevo.php" class="list-group-item list-group-item-action"><i class="bi bi-person-plus-fill"></i> Agregar nuevo paciente</a>
                <a href="buscar.php" class="list-group-item list-group-item-action"><i class="bi bi-search"></i> Buscar o modificar paciente</a>
                <a href="ver_historial.php" class="list-group-item list-group-item-action"><i class="bi bi-journal-text"></i> Ver historial completo</a>
                <a href="agregar_tratamiento.php" class="list-group-item list-group-item-action"><i class="bi bi-plus-square-fill"></i> Agregar tratamiento / anotaciones</a>
                <a href="historia_clinica.php" class="list-group-item list-group-item-action"><i class="bi bi-book-half"></i> Ver historial de un paciente</a>
                <a href="ver_agenda.php" class="list-group-item list-group-item-action"><i class="bi bi-calendar-week"></i> Ver agenda de turnos</a>
                <a href="agendar_turno.php" class="list-group-item list-group-item-action"><i class="bi bi-calendar-plus"></i> Agendar un nuevo turno</a>
                <a href="eliminar_turno.php" class="list-group-item list-group-item-action"><i class="bi bi-calendar-x"></i> Eliminar un turno</a>
                <a href="facturacion.php" class="list-group-item list-group-item-action"><i class="bi bi-cash-coin"></i> Cargar Factura</a>
                <a href="ver_facturas.php" class="list-group-item list-group-item-action"><i class="bi bi-file-earmark-bar-graph"></i> Ver Facturación</a>
            </div>
        </div>
    </div>
</div>

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
    window.addEventListener("pageshow", function(event) {
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            location.reload();
        }
    });
</script>

</body>
</html>
