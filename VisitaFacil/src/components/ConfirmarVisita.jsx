import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css";

const ConfirmarVisita = () => {
  const [visita, setVisita] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning, showLoading, close } = useSweetAlert();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("visitaPendiente"));
    if (!data) {
      showWarning(
        "Sin datos de visita",
        "No hay información de visita para confirmar. Te redirigiremos al catálogo.",
        "Ir al catálogo"
      ).then(() => {
        navigate("/catalogo");
      });
    } else {
      setVisita(data);
    }
  }, [navigate, showWarning]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const enviarCorreoAgente = async () => {
    try {
      await axios.post("http://localhost:8080/api/notificacion", {
        destinatario: "iturriagajeremy@gmail.com",
        asunto: "Nueva Visita Agendada",
        mensaje: `
          Se ha registrado una nueva visita.

          📌 Propiedad: ${visita.titulo}
          📍 Ubicación: ${visita.ubicacion}
          📅 Fecha: ${visita.fecha}
          🕒 Hora: ${visita.hora}

          👤 Cliente: ${formulario.nombre}
          📧 Correo: ${formulario.correo}
          📞 Teléfono: ${formulario.telefono}
        `,
      });
      console.log("Correo enviado al agente");
    } catch (error) {
      console.error("Error al enviar correo al agente:", error);
    }
  };
  const handleSubmit = async () => {
    if (!formulario.nombre || !formulario.correo || !formulario.telefono) {
      showWarning(
        "Campos incompletos",
        "Por favor, completa todos los campos antes de continuar.",
        "Entendido"
      );
      return;
    }

    const payload = {
      idPropiedad: visita.propiedadId,
      nombre: formulario.nombre,
      correo: formulario.correo,
      telefono: formulario.telefono,
      fecha: visita.fecha,
      hora: visita.hora,
    };

    setEnviando(true);
    showLoading("Enviando solicitud", "Procesando tu solicitud de visita...");

    try {
      const res = await fetch("http://localhost:8080/visitas/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      close(); // Cerrar loading

      if (res.ok) {
        await enviarCorreoAgente(); // <-- Enviar correo al agente
        showSuccess(
          "¡Solicitud enviada!",
          "Tu solicitud de visita ha sido enviada correctamente. Te contactaremos pronto.",
          "Continuar"
        ).then(() => {
          localStorage.removeItem("visitaPendiente");
          navigate("/catalogo");
        });
      } else {
        showError(
          "Error al enviar",
          "Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.",
          "Intentar de nuevo"
        );
      }
    } catch (err) {
      console.error(err);
      close(); // Cerrar loading
      showError(
        "Error de conexión",
        "No se pudo conectar con el servidor. Revisa tu conexión a internet e inténtalo de nuevo.",
        "Reintentar"
      );
    } finally {
      setEnviando(false);
    }
  };

  if (!visita) return <p>Cargando...</p>;

  return (    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        background: "var(--color-fondo-card)",
        borderRadius: "8px",
        boxShadow: "0 2px 8px var(--color-sombra)",
        color: "var(--color-texto)",
      }}
    >
      <h2 style={{ color: "var(--color-texto)", marginBottom: "1rem" }}>
        Confirmar Visita
      </h2>

      <p>
        <strong>Propiedad:</strong> {visita.titulo}
      </p>
      <p>
        <strong>Ubicación:</strong> {visita.ubicacion}
      </p>
      <p>
        <strong>Fecha:</strong> {visita.fecha}
      </p>
      <p>
        <strong>Hora:</strong> {visita.hora}
      </p>

      <div style={{ marginTop: "2rem" }}>
        <label style={{ color: "var(--color-texto)", fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>Nombre</label>        <input
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          style={{ 
            width: "100%", 
            padding: "0.5rem", 
            marginBottom: "1rem",
            backgroundColor: "var(--color-fondo-card)",
            color: "var(--color-texto)",
            border: "1px solid var(--color-border)",
            borderRadius: "4px"
          }}
        />

        <label style={{ color: "var(--color-texto)", fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>Correo</label>        <input
          type="email"
          name="correo"
          value={formulario.correo}
          onChange={handleChange}
          style={{ 
            width: "100%", 
            padding: "0.5rem", 
            marginBottom: "1rem",
            backgroundColor: "var(--color-fondo-card)",
            color: "var(--color-texto)",
            border: "1px solid var(--color-border)",
            borderRadius: "4px"
          }}
        />

        <label style={{ color: "var(--color-texto)", fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>Teléfono</label>        <input
          name="telefono"
          value={formulario.telefono}
          onChange={handleChange}
          style={{ 
            width: "100%", 
            padding: "0.5rem", 
            marginBottom: "1rem",
            backgroundColor: "var(--color-fondo-card)",
            color: "var(--color-texto)",
            border: "1px solid var(--color-border)",
            borderRadius: "4px"
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={enviando}          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "var(--color-primario)",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {enviando ? "Enviando..." : "Confirmar Visita"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmarVisita;
