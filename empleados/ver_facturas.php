<?php
session_start();

if (!isset($_SESSION['empleado'])) {
    header("Location: login.php");
    exit;
}

include("../php/conexion.php");

$filtro = "";
$resultado = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $tipo_filtro = $_POST['tipo_filtro'];

    if ($tipo_filtro === "dia") {
        $fecha = $_POST['fecha_dia'];
        $filtro = "WHERE fecha = '$fecha'";
    } elseif ($tipo_filtro === "mes") {
        $mes = $_POST['mes'];
        $anio = $_POST['anio'];
        $filtro = "WHERE MONTH(fecha) = '$mes' AND YEAR(fecha) = '$anio'";
    }

    $sql = "SELECT * FROM facturas $filtro ORDER BY fecha DESC";
    $resultado = mysqli_query($conexion, $sql);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>📊 Ver Facturación - SkinLabs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-4">
    <div class="card shadow">
        <div class="card-header bg-dark text-white">
            <h4 class="mb-0">📊 Ver Facturación</h4>
        </div>
        <div class="card-body">
            <a href="index_empleados.php" class="btn btn-secondary mb-3">Volver al menú</a>

            <form method="POST" class="mb-4">
                <div class="row g-3">
                    <div class="col-md-4">
                        <select name="tipo_filtro" class="form-select" required onchange="mostrarFiltros(this.value)">
                            <option value="">Seleccionar tipo de filtro</option>
                            <option value="dia">Por día</option>
                            <option value="mes">Por mes</option>
                        </select>
                    </div>
                    <div class="col-md-4" id="filtro_dia" style="display: none;">
                        <input type="date" name="fecha_dia" class="form-control">
                    </div>
                    <div class="col-md-2" id="filtro_mes" style="display: none;">
                        <select name="mes" class="form-select">
                            <?php for ($m = 1; $m <= 12; $m++): ?>
                                <option value="<?= $m ?>"><?= date("F", mktime(0, 0, 0, $m, 1)) ?></option>
                            <?php endfor; ?>
                        </select>
                    </div>
                    <div class="col-md-2" id="filtro_anio" style="display: none;">
                        <select name="anio" class="form-select">
                            <?php for ($y = 2022; $y <= date("Y"); $y++): ?>
                                <option value="<?= $y ?>"><?= $y ?></option>
                            <?php endfor; ?>
                        </select>
                    </div>
                </div>
                <div class="mt-3">
                    <button type="submit" class="btn btn-primary">Buscar</button>
                    <button type="button" class="btn btn-outline-secondary" onclick="window.print()">🖨️ Imprimir</button>
                </div>
            </form>

            <?php if (!empty($resultado) && mysqli_num_rows($resultado) > 0): ?>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Cliente</th>
                                <th>DNI</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Método de pago</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php while ($row = mysqli_fetch_assoc($resultado)): ?>
                            <tr>
                                <td><?= htmlspecialchars($row['nombre']) ?></td>
                                <td><?= htmlspecialchars($row['dni']) ?></td>
                                <td><?= $row['fecha'] ?></td>
                                <td>$<?= number_format($row['monto'], 2) ?></td>
                                <td><?= $row['metodo_pago'] ?></td>
                            </tr>
                        <?php endwhile; ?>
                        </tbody>
                    </table>
                </div>
            <?php elseif ($_SERVER["REQUEST_METHOD"] === "POST"): ?>
                <div class="alert alert-info">No se encontraron facturas para ese filtro.</div>
            <?php endif; ?>
        </div>
    </div>
</div>

<script>
function mostrarFiltros(valor) {
    document.getElementById('filtro_dia').style.display = (valor === 'dia') ? 'block' : 'none';
    document.getElementById('filtro_mes').style.display = (valor === 'mes') ? 'block' : 'none';
    document.getElementById('filtro_anio').style.display = (valor === 'mes') ? 'block' : 'none';
}
</script>
</body>
</html>
