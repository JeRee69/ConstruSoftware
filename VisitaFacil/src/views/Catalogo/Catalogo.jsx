// src/views/Catalogo/Catalogo.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper, Container, Title, Grid } from "./Catalogo.styles";
import TarjetaPropiedad from "../../components/TarjetaPropiedad/TarjetaPropiedad";
import Cargando from "../../components/Cargando/Cargando";

const Catalogo = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    return (
        <PageWrapper>
            <Container>
                <Title>Catálogo de Propiedades</Title>

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
                            onClick={() => navigate(`/propiedad/${prop.id}`)}
                        />
                    ))}
                </Grid>
            </Container>
        </PageWrapper>
    );
};

export default Catalogo;
