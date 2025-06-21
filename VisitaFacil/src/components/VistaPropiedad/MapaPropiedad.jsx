import styled from "styled-components";

const MapaWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 350px;
  border: none;
`;

const MapaPropiedad = ({ ubicacion }) => {
    if (!ubicacion) return null;

    const url = `https://www.google.com/maps?q=${encodeURIComponent(ubicacion)}&output=embed`;

    return (
        <MapaWrapper>
            <Iframe
                src={url}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación en el mapa"
            />
        </MapaWrapper>
    );
};

export default MapaPropiedad;
