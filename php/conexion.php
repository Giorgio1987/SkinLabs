<?php
$host = "127.0.0.1";       // mejor usar IP directa
$usuario = "root";         // usuario MySQL
$clave = "";               // contraseña (vacía por defecto en XAMPP)
$bd = "esba";              // nombre de la base de datos
$puerto = 3307;            // puerto correcto de MySQL en tu XAMPP

// Crear conexión
$conexion = new mysqli($host, $usuario, $clave, $bd, $puerto);

// Verificar si la conexión es exitosa
if ($conexion->connect_error) {
    die("❌ Error al conectar con la base de datos: " . $conexion->connect_error);
} else {
    // echo "✅ Conexión exitosa"; // Descomentar solo para pruebas
}
?>
