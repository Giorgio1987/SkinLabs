<?php
session_start();
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>SkinLabs - Estética Profesional</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/hero.css"> 
    <link rel="icon" href="assets/img/favicon.png" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="overlay">
        <div class="logo">SkinLabs</div>
        <div class="hero">
            <h1 class="titulo-bienvenida">Bienvenido a tu espacio de bienestar</h1>
            <p class="lead">Estética profesional con alma</p>

            <div class="d-flex justify-content-center gap-4 flex-wrap">
                <a href="clientes/servicios.php" class="btn btn-success btn-lg">
                    <i class="bi bi-person-heart me-2"></i> Cliente
                </a>
                <a href="empleados/index_empleados.php" class="btn btn-primary btn-lg">
                    <i class="bi bi-shield-lock me-2"></i> Empleado
                </a>
            </div>

            <p class="frase mt-4">✨ "La belleza comienza en el momento en que decides ser tú misma." - Coco Chanel</p>
        </div>
    </div>
</body>
</html>
