<div class="modal fade" id="modalEliminarServicio" tabindex="-1">
  <div class="modal-dialog">
    <form id="formEliminarServicio" class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">Eliminar Servicio</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="id" id="eliminar_id">
        <p>¿Estás seguro que deseas eliminar el servicio <strong id="eliminar_nombre"></strong>?</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" type="submit">Sí, eliminar</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
