export function Carreras() {
  return (
    <div className="container">
      <div className="container text-center">
        <h1 className="mb-4">Registro de Carreras</h1>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select class="form-select" id="inputGroupSelect02">
                <option selected>Seleccione...</option>
                <option value="Diplomatura">Diplomatura</option>
                <option value="Pregrado">Carrera de Pregrado</option>
                <option value="A-termino">Carrera de Pregrado a termino</option>
                <option value="Grado">Carrera de Grado</option>
                <option value="Posgrado">Carrera de Posgrado</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Duracion</label>
              <select class="form-select" id="inputGroupSelect02">
                <option selected>Seleccione...</option>
                <option value="3-cuatris">3 Cuatrimestres</option>
                <option value="3-semestres">3 Semestres</option>
                <option value="6-meses">6 Meses</option>
                <option value="10-meses">10 Meses</option>
                <option value="3-años">3 Años</option>
                <option value="4-años">4 Años</option>
                <option value="5-años">5 Años</option>
              </select>
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
