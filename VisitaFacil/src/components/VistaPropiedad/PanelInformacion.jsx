import styled from "styled-components";

const PanelWrapper = styled.div`
  background-color: var(--color-fondo-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

const InfoItem = styled.div`
  flex: 1 1 120px;
  text-align: center;
`;

const Label = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.3rem;
`;

const Valor = styled.div`
  font-size: 1.2rem;

  color: var(--color-texto);
`;

const TituloPanel = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-texto);
  width: 100%;
  margin-bottom: 0.5rem;
`;

const PanelInformacion = ({ precio, tipo, ubicacion, disponible }) => {
    return (
        <PanelWrapper>
            <TituloPanel>Información General</TituloPanel>
            <InfoItem>
                <Label>Precio</Label>
                <Valor>${precio}</Valor>
            </InfoItem>
            <InfoItem>
                <Label>Tipo</Label>
                <Valor>{tipo}</Valor>
            </InfoItem>
            <InfoItem>
                <Label>Ubicación</Label>
                <Valor>{ubicacion}</Valor>
            </InfoItem>
            <InfoItem>
                <Label>Disponible</Label>
                <Valor>{disponible ? "Sí" : "No"}</Valor>
            </InfoItem>
        </PanelWrapper>
    );
};
export default PanelInformacion;
