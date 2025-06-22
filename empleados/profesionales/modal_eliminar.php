<!-- Modal: Confirmar Eliminación -->
<div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="eliminarLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form id="formEliminarProfesional" class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="eliminarLabel">Eliminar Profesional</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body">
        <input type="hidden" name="id" id="eliminar_id">
        <p>¿Estás seguro que deseas eliminar al profesional <strong id="eliminar_nombre"></strong>?</p>

        <!-- ✅ Mensaje de error visible solo si hay fallo -->
        <div id="errorEliminar" class="alert alert-danger d-none mt-3" role="alert"></div>
      </div>

      <div class="modal-footer">
        <button type="submit" id="btnConfirmarEliminar" class="btn btn-danger">Sí, eliminar</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
