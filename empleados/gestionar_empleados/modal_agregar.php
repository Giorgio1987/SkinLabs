<div class="modal fade" id="modalAgregar" tabindex="-1">
  <div class="modal-dialog">
    <form action="agregar_empleado.php" method="POST" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Empleado</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label>Usuario</label>
          <input type="text" name="usuario" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Contraseña</label>
          <input type="password" name="clave" class="form-control" required>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Guardar</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
