// src/components/Cargando/Cargando.styles.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #e0e0e0;
  border-top-color: #d32f2f;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Text = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #555;
`;
