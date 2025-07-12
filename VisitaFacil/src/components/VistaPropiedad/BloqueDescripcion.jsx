import styled from "styled-components";

const PanelWrapper = styled.div`
  background-color: var(--color-fondo-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
`;

const TituloPanel = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-texto);
  margin-bottom: 1rem;
`;

const Valor = styled.p`
  font-size: 1rem;
  color: var(--color-texto);
  white-space: pre-line;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
`;

const BloqueDescripcion = ({ descripcion, modoEdicion, onChange }) => {
    return (
        <PanelWrapper>
            <TituloPanel>Descripción</TituloPanel>
            {modoEdicion ? (
                <TextArea
                    value={descripcion}
                    onChange={(e) => onChange("descripcion", e.target.value)}
                />
            ) : (
                <Valor>{descripcion}</Valor>
            )}
        </PanelWrapper>
    );
};

export default BloqueDescripcion;
