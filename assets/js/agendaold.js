document.addEventListener('DOMContentLoaded', function() {
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
            events: function(fetchInfo, successCallback, failureCallback) {
                cargarEventos(fetchInfo)
                    .then(successCallback)
                    .catch(failureCallback);
            },
            eventDataTransform: function(eventData) {
                console.log('Evento recibido:', eventData);
                return eventData;
            },
            eventClick: function(info) {
                mostrarDetalleTurno(info);
            }
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
            fecha: document.querySelector('input[name="fecha"]').value || ''
        });

        const response = await fetch(`get_turnos.php?${params}`);
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
            // Cargar profesionales
            const resProf = await fetch('get_profesionales.php');
            profesionales = await resProf.json();
            
            // Cargar servicios
            const resServ = await fetch('get_servicios.php');
            servicios = await resServ.json();
            
            // Actualizar selects
            actualizarSelects();
        } catch (error) {
            console.error('Error cargando filtros:', error);
        }
    }

    // Actualizar los selects con los datos cargados
    function actualizarSelects() {
        const selectProf = document.querySelector('select[name="profesional"]');
        const selectServ = document.querySelector('select[name="servicio"]');
        
        // Profesionales
        selectProf.innerHTML = '<option value="">Todos los profesionales</option>';
        profesionales.data.forEach(prof => {
            const selected = prof.id == selectProf.dataset.selected ? 'selected' : '';
            selectProf.innerHTML += `<option value="${prof.id}" ${selected}>${prof.nombre}</option>`;
        });
        
        // Servicios
        selectServ.innerHTML = '<option value="">Todos los servicios</option>';
        servicios.data.forEach(serv => {
            const selected = serv.nombre == selectServ.dataset.selected ? 'selected' : '';
            selectServ.innerHTML += `<option value="${serv.nombre}" ${selected}>${serv.nombre}</option>`;
        });
    }

    // Configurar eventos de los filtros
    function configurarEventosFiltros() {
        const formFiltros = document.querySelector('.filter-section form');
        const btnReset = document.querySelector('a[href="agendar_turno.php"]');
        
        formFiltros.addEventListener('submit', function(e) {
            e.preventDefault();
            calendar.refetchEvents();
        });
        
        btnReset.addEventListener('click', function(e) {
            if (!confirm('¿Restablecer todos los filtros?')) {
                e.preventDefault();
                return;
            }
            // El href natural del enlace hará el reset
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