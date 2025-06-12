import React, { useEffect, useState } from "react";

const HistorialVisitas = () => {
  const [visitas, setVisitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const correo = localStorage.getItem("correo");

  useEffect(() => {
    if (!correo) {
      setCargando(false);
      return;
    }

    const fetchVisitas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/visitas?correo=${correo}`);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();

        // Asegúrate de que el campo "estado" esté en minúsculas o ajusta según tu backend
        const visitasRealizadas = data.filter((v) => v.estado?.toLowerCase() === "realizado");

        setVisitas(visitasRealizadas);
      } catch (error) {
        console.error("Error al cargar visitas:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchVisitas();
  }, [correo]);

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>Historial de Visitas</h2>

      {cargando ? (
        <p>Cargando...</p>
      ) : visitas.length === 0 ? (
        <p>No tienes visitas realizadas.</p>
      ) : (
        <table style={tablaEstilos}>
          <thead>
            <tr>
              <th style={th}>Fecha</th>
              <th style={th}>Hora</th>
              <th style={th}>Propiedad</th>
              <th style={th}>Agente</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita) => (
              <tr key={visita.id}>
                <td style={td}>{formatearFecha(visita.fecha)}</td>
                <td style={td}>{visita.hora_inicio}</td>
                <td style={td}>{visita.propiedad_id}</td>
                <td style={td}>{visita.agente_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Función para formatear fecha a formato local
const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString();
};

// Estilos de tabla
const tablaEstilos = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden"
};

const th = {
  backgroundColor: "#f5f5f5",
  color: "#333",
  borderBottom: "2px solid #ccc",
  padding: "0.75rem",
  textAlign: "left"
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "0.75rem"
};

export default HistorialVisitas;
