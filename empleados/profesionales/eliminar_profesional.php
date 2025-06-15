<?php
session_start();
require_once "../../php/conexion.php";

if (!isset($_SESSION['empleado'])) {
    header("Location: ../login.php");
    exit;
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    // Buscar profesional para mostrar confirmación
    $query = "SELECT nombre FROM profesionales WHERE id_profesional = $id";
    $result = $conexion->query($query);
    $profesional = $result->fetch_assoc();

    if (!$profesional) {
        $error = "Profesional no encontrado.";
    }
} elseif (isset($_POST['confirmar']) && isset($_POST['id'])) {
    $id = intval($_POST['id']);

    // Eliminar profesional
    $delete = "DELETE FROM profesionales WHERE id_profesional = $id";
    if ($conexion->query($delete)) {
        header("Location: gestionar_profesionales.php?msg=Profesional eliminado correctamente");
        exit;
    } else {
        $error = "Error al eliminar: " . $conexion->error;
    }
} else {
    header("Location: gestionar_profesionales.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <title>Eliminar Profesional - SkinLabs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container py-5">
        <a href="gestionar_profesionales.php" class="btn btn-secondary mb-3">← Volver</a>

        <h3>Eliminar Profesional</h3>

        <?php if (isset($error)): ?>
            <div class="alert alert-danger"><?= $error ?></div>
        <?php elseif (isset($profesional)): ?>
            <div class="alert alert-warning">
                ¿Estás seguro que deseas eliminar al profesional <strong><?= htmlspecialchars($profesional['nombre']) ?></strong>?
            </div>
            <form method="POST">
                <input type="hidden" name="id" value="<?= $id ?>">
                <button type="submit" name="confirmar" class="btn btn-danger">Sí, eliminar</button>
                <a href="gestionar_profesionales.php" class="btn btn-outline-light">Cancelar</a>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
