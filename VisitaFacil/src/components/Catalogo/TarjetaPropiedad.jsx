import React, { useState } from "react";
import {
    Card,
    PropertyImage,
    PropertyTitle,
    MetaInfo,
    Price,
    SmallButton,
    Content,
    Footer,
    FlechaIzquierda,
    FlechaDerecha,
    ImagenWrapper,
    PlaceholderSinImagen,
    AdminIconos,
    Icono
} from "./TarjetaPropiedad.styles.js";

import { useNavigate } from "react-router-dom";
import {
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
    FaTrash,
    FaCalendarAlt
} from "react-icons/fa";

const TarjetaPropiedad = ({ propiedad, onEliminar, onDisponibilidad, esAdmin }) => {
    const navigate = useNavigate();
    const imagenesValidas = propiedad.urlsImagenes?.filter(url => url.trim() !== "") || [];
    const sinImagenes = imagenesValidas.length === 0;
    const imagenes = sinImagenes ? [] : imagenesValidas;
    const [indiceActual, setIndiceActual] = useState(0);

    const cambiarImagen = (direccion) => {
        setIndiceActual((prev) =>
            direccion === "izq"
                ? (prev - 1 + imagenes.length) % imagenes.length
                : (prev + 1) % imagenes.length
        );
    };

    const formatearTitulo = (titulo) =>
        titulo
            .toLowerCase()
            .split(" ")
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ");

    return (
        <Card>
            <ImagenWrapper>
                {sinImagenes ? (
                    <PlaceholderSinImagen />
                ) : (
                    <>
                        <PropertyImage src={imagenes[indiceActual]} alt={propiedad.titulo} />
                        {imagenes.length > 1 && (
                            <>
                                <FlechaIzquierda onClick={() => cambiarImagen("izq")}>
                                    <FaChevronLeft />
                                </FlechaIzquierda>
                                <FlechaDerecha onClick={() => cambiarImagen("der")}>
                                    <FaChevronRight />
                                </FlechaDerecha>
                            </>
                        )}
                    </>
                )}
            </ImagenWrapper>

            <Content>
                <PropertyTitle>{formatearTitulo(propiedad.titulo)}</PropertyTitle>
                <MetaInfo>{propiedad.tipo}</MetaInfo>
                <MetaInfo>{propiedad.ubicacion}</MetaInfo>
                <Price>${propiedad.precio.toLocaleString()}</Price>
            </Content>

            <Footer>
                {esAdmin && (
                    <AdminIconos>
                        <Icono onClick={() => onDisponibilidad(propiedad)} title="Registrar disponibilidad">
                            <FaCalendarAlt />
                        </Icono>
                        <Icono onClick={() => onEliminar(propiedad)} title="Eliminar propiedad">
                            <FaTrash />
                        </Icono>
                    </AdminIconos>
                )}

                <div style={{ marginLeft: "auto" }}>
                    <SmallButton onClick={() => navigate(`/propiedad/${propiedad.id}`)}>
                        Ver más <FaArrowRight />
                    </SmallButton>
                </div>
            </Footer>
        </Card>
    );
};

export default TarjetaPropiedad;
