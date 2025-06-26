import axios from "axios";
import { useEffect, useState, useRef } from "react";
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
  const { showSuccess, showError, showWarning, showLoading, close } =
    useSweetAlert();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const yaMostrado = useRef(false); // para evitar múltiples ejecuciones

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
      return;
    }

    setVisita(data);

    // Si hay usuario logueado y no hemos mostrado confirmación, prellenar y preguntar
    if (usuario && !yaMostrado.current) {
      yaMostrado.current = true;

      setFormulario({
        nombre: usuario.nombre || "",
        correo: usuario.correo || usuario.email || "",
        telefono: usuario.telefono || "",
      });
    }
  }, [navigate, showWarning, usuario]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  // Enviar correo al agente
  const enviarCorreoAgente = async (datosCliente) => {
    try {
      await axios.post("http://localhost:8080/api/notificacion", {
        destinatario: "crunchyconjunto@gmail.com", // Cambiar al correo real del agente
        asunto: "Nueva Visita Agendada",
        mensaje: `
          Se ha registrado una nueva visita.

          📌 Propiedad: ${visita.titulo}
          📍 Ubicación: ${visita.ubicacion}
          📅 Fecha: ${visita.fecha}
          🕒 Hora: ${visita.hora}

          👤 Cliente: ${datosCliente.nombre}
          📧 Correo: ${datosCliente.correo}
          📞 Teléfono: ${datosCliente.telefono}
        `,
      });
    } catch (error) {
      console.error("Error al enviar correo al agente:", error);
    }
  };

  // Enviar correo al usuario
  const enviarCorreoUsuario = async (datosCliente) => {
    try {
      await axios.post("http://localhost:8080/api/notificacion", {
        destinatario: datosCliente.correo,
        asunto: "Confirmación de Solicitud de Visita",
        mensaje: `
          Hola ${datosCliente.nombre},

          ✅ Hemos recibido tu solicitud de visita para la siguiente propiedad:

          📌 Propiedad: ${visita.titulo}
          📍 Ubicación: ${visita.ubicacion}
          📅 Fecha: ${visita.fecha}
          🕒 Hora: ${visita.hora}

          Un agente revisará tu solicitud y se pondrá en contacto contigo pronto.

          ¡Gracias por confiar en nosotros!
        `,
      });
    } catch (error) {
      console.error("Error al enviar correo al usuario:", error);
    }
  };

  // handleSubmit con parámetro que indica si usar datos guardados o formulario
  const handleSubmit = async (usarDatosGuardados = false) => {
    const datosAEnviar =
      usarDatosGuardados && usuario
        ? {
            nombre: usuario.nombre || "",
            correo: usuario.correo || usuario.email || "",
            telefono: usuario.telefono || "",
          }
        : formulario;

    if (
      !datosAEnviar.nombre ||
      !datosAEnviar.correo ||
      !datosAEnviar.telefono
    ) {
      showWarning(
        "Campos incompletos",
        "Por favor, completa todos los campos antes de continuar.",
        "Entendido"
      );
      return;
    }

    const payload = {
      idPropiedad: visita.propiedadId,
      nombre: datosAEnviar.nombre,
      correo: datosAEnviar.correo,
      telefono: datosAEnviar.telefono,
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

      close();

      if (res.ok) {
        await enviarCorreoAgente(datosAEnviar);
        await enviarCorreoUsuario(datosAEnviar);
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
      close();
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

  return (
    <div
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

      {/* Mostrar formulario solo si no hay usuario logueado */}
      {!usuario && (
        <div style={{ marginTop: "2rem" }}>
          <label style={labelStyle}>Nombre</label>
          <input
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Correo</label>
          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Teléfono</label>
          <input
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            onClick={() => handleSubmit(false)}
            disabled={enviando}
            style={buttonStyle}
          >
            {enviando ? "Enviando..." : "Confirmar Visita"}
          </button>
        </div>
      )}

      {/* Si hay usuario logueado, mostrar botón para confirmar con sus datos */}
      {usuario && (
        <button
          onClick={() => handleSubmit(true)}
          disabled={enviando}
          style={{ ...buttonStyle, marginTop: "1.5rem" }}
        >
          {enviando ? "Enviando..." : "Confirmar visita con mis datos"}
        </button>
      )}
    </div>
  );
};

const labelStyle = {
  color: "var(--color-texto)",
  fontWeight: "bold",
  display: "block",
  marginBottom: "0.5rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginBottom: "1rem",
  backgroundColor: "var(--color-fondo-card)",
  color: "var(--color-texto)",
  border: "1px solid var(--color-border)",
  borderRadius: "4px",
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "var(--color-primario)",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ConfirmarVisita;
