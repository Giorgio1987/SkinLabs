<div class="modal fade" id="modalAgregar" tabindex="-1">
  <div class="modal-dialog">
    <form action="agregar_profesional.php" method="POST" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Profesional</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Especialidad</label>
          <input type="text" name="especialidad" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Color</label>
          <input type="color" name="color" class="form-control form-control-color" value="#6c757d" required>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Guardar</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
