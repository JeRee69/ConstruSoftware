import { useState } from "react";
import styled from "styled-components";

const GaleriaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImagenPrincipal = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
`;

const Miniaturas = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Miniatura = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.activa ? "#d32f2f" : "transparent")};
  transition: border 0.2s;

  &:hover {
    border: 2px solid #d32f2f;
  }
`;

const GaleriaImagenes = ({ imagenes = [] }) => {
    const [actual, setActual] = useState(0);

    if (imagenes.length === 0) return <p>No hay imágenes disponibles.</p>;

    return (
        <GaleriaWrapper>
            <ImagenPrincipal src={imagenes[actual]} alt={`Imagen ${actual + 1}`} />
            <Miniaturas>
                {imagenes.map((url, index) => (
                    <Miniatura
                        key={index}
                        src={url.trim()}
                        activa={index === actual}
                        onClick={() => setActual(index)}
                        onError={(e) => (e.target.src = "/imagen-no-disponible.png")}
                    />
                ))}
            </Miniaturas>
        </GaleriaWrapper>
    );
};

export default GaleriaImagenes;
