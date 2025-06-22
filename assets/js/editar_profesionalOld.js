document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tablaProfesionales');
  const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
  const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));

  function cargarProfesionales() {
    fetch('get_profesionales.php')
      .then(res => res.json())
      .then(data => {
        tabla.innerHTML = '';
        data.forEach(p => {
          tabla.innerHTML += `
            <tr>
              <td class="nombre">${p.nombre}</td>
              <td class="especialidad">${p.especialidad}</td>
              <td class="color" data-color="${p.color}">
                <span class="badge" style="background-color: ${p.color};">${p.color}</span>
              </td>
              <td>
                <button class="btn btn-sm btn-warning btn-editar" data-id="${p.id_profesional}"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${p.id_profesional}" data-nombre="${p.nombre}">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          `;
        });
      });
  }

  // Delegación de eventos (como los elementos se cargan después)
  tabla.addEventListener('click', (e) => {
    const btn = e.target.closest('button');

    if (!btn) return;

    const row = btn.closest('tr');

    if (btn.classList.contains('btn-editar')) {
      const id = btn.dataset.id;
      document.getElementById('editar_id').value = id;
      document.getElementById('editar_nombre').value = row.querySelector('.nombre').innerText;
      document.getElementById('editar_especialidad').value = row.querySelector('.especialidad').innerText;
      document.getElementById('editar_color').value = row.querySelector('.color').dataset.color;
      modalEditar.show();
    }

    if (btn.classList.contains('btn-eliminar')) {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      document.getElementById('eliminar_id').value = id;
      document.getElementById('eliminar_nombre').textContent = nombre;
      modalEliminar.show();
    }
  });

  // Envío del formulario de edición con AJAX
  document.getElementById('formEditarProfesional').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const response = await fetch('modificar_profesional.php', {
      method: 'POST',
      body: formData
    });

    const res = await response.json();
    if (res.success) {
      modalEditar.hide();
      cargarProfesionales();
    } else {
      alert(res.error);
    }
  });

  // Envío del formulario de eliminación con AJAX
  document.getElementById('formEliminarProfesional').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const response = await fetch('eliminar_profesional.php', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      modalEliminar.hide();
      cargarProfesionales();
    } else {
      alert('Error: ' + result.error);
    }
  });

  // Cargar al inicio
  cargarProfesionales();
});
