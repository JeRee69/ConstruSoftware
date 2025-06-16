// src/views/Catalogo/Catalogo.styles.js
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  min-height: 100vh;
  width: 100vw;
  padding: 40px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #f9f9f9;
  padding: 2rem;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;
