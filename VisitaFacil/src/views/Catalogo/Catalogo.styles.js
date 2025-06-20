import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--color-secundario);
  min-height: 100vh;
  width: 100vw;
  padding: 40px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: var(--color-fondo-card);
  padding: 2rem;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px var(--color-sombra);
  color: var(--color-texto);
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: var(--color-texto);
  text-align: center;
  font-size: 2rem;
`;

export const BotonIcono = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  font-size: 1.6rem;
  color: #1c1f2a;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #d32f2f;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;
