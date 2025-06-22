document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tablaServicios');
  const modalEditar = new bootstrap.Modal(document.getElementById('modalEditarServicio'));
  const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminarServicio'));

  function cargarServicios() {
    fetch('get_servicios.php')
      .then(res => res.json())
      .then(data => {
        tabla.innerHTML = '';
        data.forEach(s => {
          tabla.innerHTML += `
            <tr>
              <td class="nombre">${s.nombre}</td>
              <td class="descripcion">${s.descripcion}</td>
              <td class="activo">${s.activo == 1 ? 'Sí' : 'No'}</td>
              <td>
                <button class="btn btn-sm btn-warning btn-editar" data-id="${s.id}"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${s.id}" data-nombre="${s.nombre}"><i class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          `;
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
          btn.addEventListener('click', function () {
            const row = this.closest('tr');
            document.getElementById('editar_id').value = this.dataset.id;
            document.getElementById('editar_nombre').value = row.querySelector('.nombre').innerText;
            document.getElementById('editar_descripcion').value = row.querySelector('.descripcion').innerText;
            document.getElementById('editar_activo').value = row.querySelector('.activo').innerText === 'Sí' ? '1' : '0';
            modalEditar.show();
          });
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
          btn.addEventListener('click', function () {
            document.getElementById('eliminar_id').value = this.dataset.id;
            document.getElementById('eliminar_nombre').textContent = this.dataset.nombre;
            modalEliminar.show();
          });
        });
      });
  }

  cargarServicios();

  document.getElementById('formEditarServicio').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const response = await fetch('modificar_servicio.php', {
      method: 'POST',
      body: formData
    });

    const res = await response.json();
    if (res.success) {
      modalEditar.hide();
      cargarServicios();
    } else {
      alert(res.error);
    }
  });

  document.getElementById('formEliminarServicio').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const response = await fetch('eliminar_servicio.php', {
      method: 'POST',
      body: formData
    });

    const res = await response.json();
    if (res.success) {
      modalEliminar.hide();
      cargarServicios();
    } else {
      alert(res.error);
    }
  });
});
