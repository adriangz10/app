export function Contacto() {
  return (
    <div className="container mt-5">
      <div className="textBody">
        <h1 className="text-center">Informacion de Contacto</h1>
        <div style={{ marginLeft: "1%" }}>
          <div style={{ marginRight: "1%" }}>
            <p align="center">
              Monseñor Tavella 1424. Concordia. CP(3200).
              <br />
              Provincia de Entre Ríos
              <br />
              Teléfono: (+54) (345) 4231400
              <br />
              Fax: (+54) (345) 4231410
              <br />
              E-mail:{" "}
              <a className="linkText" href="mailto:informes.fcad@uner.edu.ar">
                informes.fcad@uner.edu.ar
              </a>
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
