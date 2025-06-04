import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
`;

const LoginForm = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  display: flex; /* 👈 Centra verticalmente el contenido */
  flex-direction: column;
  justify-content: center;
`;


const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: #d32f2f;
  font-size: 1.8rem;
  font-weight: bold;
`;

const InputField = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #616161;
  font-size: 0.9rem;
`;

const Input = styled.input`
  box-sizing: border-box; /* 👈 Asegura que width incluya padding y border */
  width: 100%;
  padding: 0.8rem;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #d32f2f;
    outline: none;
  }
`;

const Button = styled.button`
  box-sizing: border-box; /* 👈 Igual que en inputs */
  width: 100%;
  padding: 0.9rem 1rem; /* 👈 Un poco más alto */
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #b71c1c;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;


const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #616161;

  a {
    color: #d32f2f;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.3rem;
    transition: color 0.2s;

    &:hover {
      color: #b71c1c;
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
        const data = await response.json();
        const accountId = data.accountId;

        // Guardar datos si es necesario
        // localStorage.setItem('accountId', accountId);

        // Redirigir según tipo de usuario
        if (email.includes('@corredora')) {
          navigate('/agenda');
        } else {
          navigate('/catalogo');
        }
      } else if (response.status === 401) {
        setError('Credenciales incorrectas. Por favor, intente nuevamente.');
      } else {
        setError('Error inesperado. Intente más tarde.');
      }
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión. Intente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Logo>VisitaFácil</Logo>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <InputField>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="correo@ejemplo.com"
            />
          </InputField>

          <InputField>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </InputField>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <RegisterLink>
            ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
          </RegisterLink>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
