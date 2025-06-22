<div class="modal fade" id="modalAgregarServicio" tabindex="-1">
  <div class="modal-dialog">
    <form class="modal-content" action="agregar_servicio.php" method="POST">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Servicio</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Descripción</label>
          <textarea name="descripcion" class="form-control" required></textarea>
        </div>
        <div class="mb-3">
          <label>Activo</label>
          <select name="activo" class="form-select">
            <option value="1" selected>Sí</option>
            <option value="0">No</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Guardar</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
