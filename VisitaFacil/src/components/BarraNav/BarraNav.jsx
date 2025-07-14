import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import {
  Logo,
  NavButton,
  NavContainer,
  NavLinks,
  NavSectionLeft,
  NavSectionRight,
  Saludo,
  Dropdown,
} from "./BarraNav.styles";

const BarraNav = ({ temaOscuro, setTemaOscuro }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const irASeccionCatalogo = (hash) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.location.hash = hash;
      }, 200);
    } else {
      window.location.hash = hash;
    }
  };

  return (
      <NavContainer>
        <NavSectionLeft>
          <Logo onClick={() => navigate("/")}>VisitaFácil</Logo>
          <NavLinks>
            {/* Catálogo con dropdown */}
            <Dropdown>
            <span
                onClick={() => navigate("/")}
                style={{ cursor: "pointer", userSelect: "none", fontWeight: 500 }}
            >
              Catálogo ▾
            </span>
              <div className="dropdown-content">
                <button onClick={() => irASeccionCatalogo("#casas")}>Casas</button>
                <button onClick={() => irASeccionCatalogo("#parcelas")}>Parcelas</button>
                <button onClick={() => irASeccionCatalogo("#departamentos")}>Departamentos</button>
              </div>
            </Dropdown>

            {/* Crear Agente solo visible para administradores */}
            {usuario?.rol === "ADMINISTRADOR" && (
                <Link to="/registro">Crear Agente</Link>
            )}

            <Link to="/historial">Ver Historial</Link>

            {usuario?.rol === "AGENTE" && (
                <>
                  <Link to="/agente/disponibilidad">Disponibilidad</Link>
                  <Link to="/visitas-agente">Solicitudes</Link>
                </>
            )}
          </NavLinks>
        </NavSectionLeft>

        <NavSectionRight>
          <ThemeToggle temaOscuro={temaOscuro} setTemaOscuro={setTemaOscuro} />

          {usuario ? (
              <>
                <Saludo>
                  Hola,
                  <br />
                  <strong>
                    {usuario.rol === "ADMINISTRADOR" ? "Admin" : usuario.nombre}
                  </strong>
                </Saludo>

                <NavButton as="button" onClick={logout}>
                  Cerrar Sesión
                </NavButton>
              </>
          ) : (
              <NavButton to="/login">Iniciar Sesión</NavButton>
          )}
        </NavSectionRight>
      </NavContainer>
  );
};

export default BarraNav;
