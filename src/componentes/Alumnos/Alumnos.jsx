import React, { Fragment, useState } from "react";

export function Alumnos() {
  const [datos, setDatos] = useState({
    documento: "",
    apellido: "",
    nombre: "",
    nacimiento: "",
    pais: "",
    email: "",
    celular: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const mostrarAlerta = (event) => {
    event.preventDefault();
    alert(
      "Nombre: " +
        datos.nombre +
        "\nApellido: " +
        datos.apellido +
        "\nDNI: " +
        datos.documento +
        "\nFecha de nacimiento: " +
        datos.nacimiento +
        "\nLugar de nacimeinto: " +
        datos.pais +
        "\nEmail: " +
        datos.email +
        "\nCelular: " +
        datos.celular
    );
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h1 className="mb-4">Registro de Alumnos</h1>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Fragment>
            <form>
              <div className="mb-3">
                <label className="form-label">Documento</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  name="documento"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  name="apellido"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  name="nombre"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={handleInputChange}
                  name="nacimiento"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pais</label>
                <select
                  class="form-select"
                  id="inputGroupSelect02"
                  onChange={handleInputChange}
                  name="pais"
                >
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
                <input
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Celular</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  name="celular"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={mostrarAlerta}
              >
                Enviar
              </button>
            </form>
          </Fragment>
        </div>
      </div>
    </div>
  );
}
