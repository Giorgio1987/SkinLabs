<?php
session_start();

if (!isset($_SESSION['empleado'])) {
    header("Location: login.php");
    exit;
}

include("../php/conexion.php");

$factura_guardada = false;
$nombre = $dni = $cuil = $direccion = $email = $fecha = $monto = $metodo_pago = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $dni = $_POST['dni'];
    $cuil = $_POST['cuil'];
    $direccion = $_POST['direccion'];
    $email = $_POST['email'];
    $fecha = $_POST['fecha'];
    $monto = $_POST['monto'];
    $metodo_pago = $_POST['metodo_pago'];

    if (!$conexion) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    $stmt = $conexion->prepare("INSERT INTO facturas (nombre, dni, cuil, direccion, mail, fecha, monto, metodo_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die("Error al preparar la consulta: " . $conexion->error);
    }

    $stmt->bind_param("ssssssds", $nombre, $dni, $cuil, $direccion, $email, $fecha, $monto, $metodo_pago);

    if ($stmt->execute()) {
        $factura_guardada = true;
    } else {
        echo "<div class='alert alert-danger'>❌ Error al guardar la factura. " . $stmt->error . "</div>";
    }

    $stmt->close();
    $conexion->close();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura Profesional - SkinLabs</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.png"/>
    <link rel="stylesheet" href="../assets/css/facturacion.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        @page {
            margin: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
        }

        .ticket {
            background: white;
            padding: 30px;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #dee2e6;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .ticket h5 {
            margin-bottom: 0;
        }

        .ticket small {
            color: #6c757d;
        }

        .ticket hr {
            margin: 10px 0;
        }

        .qr {
            text-align: center;
            margin-top: 10px;
        }

        .firma {
            margin-top: 30px;
        }

        .firma .linea {
            border-top: 1px solid #000;
            width: 200px;
            margin: 0 auto;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
        }

        @media print {
            html, body {
                margin: 0;
                padding: 0;
                height: 100%;
            }

            body * {
                visibility: hidden;
            }

            .ticket, .ticket * {
                visibility: visible;
            }

            .ticket {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: auto;
                box-shadow: none;
            }

            .no-print {
                display: none !important;
            }
        }
    </style>
</head>
<body>
<?php include "../Includes/navbar.php"; ?>
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Facturación Profesional - SkinLabs</h4>
        </div>
        <div class="card-body">
            <form method="POST">
                <div class="mb-3"><label class="form-label">Nombre completo</label><input type="text" name="nombre" class="form-control" required></div>
                <div class="mb-3"><label class="form-label">DNI</label><input type="text" name="dni" class="form-control" required></div>
                <div class="mb-3"><label class="form-label">CUIL</label><input type="text" name="cuil" class="form-control" required></div>
                <div class="mb-3"><label class="form-label">Dirección</label><input type="text" name="direccion" class="form-control" required></div>
                <div class="mb-3"><label class="form-label">Email</label><input type="email" name="email" class="form-control" required></div>
                <div class="mb-3"><label class="form-label">Fecha</label><input type="date" name="fecha" class="form-control" required></div>
                <div class="mb-3"><label class="form-label">Monto</label><input type="number" step="0.01" name="monto" class="form-control" required></div>
                <div class="mb-3">
                    <label class="form-label">Método de pago</label>
                    <select name="metodo_pago" class="form-select" required>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                        <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                        <option value="Billetera Virtual">Billetera Virtual</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-success">Generar Factura</button>
            </form>

            <?php if ($factura_guardada): ?>
                <div id="factura" class="ticket mt-4">
                    <div class="text-center">
                    <img src="../assets/img/logo.jpg" alt="SkinLabs Logo" style="width: 80px; margin-bottom: 10px;">
                        <h5 class="mt-2">Factura SkinLabs</h5>
                        <small>Nº: <?= rand(100000,999999) ?> - <?= date("Y") ?></small>
                        <hr>
                        <p class="mb-0"><strong>SkinLabs</strong> - Responsable Inscripto</p>
                        <p class="mb-0">CUIT: 30-5268744-9 | Ing. Brutos: 305268742</p>
                        <p class="mb-0">Inicio de actividades: 20/04/2019</p>
                        <p class="mb-0">Dirección: Amenábar 629, Colegiales, CABA, Argentina</p>
                        <p class="mb-0">Tel: 123-456-7890</p>
                        <hr>
                    </div>
                    <p><strong>Nombre:</strong> <?= htmlspecialchars($nombre) ?></p>
                    <p><strong>DNI:</strong> <?= htmlspecialchars($dni) ?></p>
                    <p><strong>CUIL:</strong> <?= htmlspecialchars($cuil) ?></p>
                    <p><strong>Dirección:</strong> <?= htmlspecialchars($direccion) ?></p>
                    <p><strong>Email:</strong> <?= htmlspecialchars($email) ?></p>
                    <hr>
                    <p><strong>Fecha:</strong> <?= htmlspecialchars($fecha) ?></p>
                    <p><strong>Método de Pago:</strong> <?= htmlspecialchars($metodo_pago) ?></p>
                    <p><strong>Total:</strong> $<?= number_format($monto, 2, ',', '.') ?></p>
                    <hr>
                    <div class="qr">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=<?= urlencode($nombre . ' - ' . $dni . ' - ' . $fecha) ?>" alt="QR">
                    </div>
                    <div class="firma text-center">
                        <div class="linea">Firma / Aclaración</div>
                    </div>
                    <div class="text-center mt-3">
                        <button class="btn btn-sm btn-secondary no-print" onclick="window.print()">🖨 Imprimir</button>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
<script src="../assets/js/facturacion.js"></script>
</body>
</html>
