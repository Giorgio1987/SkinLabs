<div class="modal fade" id="modalEditar" tabindex="-1">
  <div class="modal-dialog">
    <form id="formEditarProfesional" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar Profesional</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="id" id="editar_id">
        <div class="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" id="editar_nombre" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Especialidad</label>
          <input type="text" name="especialidad" id="editar_especialidad" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Color</label>
          <input type="color" name="color" id="editar_color" class="form-control form-control-color" required>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Guardar cambios</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
