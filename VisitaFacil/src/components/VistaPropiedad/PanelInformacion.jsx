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

const Input = styled.input`
  width: 80%;
  margin: 0 auto;
  padding: 0.4rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  text-align: center;
  display: block;
  font-family: inherit;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Select = styled.select`
  width: 80%;
  margin: 0 auto;
  padding: 0.4rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  text-align: center;
  display: block;
  font-family: inherit;
`;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 26px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4caf50;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 26px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const formatearConPuntos = (valor) => {
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const quitarPuntos = (valor) => {
    return valor.replace(/\./g, "");
};

const PanelInformacion = ({ precio, tipo, ubicacion, disponible, modoEdicion, onChange }) => {
    const manejarCambioPrecio = (e) => {
        const valorSinPuntos = quitarPuntos(e.target.value);
        const numero = parseInt(valorSinPuntos);
        if (!isNaN(numero) && numero <= 10000000000) {
            onChange("precio", numero);
        } else if (e.target.value === "") {
            onChange("precio", 0);
        }
    };

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const esAdmin = usuario?.rol === "ADMINISTRADOR";

    return (
        <PanelWrapper>
            <TituloPanel>Información General</TituloPanel>

            <InfoItem>
                <Label>Precio</Label>
                {modoEdicion ? (
                    <Input
                        type="text"
                        value={formatearConPuntos(precio)}
                        onChange={manejarCambioPrecio}
                    />
                ) : (
                    <Valor>${formatearConPuntos(precio)}</Valor>
                )}
            </InfoItem>

            <InfoItem>
                <Label>Tipo</Label>
                {modoEdicion ? (
                    <Select value={tipo} onChange={(e) => onChange("tipo", e.target.value)}>
                        <option value="Casa">Casa</option>
                        <option value="Parcela">Parcela</option>
                        <option value="Departamento">Departamento</option>
                    </Select>
                ) : (
                    <Valor>{tipo}</Valor>
                )}
            </InfoItem>

            <InfoItem>
                <Label>Ubicación</Label>
                {modoEdicion ? (
                    <Input
                        value={ubicacion}
                        onChange={(e) => onChange("ubicacion", e.target.value)}
                    />
                ) : (
                    <Valor>{ubicacion}</Valor>
                )}
            </InfoItem>

            {esAdmin && (
                <InfoItem>
                    <Label>Disponible</Label>
                    {modoEdicion ? (
                        <SwitchContainer>
                            <SwitchInput
                                type="checkbox"
                                checked={disponible}
                                onChange={(e) => onChange("disponible", e.target.checked)}
                            />
                            <Slider />
                        </SwitchContainer>
                    ) : (
                        <Valor>{disponible ? "Sí" : "No"}</Valor>
                    )}
                </InfoItem>
            )}
        </PanelWrapper>
    );
};

export default PanelInformacion;
