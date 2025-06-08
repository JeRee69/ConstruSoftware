import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import "../styles/datepicker-custom.css";

const VistaPropiedad = () => {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [fechaVisita, setFechaVisita] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  // Cargar propiedad
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

  // Cargar horarios dinámicamente al cambiar fecha
  useEffect(() => {
    if (!fechaVisita) return;

    const fechaStr = fechaVisita.toISOString().split("T")[0];

    fetch(`http://localhost:8080/disponibilidad/propiedades/${id}?fecha=${fechaStr}`)
      .then(res => res.json())
      .then(data => {
        const horarios = [];

        data.forEach(({ horaInicio, horaFin }) => {
          let current = horaInicio;
          while (current < horaFin) {
            horarios.push(current);

            const [h, m] = current.split(":").map(Number);
            const next = new Date();
            next.setHours(h, m + 60); // bloques de 1 hora
            current = next.toTimeString().slice(0, 5);
          }
        });

        setHorariosDisponibles(horarios);
      })
      .catch(err => {
        console.error("Error cargando horarios:", err);
        setHorariosDisponibles([]);
      });
  }, [fechaVisita, id]);

  if (cargando) return <p>Cargando propiedad...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!propiedad) return <p>Propiedad no encontrada.</p>;

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h1 style={{ color: "#d32f2f" }}>{propiedad.titulo}</h1>
        <p><strong>Descripción:</strong> {propiedad.descripcion}</p>
        <p><strong>Precio:</strong> ${propiedad.precio}</p>
        <p><strong>Tipo:</strong> {propiedad.tipo}</p>
        <p><strong>Ubicación:</strong> {propiedad.ubicacion}</p>
        <p><strong>Disponible:</strong> {propiedad.disponible ? "Sí" : "No"}</p>

        {/* Imágenes */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {propiedad.urlsImagenes?.length > 0 ? (
            propiedad.urlsImagenes.map((url, index) => (
              <img
                key={index}
                src={`http://localhost:8080${url.trim()}`}
                alt={`Imagen ${index + 1}`}
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
            ))
          ) : (
            <p>No hay imágenes disponibles.</p>
          )}
        </div>

        {/* Calendario y horarios */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h3>Agendar una visita</h3>
          <ReactDatePicker
            selected={fechaVisita}
            onChange={(date) => {
              setFechaVisita(date);
              setHorarioSeleccionado(null);
            }}
            minDate={new Date()}
            placeholderText="Selecciona una fecha"
            dateFormat="dd/MM/yyyy"
            inline
          />

          {fechaVisita && (
            <div style={{ marginTop: "1rem" }}>
              <h4>Horarios disponibles para {fechaVisita.toLocaleDateString()}</h4>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px"
              }}>
                {horariosDisponibles.length > 0 ? (
                  horariosDisponibles.map((hora) => (
                    <button
                      key={hora}
                      onClick={() => setHorarioSeleccionado(hora)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "6px",
                        border: horarioSeleccionado === hora ? "2px solid #d32f2f" : "1px solid #ccc",
                        backgroundColor: horarioSeleccionado === hora ? "#d32f2f" : "#fff",
                        color: horarioSeleccionado === hora ? "#fff" : "#333",
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                    >
                      {hora}
                    </button>
                  ))
                ) : (
                  <p style={{ color: "#777" }}>No hay horarios disponibles.</p>
                )}
              </div>

              {horarioSeleccionado && (
                <p style={{ marginTop: "1rem", fontWeight: "bold", color: "#4caf50" }}>
                  Visita seleccionada: {fechaVisita.toLocaleDateString()} a las {horarioSeleccionado}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VistaPropiedad;
