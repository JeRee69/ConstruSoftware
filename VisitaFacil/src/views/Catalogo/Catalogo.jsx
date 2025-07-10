import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cargando from "../../components/Cargando/Cargando";
import TarjetaPropiedad from "../../components/Catalogo/TarjetaPropiedad.jsx";
import { useSweetAlert } from "../../hooks/useSweetAlert";
import "../../styles/sweetalert-custom.css";
import {
    BotonIcono,
    Container,
    Grid,
    PageWrapper,
    Title,
    TitleWrapper
} from "./Catalogo.styles";

const Catalogo = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const { showConfirm, showSuccess, showError, showLoading, close } = useSweetAlert();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/propiedades/disponibles`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar propiedades");
                return res.json();
            })
            .then((data) => {
                setPropiedades(data);
                setCargando(false);
            })
            .catch((err) => {
                setError(err.message);
                setCargando(false);
            });
    }, []);

    const handleEliminar = async (id) => {
        const result = await showConfirm(
            "¿Eliminar propiedad?",
            "Esta acción no se puede deshacer. La propiedad será eliminada permanentemente.",
            "Sí, eliminar",
            "Cancelar"
        );

        if (result.isConfirmed) {
            showLoading("Eliminando propiedad", "Por favor espera...");

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/propiedades/${id}`, {
                    method: "DELETE",
                });

                close();

                if (!res.ok) throw new Error("Error al eliminar la propiedad");

                setPropiedades((prev) => prev.filter((p) => p.id !== id));
                
                showSuccess(
                    "¡Propiedad eliminada!",
                    "La propiedad ha sido eliminada correctamente del catálogo.",
                    "Continuar"
                );
            } catch (err) {
                close();
                showError(
                    "Error al eliminar",
                    `No se pudo eliminar la propiedad: ${err.message}`,
                    "Reintentar"
                );
            }
        }
    };

    return (
        <PageWrapper>
            <Container>
                <TitleWrapper>
                    <Title>Catálogo de Propiedades</Title>
                    {usuario?.rol === "ADMINISTRADOR" && (
                        <BotonIcono
                            onClick={() => navigate("/admin/nueva-propiedad")}
                            title="Agregar nueva propiedad"
                        >
                            <FiPlus />
                        </BotonIcono>
                    )}
                </TitleWrapper>

                {cargando && <Cargando mensaje="Cargando propiedades..." />}

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                {!cargando && !error && propiedades.length === 0 && (
                    <p style={{ textAlign: "center" }}>No hay propiedades disponibles.</p>
                )}

                <Grid>
                    {propiedades.map((prop) => (
                        <TarjetaPropiedad
                            key={prop.id}
                            propiedad={prop}
                            esAdmin={usuario?.rol === "ADMINISTRADOR"}
                            onClick={() => navigate(`/propiedad/${prop.id}`)}
                            onEliminar={() => handleEliminar(prop.id)}
                            onDisponibilidad={() =>
                                navigate(`/admin/propiedad/${prop.id}/disponibilidad`)
                            }
                        />
                    ))}
                </Grid>
            </Container>
        </PageWrapper>
    );
};

export default Catalogo;
