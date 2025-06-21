import { useState } from "react";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/HistorialVisitas.css";
import "../styles/sweetalert-custom.css";

const HistorialVisitas = () => {
  const [correo, setCorreo] = useState("");
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const { showWarning, showError, showLoading, close, showInfo } = useSweetAlert();

  const handleBuscar = async () => {
    if (!correo) {
      showWarning(
        "Correo requerido",
        "Por favor ingresa un correo electrónico válido para buscar tu historial.",
        "Entendido"
      );
      return;
    }

    setLoading(true);
    showLoading("Buscando historial", "Consultando tus visitas programadas...");

    try {
      const response = await fetch(`http://localhost:8080/visitas/historial?correo=${correo}`);
      const data = await response.json();
      
      close();
      setVisitas(data);
      setMostrarHistorial(true);

      if (data.length === 0) {
        showInfo(
          "Sin visitas registradas",
          "No se encontraron visitas asociadas a este correo electrónico.",
          "OK"
        );
      }
    } catch (error) {
      console.error("Error al obtener historial:", error);
      close();
      showError(
        "Error en la búsqueda",
        "Hubo un problema al buscar el historial. Verifica el correo ingresado o la conexión al servidor.",
        "Reintentar"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <h2 className="titulo">Consultar Historial de Visitas</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ingresa tu correo"
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleBuscar}
          style={{
            padding: "10px 16px",
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Ver historial
        </button>
      </div>

      {loading && <p>Cargando historial...</p>}

      {mostrarHistorial && (
        <>
          {visitas.length === 0 ? (
            <p>No hay visitas registradas para este correo.</p>
          ) : (
            <ul className="lista-visitas">
              {visitas.map((visita) => (
                <li key={visita.id} className="item-visita">
                  <h3>{visita.propiedad.titulo}</h3>
                  <p><strong>Fecha:</strong> {visita.fecha}</p>
                  <p><strong>Hora:</strong> {visita.horaInicio}</p>
                  <p><strong>Estado:</strong> {visita.estado}</p>
                  {visita.propiedad.urlsImagenes?.[0] && (
                    <img
                      src={visita.propiedad.urlsImagenes[0]}
                      alt="Imagen propiedad"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default HistorialVisitas;
