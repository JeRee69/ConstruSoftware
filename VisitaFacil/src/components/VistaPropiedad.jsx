import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VistaPropiedad = () => {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/propiedades/${id}`)
      .then((res) => { 
        if (!res.ok) {
          throw new Error("Error al cargar la propiedad");
        }
        return res.json();
      })
      .then((data) => {
        console.log("JSON recibido:", data); // 👈 Esto es clave
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
    <div style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h1>{propiedad.titulo}</h1>
      <p>{propiedad.descripcion}</p>
      <p><strong>Precio:</strong> ${propiedad.precio}</p>
      <p><strong>Tipo:</strong> {propiedad.tipo}</p>
      <p><strong>Ubicación:</strong> {propiedad.ubicacion}</p>
      <p><strong>Disponible:</strong> {propiedad.disponible ? "Sí" : "No"}</p>

      <div
  style={{
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
    justifyContent: "flex-start", // para alinear a la izquierda
  }}
>
  {propiedad.urlsImagenes && propiedad.urlsImagenes.length > 0 ? (
    propiedad.urlsImagenes.map((url, index) => {
      const trimmedUrl = url.trim();
      const fullUrl = `http://localhost:8080${trimmedUrl}`;
      return (
        <img
          key={index}
          src={fullUrl}
          alt={`${propiedad.titulo} imagen ${index + 1}`}
          style={{
            width: "400px",    // tamaño más grande
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
  );
};

export default VistaPropiedad;
