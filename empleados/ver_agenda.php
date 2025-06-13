
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

    <div class="container py-5" id="agenda-container">
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
                        <div class="row g-3 align-items-end">
                            <div class="col-md-3">
                                <label class="form-label">Cliente (nombre o DNI)</label>
                                <input type="text" name="cliente" class="form-control" value="<?= $_GET['cliente'] ?? '' ?>">
                            </div>

                            <div class="col-md-3">
                                <label class="form-label">Profesional</label>
                                <select name="profesional" class="form-select">
                                    <option value="">Todos</option>
                                    <option value="Ana" <?= ($_GET['profesional'] ?? '') == 'Ana' ? 'selected' : '' ?>>Ana</option>
                                    <option value="Carlos" <?= ($_GET['profesional'] ?? '') == 'Carlos' ? 'selected' : '' ?>>Carlos</option>
                                    <option value="María" <?= ($_GET['profesional'] ?? '') == 'María' ? 'selected' : '' ?>>María</option>
                                    <option value="Pedro" <?= ($_GET['profesional'] ?? '') == 'Pedro' ? 'selected' : '' ?>>Pedro</option>
                                </select>
                            </div>

                            <div class="col-md-3">
                                <label class="form-label">Servicio</label>
                                <select name="servicio" class="form-select">
                                    <option value="">Todos</option>
                                    <option value="Limpieza facial" <?= ($_GET['servicio'] ?? '') == 'Limpieza facial' ? 'selected' : '' ?>>Limpieza facial</option>
                                    <option value="Masaje relajante" <?= ($_GET['servicio'] ?? '') == 'Masaje relajante' ? 'selected' : '' ?>>Masaje relajante</option>
                                    <option value="Peeling" <?= ($_GET['servicio'] ?? '') == 'Peeling' ? 'selected' : '' ?>>Peeling</option>
                                    <option value="Radiofrecuencia" <?= ($_GET['servicio'] ?? '') == 'Radiofrecuencia' ? 'selected' : '' ?>>Radiofrecuencia</option>
                                </select>
                            </div>

                            <div class="col-md-2">
                                <label class="form-label">Fecha específica</label>
                                <input type="date" name="fecha" class="form-control" value="<?= $_GET['fecha'] ?? '' ?>">
                            </div>

                            <div class="col-md-1 d-grid">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-funnel"></i>
                                </button>
                            </div>

                            <div class="col-md-1 d-grid">
                                <a href="agendar_turno.php" class="btn btn-secondary">
                                    <i class="bi bi-arrow-counterclockwise"></i>
                                </a>
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