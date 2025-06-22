<div class="modal fade" id="modalEditarServicio" tabindex="-1">
  <div class="modal-dialog">
    <form id="formEditarServicio" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar Servicio</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="id" id="editar_id">
        <div class="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" id="editar_nombre" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Descripción</label>
          <textarea name="descripcion" id="editar_descripcion" class="form-control" required></textarea>
        </div>
        <div class="mb-3">
          <label>Activo</label>
          <select name="activo" id="editar_activo" class="form-select">
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Guardar cambios</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
