document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    let calendar;
    let profesionales = [];
    let servicios = [];

    // Inicializar el calendario
    function inicializarCalendario() {
        calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'es',
            initialView: 'listDay',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            nowIndicator: true,
            slotMinTime: "08:00:00",
            slotMaxTime: "20:00:00",
            slotDuration: '00:30:00',
            slotLabelInterval: '00:30',
            scrollTime: '08:00:00',
            allDaySlot: false,
            eventOverlap: false,
            height: 'auto',
            slotMinHeight: 80,
            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            },
            events: function (fetchInfo, successCallback, failureCallback) {
                cargarEventos(fetchInfo)
                    .then(successCallback)
                    .catch(failureCallback);
            },
            eventClick: function (info) {
                mostrarDetalleTurno(info);
            }
        });

        // Mostrar/ocultar botón de limpiar
        function actualizarVisibilidadLimpiar() {
            document.querySelectorAll('.limpiar-campo').forEach(btn => {
                const target = btn.dataset.target;
                const input = document.querySelector(`[name="${target}"]`);
                if (input) {
                    const tieneValor = input.value && input.value !== '';
                    btn.classList.toggle('d-none', !tieneValor);
                }
            });
        }

        actualizarVisibilidadLimpiar();

        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', actualizarVisibilidadLimpiar);
            input.addEventListener('change', actualizarVisibilidadLimpiar);
        });

        document.querySelectorAll('.limpiar-campo').forEach(btn => {
            btn.addEventListener('click', function () {
                const target = this.dataset.target;
                const campo = document.querySelector(`[name="${target}"]`);
                if (campo) {
                    campo.value = '';
                    campo.dispatchEvent(new Event('input'));
                    campo.dispatchEvent(new Event('change'));
                }
            });
        });

        calendar.render();
    }

    // Cargar eventos con filtros aplicados
    async function cargarEventos(fetchInfo) {
        const params = new URLSearchParams({
            getTurnos: 1,
            cacheBuster: new Date().getTime(),
            start: fetchInfo.startStr,
            end: fetchInfo.endStr,
            profesional: document.querySelector('select[name="profesional"]').value || '',
            servicio: document.querySelector('select[name="servicio"]').value || '',
            fecha: document.querySelector('input[name="fecha"]').value || '',
            cliente: document.querySelector('input[name="cliente"]').value || ''
        });

        const response = await fetch(`./get_turnos.php?${params}`);
        if (!response.ok) throw new Error('Error al cargar eventos');
        return await response.json();
    }

    // Mostrar detalles del turno en modal
    function mostrarDetalleTurno(info) {
        const datos = info.event.extendedProps;
        const turnoId = info.event.id;

        const detalle = `
            <div class="mb-3">
                <h5>Detalles del Turno</h5>
                <p><strong>Cliente:</strong> ${datos.cliente}</p>
                <p><strong>Profesional:</strong> ${datos.profesional}</p>
                <p><strong>Servicio:</strong> ${datos.servicio}</p>
                <p><strong>Consultorio:</strong> ${datos.consultorio}</p>
                <p><strong>Fecha/Hora:</strong> ${info.event.start.toLocaleString()}</p>
            </div>
            <div class="d-flex justify-content-between">
                <a href="editar_turno.php?id=${turnoId}" class="btn btn-primary btn-sm">
                    <i class="bi bi-pencil"></i> Editar
                </a>
                <a href="eliminar_turno.php?id=${turnoId}" 
                   class="btn btn-danger btn-sm"
                   onclick="return confirm('¿Eliminar este turno?')">
                   <i class="bi bi-trash"></i> Eliminar
                </a>
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('detalleTurnoModal'));
        document.getElementById('detalleContenido').innerHTML = detalle;
        modal.show();
    }

    // Cargar datos para los filtros
    async function cargarDatosFiltros() {
        try {
            const resProf = await fetch('profesionales/get_profesionales.php');
            profesionales = await resProf.json();

            const resServ = await fetch('servicios/get_servicios.php');
            servicios = await resServ.json();

            actualizarSelects();
        } catch (error) {
            console.error('Error cargando filtros:', error);
        }
    }

    function actualizarSelects() {
        const selectProf = document.querySelector('select[name="profesional"]');
        const selectServ = document.querySelector('select[name="servicio"]');

        selectProf.innerHTML = '<option value="">Todos los profesionales</option>';
        profesionales.forEach(prof => {
            const selected = prof.id == selectProf.dataset.selected ? 'selected' : '';
            selectProf.innerHTML += `<option value="${prof.id}" ${selected}>${prof.nombre}</option>`;
        });

        selectServ.innerHTML = '<option value="">Todos los servicios</option>';
        servicios.forEach(serv => {
            const selected = serv.nombre == selectServ.dataset.selected ? 'selected' : '';
            selectServ.innerHTML += `<option value="${serv.nombre}" ${selected}>${serv.nombre}</option>`;
        });
    }

    // Configurar eventos de los filtros
    function configurarEventosFiltros() {
        const formFiltros = document.querySelector('.filter-section form');
        const btnReset = document.querySelector('a[href="agendar_turno.php"]');
        const btnLimpiar = document.getElementById('btnLimpiarFiltros');

        formFiltros.addEventListener('submit', function (e) {
            e.preventDefault();

            // Mostrar siempre la vista mensual al aplicar filtros
            calendar.gotoDate(new Date());
            calendar.changeView('dayGridMonth');
            calendar.refetchEvents();
        });

        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', function () {
                document.querySelector('input[name="cliente"]').value = '';
                document.querySelector('select[name="profesional"]').selectedIndex = 0;
                document.querySelector('select[name="servicio"]').selectedIndex = 0;
                document.querySelector('input[name="fecha"]').value = '';

                calendar.gotoDate(new Date());
                calendar.changeView('listDay');
                calendar.refetchEvents();

                actualizarVisibilidadLimpiar();
            });
        }

        btnReset.addEventListener('click', function () {
            document.querySelector('input[name="cliente"]').value = '';
            document.querySelector('select[name="profesional"]').selectedIndex = 0;
            document.querySelector('select[name="servicio"]').selectedIndex = 0;
            document.querySelector('input[name="fecha"]').value = '';

            calendar.gotoDate(new Date());
            calendar.changeView('listDay');
            calendar.refetchEvents();
        });
    }

    // Inicializar la aplicación
    async function init() {
        await cargarDatosFiltros();
        inicializarCalendario();
        configurarEventosFiltros();
    }

    init();
});
