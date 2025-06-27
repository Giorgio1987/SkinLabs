<div class="modal fade" id="modalEditar" tabindex="-1">
  <div class="modal-dialog">
    <form action="editar_empleado.php" method="POST" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar Empleado</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="id" id="edit_id">
        <div class="mb-3">
          <label for="edit_usuario">Usuario</label>
          <input type="text" name="usuario" id="edit_usuario" class="form-control" required>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Guardar Cambios</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
