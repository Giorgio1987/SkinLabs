<?php
session_start();
require_once "../../php/conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $especialidad = trim($_POST['especialidad']);
    $color = trim($_POST['color']);

    if ($nombre && $especialidad && $color) {
        $stmt = $conexion->prepare("INSERT INTO profesionales (nombre, especialidad, color) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $especialidad, $color);

        if ($stmt->execute()) {
            header("Location: gestionar_profesionales.php?msg=Profesional agregado con éxito");
            exit;
        } else {
            header("Location: gestionar_profesionales.php?msg=Error al insertar");
            exit;
        }
    } else {
        header("Location: gestionar_profesionales.php?msg=Campos incompletos");
        exit;
    }
}
?>
