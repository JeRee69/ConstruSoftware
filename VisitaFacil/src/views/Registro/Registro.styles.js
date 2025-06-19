// src/vistas/registro/registro.estilos.js
import styled from 'styled-components';

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: var(--color-secundario);
  margin: 0;
  padding: 0;
`;

export const RegisterForm = styled.div`
  background-color: var(--color-fondo-card);
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--color-sombra);
  width: 100%;
  max-width: 400px;
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primario);
  font-size: 1.8rem;
  font-weight: bold;
`;

export const InputField = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-texto);
  font-size: 0.9rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--color-fondo-card);
  color: var(--color-texto);
  transition: border-color 0.3s;
  &:focus {
    border-color: var(--color-primario);
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-primario);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #b71c1c;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

export const LoginLink = styled.div`
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
