import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/datepicker-custom.css";
import "../styles/VistaPropiedad.css";  

const VistaPropiedad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [fechaVisita, setFechaVisita] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);

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

  useEffect(() => {
    if (!fechaVisita) return;

    setCargandoHorarios(true);
    const fechaStr = fechaVisita.toISOString().split("T")[0];

    fetch(`http://localhost:8080/disponibilidad/propiedades/${id}?fecha=${fechaStr}`)
      .then((res) => res.json())
      .then((data) => {
        const horarios = [];

        data.forEach(({ horaInicio, horaFin }) => {
          let [h, m] = horaInicio.split(":").map(Number);
          const [endH, endM] = horaFin.split(":").map(Number);

          const start = new Date();
          start.setHours(h, m, 0, 0);
          const end = new Date();
          end.setHours(endH, endM, 0, 0);

          while (start < end) {
            const horaFormateada = start.toTimeString().slice(0, 5);
            horarios.push(horaFormateada);
            start.setMinutes(start.getMinutes() + 60);
          }
        });

        setHorariosDisponibles(horarios);
      })
      .catch((err) => {
        console.error("Error cargando horarios:", err);
        setHorariosDisponibles([]);
      })
      .finally(() => {
        setCargandoHorarios(false);
      });
  }, [fechaVisita, id]);
  if (cargando) return <p style={{ color: "#000" }}>Cargando propiedad...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!propiedad) return <p style={{ color: "#000" }}>Propiedad no encontrada.</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

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
    >      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h1 style={{ color: "#d32f2f" }}>{propiedad.titulo}</h1>
        <div style={{ color: "#000" }}>
          <p><strong>Descripción:</strong> {propiedad.descripcion}</p>
          <p><strong>Precio:</strong> ${propiedad.precio}</p>
          <p><strong>Tipo:</strong> {propiedad.tipo}</p>
          <p><strong>Ubicación:</strong> {propiedad.ubicacion}</p>
          <p><strong>Disponible:</strong> {propiedad.disponible ? "Sí" : "No"}</p>
        </div>

        {/* Carrusel de imágenes */}
        <div style={{ marginTop: "1.5rem" }}>
          {propiedad.urlsImagenes?.length > 0 ? (
            <Slider {...sliderSettings}>
              {propiedad.urlsImagenes.map((url, index) => (
                <div key={index}>
                  <img
                    src={url.trim()}
                    alt={`Imagen ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/imagen-no-disponible.png";
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p style={{ color: "#000" }}>No hay imágenes disponibles.</p>
          )}
        </div>

        {/* Calendario y horarios */}
        <div style={{ marginTop: "2rem", textAlign: "center", color: "#000" }}>
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
          />          {fechaVisita && (
            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ color: "#000", margin: "1rem 0" }}>Horarios disponibles para {fechaVisita.toLocaleDateString()}</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {cargandoHorarios ? (
                  <p style={{ color: "#888" }}>Cargando horarios...</p>
                ) : horariosDisponibles.length > 0 ? (
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
                <>
                  <p
                    style={{
                      marginTop: "1rem",
                      fontWeight: "bold",
                      color: "#4caf50",
                    }}
                  >
                    Visita seleccionada: {fechaVisita.toLocaleDateString()} a las {horarioSeleccionado}
                  </p>

                  <button
                    onClick={() => {
                      localStorage.setItem("visitaPendiente", JSON.stringify({
                        propiedadId: propiedad.id,
                        titulo: propiedad.titulo,
                        ubicacion: propiedad.ubicacion,
                        fecha: fechaVisita.toISOString().split("T")[0],
                        hora: horarioSeleccionado,
                      }));
                      navigate("/confirmar-visita");
                    }}
                    style={{
                      marginTop: "1.5rem",
                      padding: "0.8rem 1.5rem",
                      backgroundColor: "#d32f2f",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Confirmar Visita
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VistaPropiedad;
