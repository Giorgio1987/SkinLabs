<div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="modalEliminarEmpleadoLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form id="formEliminarEmpleado" method="POST">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="modalEliminarEmpleadoLabel">Eliminar Empleado</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" name="id" id="delete_id">
          <p>¿Estás seguro de que deseas eliminar este empleado?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </form>
  </div>
</div>
