// BloqueDescripcion.jsx
import styled from "styled-components";

const DescripcionWrapper = styled.div`
  background-color: var(--color-fondo-card);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const Titulo = styled.h2`
  font-size: 1.4rem;
  color: var(--color-texto);
  margin-bottom: 1rem;
`;

const Texto = styled.p`
  color: var(--color-texto);
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-line;
`;

const BloqueDescripcion = ({ descripcion }) => {
    return (
        <DescripcionWrapper>
            <Titulo>Descripción de la propiedad</Titulo>
            <Texto>{descripcion}</Texto>
        </DescripcionWrapper>
    );
};

export default BloqueDescripcion;