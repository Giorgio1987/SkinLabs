document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tablaProfesionales');
  const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));

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
                <button class="btn btn-sm btn-warning btn-editar" data-id="${p.id}"><i class="bi bi-pencil-fill"></i></button>
                <a href="eliminar_profesional.php?id=${p.id}" class="btn btn-sm btn-danger" onclick="return confirm('¿Eliminar?')">
                  <i class="bi bi-trash-fill"></i>
                </a>
              </td>
            </tr>
          `;
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
          btn.addEventListener('click', e => {
            const row = btn.closest('tr');
            document.getElementById('editar_id').value = btn.dataset.id;
            document.getElementById('editar_nombre').value = row.querySelector('.nombre').innerText;
            document.getElementById('editar_especialidad').value = row.querySelector('.especialidad').innerText;
            document.getElementById('editar_color').value = row.querySelector('.color').dataset.color;
            modalEditar.show();
          });
        });
      });
  }

  cargarProfesionales();

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
});
