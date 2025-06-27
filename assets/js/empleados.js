// empleados.js

document.addEventListener("DOMContentLoaded", () => {
  SkinLabsUI.initializeSkinLabsUI("Cargando gestión de empleados...");
  loadEmployeesWithEffects();

  // Envío del formulario de eliminación
  const formEliminar = document.querySelector("#formEliminarEmpleado");
  if (formEliminar) {
    formEliminar.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.querySelector("#delete_id").value;

      const formData = new FormData();
      formData.append("id", id);

      fetch("eliminar_empleado.php", {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            deleteEmployeeWithEffects(id);

            // ✅ Cerrar modal manualmente
            const modalElement = document.getElementById("modalEliminar");
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            document.body.classList.remove("modal-open");
            document.querySelector(".modal-backdrop")?.remove();

          } else {
            SkinLabsUI.showNotification("Error al eliminar: " + data.error, "error");
          }
        })


        .catch(error => {
          console.error("Error en eliminación:", error);
          SkinLabsUI.showNotification("Error de conexión al eliminar", "error");
        });
    });
  }
});

function loadEmployeesWithEffects() {
  const tbody = document.querySelector("#tablaEmpleados");
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="3" class="text-center">
        <div class="loading-spinner mx-auto mb-2"></div>
        <div>Cargando empleados...</div>
      </td>
    </tr>
  `;

  fetch("get_empleados.php")
    .then(res => res.json())
    .then(empleados => {
      tbody.innerHTML = "";
      if (empleados.length === 0) {
        tbody.innerHTML = `
          <tr><td colspan="3" class="text-center text-muted">No hay empleados registrados.</td></tr>
        `;
        return;
      }

      empleados.forEach(empleado => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${empleado.id}</td>
          <td>${empleado.usuario}</td>
          <td>
            <button class="btn btn-primary btn-editar" data-id="${empleado.id}" data-usuario="${empleado.usuario}">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-danger btn-eliminar" data-id="${empleado.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        row.dataset.id = empleado.id;
        tbody.appendChild(row);
      });

      // Botones de editar
      document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const usuario = btn.dataset.usuario;

          document.querySelector("#edit_id").value = id;
          document.querySelector("#edit_usuario").value = usuario;
          const modal = new bootstrap.Modal(document.getElementById("modalEditar"));
          modal.show();
        });
      });

      // Botones de eliminar
      document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          document.querySelector("#delete_id").value = id;
          const modal = new bootstrap.Modal(document.getElementById("modalEliminar"));
          modal.show();
        });
      });
    })
    .catch(error => {
      tbody.innerHTML = `<tr><td colspan="3" class="text-danger text-center">Error al cargar empleados</td></tr>`;
      console.error("Error al cargar empleados:", error);
    });
}

function addEmployeeWithEffects(data) {
  SkinLabsUI.showNotification("Agregando nuevo empleado...", "info");
  setTimeout(() => {
    SkinLabsUI.showNotification("Empleado agregado exitosamente", "success");
    loadEmployeesWithEffects();
  }, 1000);
}

function editEmployeeWithEffects(id, data) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) row.classList.add("loading-row");

  SkinLabsUI.showNotification("Actualizando empleado...", "info");

  setTimeout(() => {
    if (row) {
      row.classList.remove("loading-row");
      row.classList.add("success-glow");
      setTimeout(() => row.classList.remove("success-glow"), 2000);
    }
    SkinLabsUI.showNotification("Empleado actualizado exitosamente", "success");
    loadEmployeesWithEffects();
  }, 1000);
}

function deleteEmployeeWithEffects(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) {
    row.style.animation = "errorShake 0.5s ease-in-out";
    setTimeout(() => {
      row.style.animation = "fadeOut 0.5s ease-out forwards";
      setTimeout(() => {
        row.remove();
        SkinLabsUI.showNotification("Empleado eliminado exitosamente", "success");
      }, 500);
    }, 500);
  }
}
