import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    PageWrapper,
    Container,
    Title,
    Grid,
    TitleWrapper,
    BotonIcono
} from "./Catalogo.styles";
import TarjetaPropiedad from "../../components/Catalogo/TarjetaPropiedad.jsx";
import Cargando from "../../components/Cargando/Cargando";
import { FiPlus } from "react-icons/fi";

const Catalogo = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        fetch("http://localhost:8080/propiedades/disponibles")
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

    const handleEliminar = (id) => {
        if (window.confirm("¿Eliminar esta propiedad?")) {
            fetch(`http://localhost:8080/propiedades/${id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Error al eliminar");
                    setPropiedades((prev) => prev.filter((p) => p.id !== id));
                })
                .catch((err) => alert(err.message));
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
