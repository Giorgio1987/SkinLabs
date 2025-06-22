<?php
session_start();
if (!isset($_SESSION['empleado'])) {
    header("Location: ../login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <title>Gestionar Servicios - SkinLabs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-dark bg-primary px-3">
    <a class="navbar-brand" href="#">SkinLabs</a>
    <span class="navbar-text text-white"><?php echo $_SESSION['empleado']; ?></span>
    <a href="../logout.php" class="btn btn-danger ms-3">Cerrar sesión</a>
</nav>

<div class="container py-5">
    <div class="d-flex justify-content-between mb-3">
        <h4>Servicios registrados</h4>
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAgregarServicio">
            <i class="bi bi-plus-circle"></i> Nuevo servicio
        </button>
    </div>

    <table class="table table-hover table-dark table-bordered align-middle">
        <thead class="table-light">
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Activo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaServicios">
            <!-- JS carga aquí -->
        </tbody>
    </table>

    <a href="../index_empleados.php" class="btn btn-outline-light mt-3">
        <i class="bi bi-arrow-left-circle me-1"></i> Volver al Menú
    </a>
</div>

<?php include 'modal_agregar_servicio.php'; ?>
<?php include 'modal_editar_servicio.php'; ?>
<?php include 'modal_eliminar_servicio.php'; ?>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="../../assets/js/editar_servicio.js"></script>
</body>
</html>
