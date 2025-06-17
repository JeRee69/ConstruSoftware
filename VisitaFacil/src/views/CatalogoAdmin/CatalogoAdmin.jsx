import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ContenedorPagina,
    Contenedor,
    Titulo,
    MensajeError,
    GridTarjetas
} from "./CatalogoAdmin.styles.js";
import TarjetaPropiedad from "../../components/TarjetaPropiedad/TarjetaPropiedad.jsx";

const CatalogoAdmin = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        if (!usuario || usuario.rol !== "ADMINISTRADOR") {
            navigate("/");
            return;
        }

        fetch("http://localhost:8080/propiedades/disponibles")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar propiedades");
                return res.json();
            })
            .then(setPropiedades)
            .catch((err) => setError(err.message));
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
        <ContenedorPagina>
            <Contenedor>
                <Titulo>Panel del Administrador</Titulo>

                {error && <MensajeError>{error}</MensajeError>}

                <GridTarjetas>
                    {propiedades.map((prop) => (
                        <TarjetaPropiedad
                            key={prop.id}
                            propiedad={prop}
                            esAdmin={true}
                            onEliminar={() => handleEliminar(prop.id)}
                            onDisponibilidad={() =>
                                navigate(`/admin/propiedad/${prop.id}/disponibilidad`)
                            }
                        />
                    ))}
                </GridTarjetas>
            </Contenedor>
        </ContenedorPagina>
    );
};

export default CatalogoAdmin;
