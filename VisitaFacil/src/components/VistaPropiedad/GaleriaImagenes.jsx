// ✅ GaleriaImagenes.jsx con control de índice al eliminar imágenes
import { useRef, useState, useEffect } from "react";
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

const ImagenPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Miniaturas = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const MiniaturaWrapper = styled.div`
  position: relative;
  display: inline-block;
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

const MiniaturaPlaceholder = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.75rem;
  border: 1px dashed #ccc;
`;

const BotonEliminar = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #d32f2f;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 0.75rem;
  padding: 4px 6px;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);

  &:hover {
    background: #b71c1c;
  }
`;

const AgregarImagen = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  background-color: #f9f9f9;
  border: 2px dashed #aaa;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #eee;
    border-color: #777;
  }
`;

const GaleriaImagenes = ({ imagenes = [], imagenesNuevas = [], modoEdicion = false, onEliminarImagen = () => {}, onEliminarImagenNueva = () => {}, onAgregarImagen = () => {} }) => {
    const [actual, setActual] = useState(0);
    const inputRef = useRef();

    const previews = imagenesNuevas.map(file => URL.createObjectURL(file));
    const todas = [...imagenes, ...previews];
    const hayImagenes = todas.length > 0;

    useEffect(() => {
        if (todas.length === 0) {
            setActual(0);
        } else if (actual >= todas.length) {
            setActual(todas.length - 1);
        }
    }, [todas, actual]);

    const handleAgregarClick = () => {
        if (inputRef.current) inputRef.current.click();
    };

    const handleInputChange = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            onAgregarImagen(archivo);
        }
    };

    return (
        <GaleriaWrapper>
            {hayImagenes ? (
                <ImagenPrincipal src={todas[actual]} alt={`Imagen ${actual + 1}`} />
            ) : (
                <ImagenPlaceholder>Sin imagen</ImagenPlaceholder>
            )}

            <Miniaturas>
                {todas.map((url, index) => (
                    <MiniaturaWrapper key={index}>
                        <Miniatura
                            src={url}
                            activa={index === actual}
                            onClick={() => setActual(index)}
                        />
                        {modoEdicion && (
                            <BotonEliminar
                                onClick={() =>
                                    index < imagenes.length
                                        ? onEliminarImagen(url)
                                        : onEliminarImagenNueva(index - imagenes.length)
                                }
                            >
                                ×
                            </BotonEliminar>
                        )}
                    </MiniaturaWrapper>
                ))}

                {modoEdicion && (
                    <>
                        <AgregarImagen onClick={handleAgregarClick}>+</AgregarImagen>
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            style={{ display: "none" }}
                            onChange={handleInputChange}
                        />
                    </>
                )}
            </Miniaturas>
        </GaleriaWrapper>
    );
};

export default GaleriaImagenes;
