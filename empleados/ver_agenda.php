<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda de Turnos - SkinLabs</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/agenda.css">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

    <!-- FullCalendar CSS -->
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css" rel="stylesheet">

    <!-- Nuestros estilos -->

</head>

<body class="bg-secondary">

    <div class="container-fluid px-5 py-5" id="agenda-container">
        <div class="card shadow">
            <div class="card-header bg-dark text-white">
                <h3 class="mb-0">📅 Agenda de Turnos</h3>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <a href="index_empleados.php" class="btn btn-secondary">Volver al Menú</a>
                    <a href="agendar_turno.php" class="btn btn-secondary">➕ Agendar nuevo turno</a>
                </div>

                <!-- Sección de Filtros  -->
                <div class="filter-section mb-4">
                    <form method="GET">
                        <div class="row g-2 align-items-end flex-wrap">
                            <div class="col-md-3">
                                <label class="form-label">Cliente (nombre o DNI)</label>
                                <div class="input-group">
                                    <input type="text" name="cliente" class="form-control" value="<?= $_GET['cliente'] ?? '' ?>">
                                    <button class="btn btn-outline-secondary limpiar-campo" type="button" data-target="cliente" title="Limpiar campo">
                                        <i class="bi bi-x-circle"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Profesional</label>
                                <div class="input-group">
                                    <select name="profesional" class="form-select" data-selected="<?= $_GET['profesional'] ?? '' ?>"></select>
                                    <button class="btn btn-outline-secondary limpiar-campo" type="button" data-target="profesional" title="Limpiar campo">
                                        <i class="bi bi-x-circle"></i>
                                    </button>
                                </div>
                            </div>


                            <div class="col-md-3">
                                <label class="form-label">Servicio</label>
                                <div class="input-group">
                                    <select name="servicio" class="form-select" data-selected="<?= $_GET['servicio'] ?? '' ?>"></select>
                                    <button class="btn btn-outline-secondary limpiar-campo" type="button" data-target="servicio" title="Limpiar campo">
                                        <i class="bi bi-x-circle"></i>
                                    </button>
                                </div>
                            </div>


                            <div class="col-md-2">
                                <label class="form-label">Fecha específica</label>
                                <div class="input-group">
                                    <input type="date" name="fecha" class="form-control" value="<?= $_GET['fecha'] ?? '' ?>">
                                    <button class="btn btn-outline-secondary limpiar-campo" type="button" data-target="fecha" title="Limpiar campo">
                                        <i class="bi bi-x-circle"></i>
                                    </button>
                                </div>
                            </div>


                            <div class="col-md-auto d-flex gap-2">
                                <button type="submit" class="btn btn-primary" title="Buscar">
                                    <i class="bi bi-search"></i>
                                </button>
                                <button type="button" class="btn btn-secondary" id="btnLimpiarFiltros" title="Limpiar filtros">
                                    <i class="bi bi-arrow-counterclockwise"></i>
                                </button>
                            </div>

                        </div>
                    </form>

                </div>

                <!-- Fin Sección de Filtros  -->

                <div id="calendar" style="min-height: 800px;"></div>
            </div>
        </div>
    </div>

    <!-- Modal para detalles -->
    <div class="modal fade" id="detalleTurnoModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detalle del Turno</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="detalleContenido"></div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS y tu script personalizado -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Scripts comunes -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/locales/es.min.js"></script>

    <script src="../assets/js/agenda.js"></script>



</body>

</html>