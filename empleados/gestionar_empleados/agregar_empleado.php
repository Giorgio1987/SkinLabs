<?php
session_start();
require_once "../../php/conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario']);
    $clave = trim($_POST['clave']);

    // Validar que no estén vacíos
    if (!empty($usuario) && !empty($clave)) {
        // Encriptar la clave antes de guardar
        $clave_encriptada = password_hash($clave, PASSWORD_DEFAULT);

        $stmt = $conexion->prepare("INSERT INTO empleados (usuario, clave) VALUES (?, ?)");
        $stmt->bind_param("ss", $usuario, $clave_encriptada);

        if ($stmt->execute()) {
            header("Location: gestionar_empleados.php?msg=Empleado agregado con éxito");
            exit;
        } else {
            header("Location: gestionar_empleados.php?msg=Error al insertar");
            exit;
        }
    } else {
        header("Location: gestionar_empleados.php?msg=Campos incompletos");
        exit;
    }
}
?>
