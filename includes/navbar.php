<?php
if (!isset($_SESSION)) session_start();
?>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#"><i class="bi bi-person-badge-fill me-2"></i>SkinLabs</a>
        <div class="collapse navbar-collapse justify-content-between">
            <span class="navbar-text text-light">
                <i class="bi bi-person-circle me-1"></i><?= $_SESSION['empleado']; ?>
            </span>
            <a href="../logout.php" class="btn btn-danger ms-3"><i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión</a>
        </div>
    </div>
</nav>