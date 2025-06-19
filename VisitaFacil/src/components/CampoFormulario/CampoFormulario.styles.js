// src/componentes/campo/CampoFormulario.estilos.js
import styled from 'styled-components';

export const Contenedor = styled.div`
  margin-bottom: 1.5rem;
`;

export const Etiqueta = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;

export const Entrada = styled.input`
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.buttonBackground};
    outline: none;
  }
`;
