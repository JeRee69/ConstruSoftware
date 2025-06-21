// VistaPropiedad.jsx actualizado para layout centrado
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GaleriaImagenes from "../components/VistaPropiedad/GaleriaImagenes";
import PanelInformacion from "../components/VistaPropiedad/PanelInformacion";
import BloqueDescripcion from "../components/VistaPropiedad/BloqueDescripcion";
import MapaPropiedad from "../components/VistaPropiedad/MapaPropiedad";
import AgendaVisitaBox from "../components/VistaPropiedad/AgendaVisitaBox";
import Cargando from "./Cargando/Cargando.jsx";

const Pagina = styled.div`
  background-color: var(--color-secundario);
  min-height: 100vh;
  padding: 2rem;
`;

const Contenedor = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Titulo = styled.h1`
  color: var(--color-texto);
  margin-bottom: 1.5rem;
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ColPrincipal = styled.div`
  flex: 3;
  min-width: 300px;
`;

const ColLateral = styled.div`
  flex: 1;
  max-width: 380px;
  min-width: 300px;
  width: 100%;
`;

const BotonVolver = styled.button`
  background-color: transparent;
  border: 2px solid #d32f2f;
  color: #d32f2f;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d32f2f;
    color: white;
  }
`;



const VistaPropiedad = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [propiedad, setPropiedad] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/propiedades/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar la propiedad");
                return res.json();
            })
            .then((data) => {
                setPropiedad(data);
                setCargando(false);
            })
            .catch((err) => {
                setError(err.message);
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <Cargando mensaje="Cargando propiedad..." />;
    if (error || !propiedad) return <p style={{ color: "white" }}>Error: {error || "Propiedad no encontrada"}</p>;

    return (
        <Pagina>
            <Contenedor>
                <BotonVolver onClick={() => navigate("/catalogo")}>
                    ← Volver al catálogo
                </BotonVolver>
                <Titulo>{propiedad.titulo}</Titulo>
                <Layout>
                    <ColPrincipal>
                        <GaleriaImagenes imagenes={propiedad.urlsImagenes} />
                        <PanelInformacion
                            precio={propiedad.precio}
                            tipo={propiedad.tipo}
                            ubicacion={propiedad.ubicacion}
                            disponible={propiedad.disponible}
                        />
                        <BloqueDescripcion descripcion={propiedad.descripcion} />
                        <MapaPropiedad ubicacion={propiedad.ubicacion} />
                    </ColPrincipal>
                    <ColLateral>
                        <AgendaVisitaBox propiedad={propiedad} />
                    </ColLateral>
                </Layout>
            </Contenedor>
        </Pagina>
    );
};

export default VistaPropiedad;
