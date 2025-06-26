import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Boton,
  Campo,
  EnlaceRegistro,
  Entrada,
  Etiqueta,
  LoginContainer,
  LoginForm,
  Logo,
  MensajeError,
} from "./Login.styles.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            accountId: data.accountId,
            rol: data.rol,
            nombre: data.nombre,
            correo: data.email, // agregado correo
            telefono: data.telefono, // agregado telefono
          })
        );

        switch (data.rol) {
          case "ADMINISTRADOR":
            navigate("/catalogo");
            break;
          case "AGENTE":
            navigate("/agente/disponibilidad");
            break;
          default:
            navigate("/catalogo");
        }
      } else if (response.status === 401) {
        setError("Credenciales incorrectas. Por favor, intente nuevamente.");
      } else {
        setError("Error inesperado. Intente más tarde.");
      }
    } catch {
      setError("Ocurrió un error al iniciar sesión. Intente más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Logo>VisitaFácil</Logo>
        <form onSubmit={handleSubmit}>
          <Campo>
            <Etiqueta htmlFor="email">Correo Electrónico</Etiqueta>
            <Entrada
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="correo@ejemplo.com"
            />
          </Campo>

          <Campo>
            <Etiqueta htmlFor="password">Contraseña</Etiqueta>
            <Entrada
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </Campo>

          <Boton type="submit" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Boton>

          {error && <MensajeError>{error}</MensajeError>}

          <EnlaceRegistro>
            ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
          </EnlaceRegistro>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
