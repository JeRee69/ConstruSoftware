// src/vistas/adminCatalogo/adminCatalogo.estilos.js
import styled from "styled-components";

export const ContenedorPagina = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
`;

export const Contenedor = styled.div`
  width: 100%;
  max-width: 1200px;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
`;

export const Titulo = styled.h1`
  color: #b71c1c;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.2rem;
`;

export const MensajeError = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;

// 💥 AGREGA ESTE BLOQUE
export const GridTarjetas = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;