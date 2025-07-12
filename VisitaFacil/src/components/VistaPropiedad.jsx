import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GaleriaImagenes from "../components/VistaPropiedad/GaleriaImagenes";
import PanelInformacion from "../components/VistaPropiedad/PanelInformacion";
import BloqueDescripcion from "../components/VistaPropiedad/BloqueDescripcion";
import MapaPropiedad from "../components/VistaPropiedad/MapaPropiedad";
import AgendaVisitaBox from "../components/VistaPropiedad/AgendaVisitaBox";
import Cargando from "./Cargando/Cargando.jsx";
import Swal from "sweetalert2";

const Pagina = styled.div`
  background-color: var(--color-secundario);
  min-height: 100vh;
  padding: 2rem;
`;

const Contenedor = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const BotoneraSuperior = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderTitulo = styled.div`
  margin-bottom: 1.5rem;
`;

const Titulo = styled.h1`
  color: var(--color-texto);
  font-size: 1.8rem;
  line-height: 1.2;
  margin: 0;
`;

const TituloInput = styled.input`
  max-width: 600px;
  height: 48px;
  padding: 0 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  flex-grow: 1;
  box-sizing: border-box;
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
  border: 2px solid #006e75;
  color: #006e75;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #006e75;
    color: white;
  }
`;

const VistaPropiedad = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [propiedad, setPropiedad] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [imagenesNuevas, setImagenesNuevas] = useState([]);
    const [imagenesEliminadas, setImagenesEliminadas] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/propiedades/${id}`)
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

    const guardarCambios = async () => {
        try {
            Swal.fire({
                title: 'Guardando...',
                text: 'Espere un momento mientras se guardan los cambios.',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const nuevaProp = {
                ...propiedad,
                urlsImagenes: undefined,
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/propiedades/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaProp),
            });

            if (!response.ok) throw new Error("Error al guardar cambios básicos");

            for (const url of imagenesEliminadas) {
                await fetch(`${import.meta.env.VITE_API_URL}/propiedades/${id}/imagenes?url=${encodeURIComponent(url)}`, {
                    method: "DELETE",
                });
            }

            if (imagenesNuevas.length > 0) {
                const formData = new FormData();
                imagenesNuevas.forEach((file) => formData.append("imagenes", file));
                await fetch(`${import.meta.env.VITE_API_URL}/propiedades/${id}/imagenes`, {
                    method: "POST",
                    body: formData,
                });
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/propiedades/${id}`);
            const dataActualizada = await res.json();
            setPropiedad(dataActualizada);
            setModoEdicion(false);
            setImagenesEliminadas([]);
            setImagenesNuevas([]);
            Swal.close();
            Swal.fire("¡Listo!", "Los cambios han sido guardados.", "success");
        } catch (err) {
            Swal.close();
            Swal.fire("Error", err.message, "error");
        }
    };

    const actualizarCampo = (campo, valor) => {
        setPropiedad((prev) => ({ ...prev, [campo]: valor }));
    };

    const eliminarImagen = (url) => {
        setPropiedad((prev) => ({
            ...prev,
            urlsImagenes: prev.urlsImagenes.filter((img) => img !== url),
        }));
        setImagenesEliminadas((prev) => [...prev, url]);
    };

    const eliminarImagenNueva = (index) => {
        setImagenesNuevas((prev) => prev.filter((_, i) => i !== index));
    };

    const agregarImagen = (file) => {
        setImagenesNuevas((prev) => [...prev, file]);
    };

    const confirmarVolver = () => {
        if (modoEdicion) {
            Swal.fire({
                title: '¿Deseas salir sin guardar?',
                text: 'Perderás los cambios realizados.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) navigate("/catalogo");
            });
        } else {
            navigate("/catalogo");
        }
    };

    if (cargando) return <Cargando mensaje="Cargando propiedad..." />;
    if (error || !propiedad) return <p style={{ color: "white" }}>Error: {error || "Propiedad no encontrada"}</p>;

    return (
        <Pagina>
            <Contenedor>
                <BotoneraSuperior>
                    <BotonVolver onClick={confirmarVolver}>← Volver al catálogo</BotonVolver>
                    {usuario?.rol === "ADMINISTRADOR" && (
                        modoEdicion ? (
                            <BotonVolver onClick={guardarCambios}>Guardar cambios</BotonVolver>
                        ) : (
                            <BotonVolver onClick={() => setModoEdicion(true)}>Editar propiedad</BotonVolver>
                        )
                    )}
                </BotoneraSuperior>

                <HeaderTitulo>
                    {modoEdicion ? (
                        <TituloInput
                            value={propiedad.titulo}
                            onChange={(e) => actualizarCampo("titulo", e.target.value)}
                        />
                    ) : (
                        <Titulo>{propiedad.titulo}</Titulo>
                    )}
                </HeaderTitulo>

                <Layout>
                    <ColPrincipal>
                        <GaleriaImagenes
                            imagenes={propiedad.urlsImagenes}
                            imagenesNuevas={imagenesNuevas}
                            modoEdicion={modoEdicion}
                            onEliminarImagen={eliminarImagen}
                            onEliminarImagenNueva={eliminarImagenNueva}
                            onAgregarImagen={agregarImagen}
                        />
                        <PanelInformacion {...propiedad} modoEdicion={modoEdicion} onChange={actualizarCampo} />
                        <BloqueDescripcion descripcion={propiedad.descripcion} modoEdicion={modoEdicion} onChange={actualizarCampo} />
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
