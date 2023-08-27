export function Inscripciones() {
  return (
    <div className="container">
      <div className="container text-center">
        <h1 className="mb-4">Inscripcion de Alumnos</h1>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Alumno</label>
              <select class="form-select" id="inputGroupSelect02">
                <option selected>Seleccione...</option>
                <option value="dni">38545266</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Carrera</label>
              <select class="form-select" id="inputGroupSelect02">
                <option selected>Seleccione...</option>
                <option value="carrera">Desarrollo Web</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Materia</label>
              <select class="form-select" id="inputGroupSelect02">
                <option selected>Seleccione...</option>
                <option value="Mate">Matematica</option>
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
