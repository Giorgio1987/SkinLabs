document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
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
        slotMinHeight: 80, // en píxeles

        
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        },


        // Configuración de eventos
        events: {
            url: './get_turnos.php?getTurnos=1',
            method: 'GET',
            extraParams: {
                cacheBuster: new Date().getTime()
            },
            failure: function (error) {
                console.error('Error al cargar eventos:', error);
                alert('Error al cargar los turnos. Ver consola para detalles.');
            }
        },


        // Para depuración
        eventDataTransform: function (eventData) {
            console.log('Evento recibido:', eventData);
            return eventData;
        },

        eventClick: function (info) {
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
    });

    calendar.render();


});