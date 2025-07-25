// src/vistas/login/login.estilos.js
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: var(--color-secundario);
`;

export const LoginForm = styled.div`
  background-color: var(--color-fondo-card);
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--color-sombra);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const ToggleButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  padding: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 1rem;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.inputBackground};
  }
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primario);
  font-size: 1.8rem;
  font-weight: bold;
`;

export const Campo = styled.div`
  margin-bottom: 1.5rem;
`;

export const Etiqueta = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-texto);
  font-size: 0.9rem;
`;

export const Entrada = styled.input`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-fondo-card);
  color: var(--color-texto);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: var(--color-primario);
    outline: none;
  }
`;

export const Boton = styled.button`
  width: 100%;
  padding: 0.9rem 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  background-color: var(--color-primario);
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

export const MensajeError = styled.div`
  color: #d32f2f;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

export const EnlaceRegistro = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--color-texto);

  a {
    color: var(--color-primario);
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
