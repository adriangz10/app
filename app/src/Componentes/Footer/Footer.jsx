export function Footer() {
  return (
    <div className="container mt-5">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Juan Ignacio Núñez
            </a>
          </li>
          <li className="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Adrián Alberto Gómez
            </a>
          </li>
          <li className="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Mario Ismael López
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">
          &copy; UNER FCAD 2023. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}