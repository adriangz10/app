export function Materias() {
    return (
      <div className="container">
        <div className="container text-center">
          <h1 className="mb-4">Registro de Materias</h1>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form>
              <div className="mb-3">
                <label className="form-label">Materia</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Modalidad</label>
                <select className="form-select" id="inputGroupSelect02">
                  <option selected>Seleccione...</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Hibrida">Hibrida</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Horas Semana</label>
                <select className="form-select" id="inputGroupSelect02">
                  <option selected>Seleccione...</option>
                  <option value="uno">1</option>
                  <option value="dos">2</option>
                  <option value="tres">3</option>
                  <option value="cuatro">4</option>
                  <option value="cinco">5</option>
                  <option value="seis">6</option>
                  <option value="siete">7</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Carrera</label>
                <select className="form-select" id="inputGroupSelect02">
                  <option selected>Seleccione...</option>
                  <option value="Desarrollo-web">Desarrollo web</option>
                  <option value="Programacion">Programacion</option>
                  <option value="Lic-sistemas">Lic. Sistemas</option>
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