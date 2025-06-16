// src/components/TarjetaPropiedad/TarjetaPropiedad.jsx
import React from "react";
import {
    Card,
    PropertyImage,
    PlaceholderImage,
    PropertyTitle,
    Info,
    Button
} from "./TarjetaPropiedad.styles";

const TarjetaPropiedad = ({ propiedad, onClick }) => {
    const primeraImagen =
        propiedad.urlsImagenes && propiedad.urlsImagenes.length > 0
            ? propiedad.urlsImagenes[0].trim()
            : null;

    return (
        <Card>
            {primeraImagen ? (
                <PropertyImage
                    src={primeraImagen}
                    alt={`${propiedad.titulo} imagen`}
                    onError={(e) => {
                        e.target.src = "/imagen-no-disponible.png";
                    }}
                />
            ) : (
                <PlaceholderImage>Sin imagen</PlaceholderImage>
            )}

            <PropertyTitle>{propiedad.titulo}</PropertyTitle>
            <Info>{propiedad.descripcion}</Info>
            <Info>
                <strong>Precio:</strong> ${propiedad.precio}
            </Info>
            <Info>
                <strong>Tipo:</strong> {propiedad.tipo}
            </Info>
            <Info>
                <strong>Ubicación:</strong> {propiedad.ubicacion}
            </Info>
            <Info>
                <strong>Disponible:</strong> {propiedad.disponible ? "Sí" : "No"}
            </Info>

            <Button onClick={onClick}>Ver Detalles</Button>
        </Card>
    );
};

export default TarjetaPropiedad;
