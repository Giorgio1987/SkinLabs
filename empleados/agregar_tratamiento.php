<?php
// Iniciar la sesión
session_start();

// Verificar si el usuario está logueado
if (!isset($_SESSION['empleado'])) {
    // Redirigir al login si no está logueado
    header("Location: login.php");
    exit;
}

// Desactivar el caché para evitar que se vuelva a cargar la página tras el "atrás"
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include("../php/conexion.php");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Tratamiento</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/agregar_tratamiento.css">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
    <link rel="stylesheet" href="../assets/css/navbar.css">
</head>
<body class="bg-light">
<?php include "../Includes/navbar.php"; ?>
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h2 class="mb-0">Agregar Tratamiento</h2>
        </div>
        <div class="card-body">
            <form method="POST" action="../php/guardar_tratamiento.php">
                <div class="mb-3">
                    <label for="dni" class="form-label">DNI del Paciente</label>
                    <input type="text" name="dni" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label for="id_profesional" class="form-label">Profesional</label>
                    <select name="id_profesional" class="form-select" required>
                        <?php
                        // Obtener los profesionales desde la base de datos
                        $result = $conexion->query("SELECT * FROM profesionales");
                        while ($row = $result->fetch_assoc()) {
                            echo "<option value='" . $row['id'] . "'>" . $row['nombre'] . "</option>";
                        }
                        ?>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="fecha" class="form-label">Fecha</label>
                    <input type="date" name="fecha" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción del Tratamiento</label>
                    <textarea name="descripcion" class="form-control" required></textarea>
                </div>

                <div class="mb-3">
                    <label for="observaciones" class="form-label">Observaciones</label>
                    <textarea name="observaciones" class="form-control"></textarea>
                </div>

                <button type="submit" class="btn btn-success">Guardar Tratamiento</button>
                <a href="index_empleados.php" class="btn btn-secondary">Volver al Menú</a>
            </form>
        </div>
    </div>
</div>
<script src="../assets/js/agregar_tratamiento.js"></script>
</body>
</html>

