// src/vistas/registro/registro.estilos.js
import styled from 'styled-components';

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
`;

export const RegisterForm = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: #d32f2f;
  font-size: 1.8rem;
  font-weight: bold;
`;

export const InputField = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #616161;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #d32f2f;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #d32f2f;
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
