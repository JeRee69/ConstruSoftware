import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VistaPropiedad = () => {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [fechaVisita, setFechaVisita] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/propiedades/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar la propiedad");
        }
        return res.json();
      })
      .then((data) => {
        console.log("JSON recibido:", data);
        setPropiedad(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [id]);

  if (cargando) return <p>Cargando propiedad...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!propiedad) return <p>Propiedad no encontrada.</p>;

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0", // Fondo claro
        width: "100vw", // Ocupar todo el ancho de la ventana
        height: "100vh", // Ocupar toda la altura de la ventana
        overflowY: "auto", // Permitir scroll si el contenido es alto
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "900px" }}>
        <h1 style={{ color: "#d32f2f" }}>{propiedad.titulo}</h1>
        <p style={{ color: "#000" }}>{propiedad.descripcion}</p>
        <p style={{ color: "#000" }}>
          <strong>Precio:</strong> ${propiedad.precio}
        </p>
        <p style={{ color: "#000" }}>
          <strong>Tipo:</strong> {propiedad.tipo}
        </p>
        <p style={{ color: "#000" }}>
          <strong>Ubicación:</strong> {propiedad.ubicacion}
        </p>
        <p style={{ color: "#000" }}>
          <strong>Disponible:</strong> {propiedad.disponible ? "Sí" : "No"}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {propiedad.urlsImagenes && propiedad.urlsImagenes.length > 0 ? (
            propiedad.urlsImagenes.map((url, index) => {
              const fullUrl = url.trim();
              return (
                <img
                  key={index}
                  src={fullUrl}
                  alt={`${propiedad.titulo} imagen ${index + 1}`}
                  style={{
                    width: "400px",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  onError={(e) => {
                    e.target.src = "/imagen-no-disponible.png";
                  }}
                />
              );
            })
          ) : (
            <p>No hay imágenes disponibles.</p>
          )}
        </div>
      </div>

      {/* 📅 Calendario para agendar visita */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h3>Agendar una visita</h3>
        <ReactDatePicker
          selected={fechaVisita}
          onChange={(date) => setFechaVisita(date)}
          minDate={new Date()}
          placeholderText="Selecciona una fecha"
          dateFormat="dd/MM/yyyy"
          inline
        />
      </div>
    </div>
  );
};

export default VistaPropiedad;
