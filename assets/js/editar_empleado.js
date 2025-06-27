document.addEventListener("DOMContentLoaded", () => {
  const formEditar = document.querySelector("#formEditarEmpleado");

  if (formEditar) {
    formEditar.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(formEditar);

      fetch("editar_empleado.php", {
        method: "POST",
        body: formData
      })
        .then(res => res.text())
        .then(data => {
          if (data.trim() === "ok") {
            SkinLabsUI.showNotification("Empleado actualizado correctamente", "success");

            const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditar"));
            modal.hide();

            loadEmployeesWithEffects();
          } else {
            SkinLabsUI.showNotification("Error: " + data, "error");
          }
        })
        .catch(err => {
          console.error("Error al editar empleado:", err);
          SkinLabsUI.showNotification("Error de red al editar", "error");
        });
    });
  }
});

