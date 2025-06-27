<?php
session_start();
require_once "../../php/conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id']);
    $usuario = trim($_POST['usuario']);

    if ($id && $usuario) {
        $stmt = $conexion->prepare("UPDATE empleados SET usuario = ? WHERE id = ?");
        $stmt->bind_param("si", $usuario, $id);

        if ($stmt->execute()) {
            header("Location: gestionar_empleados.php?msg=Empleado actualizado");
            exit;
        } else {
            header("Location: gestionar_empleados.php?msg=Error al actualizar");
            exit;
        }
    } else {
        header("Location: gestionar_empleados.php?msg=Datos incompletos");
        exit;
    }
}
?>
