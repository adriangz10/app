export function Alumnos() {
  return (
    <div className="container">
      <div className="container text-center">
        <h1 className="mb-4">Registro de Alumnos</h1>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Documento</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de Nacimiento</label>
              <input type="date" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Pais</label>
              <select class="form-select" id="inputGroupSelect02">
                <option selected>Seleccione...</option>
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brasil">Brasil</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Honduras">Honduras</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Celular</label>
              <input type="text" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
