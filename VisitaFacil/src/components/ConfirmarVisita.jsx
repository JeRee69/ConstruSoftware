import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const yaMostrado = useRef(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("visitaPendiente"));

    // Si no hay datos completos, redirigir sin alerta (para no molestar al usuario)
    if (
      !data ||
      !data.titulo ||
      !data.fecha ||
      !data.hora ||
      !data.ubicacion ||
      !data.propiedadId
    ) {
      navigate("/catalogo");
      return;
    }

    setVisita(data);

    if (usuario && !yaMostrado.current) {
      yaMostrado.current = true;
      setFormulario({
        nombre: usuario.nombre || "",
        correo: usuario.correo || usuario.email || "",
        telefono: (usuario.telefono || "").replace(/^\+569/, ""),
      });
    }
  }, [navigate, usuario]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const enviarCorreoAgente = async (datosCliente) => {
    try {
      // 1. Obtener los correos de los agentes desde el backend
      const { data: correosAgentes } = await axios.get(
        `${import.meta.env.VITE_API_URL}/account/agentes/correos`
      );

      // Verificar que hay correos para enviar
      if (!correosAgentes || correosAgentes.length === 0) {
        console.warn("No se encontraron agentes para enviar correo.");
        return;
      }

      // 2. Enviar correo a los agentes
      await axios.post(`${import.meta.env.VITE_API_URL}/api/notificacion`, {
        destinatario: correosAgentes.join(","), // Se envía como string separado por comas
        asunto: "Nueva Visita Agendada",
        mensaje: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Nueva Visita Agendada</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #d32f2f;">Nueva Solicitud de Visita</h2>
  <p>Hola equipo,</p>
  <p>Se ha registrado una nueva solicitud de visita con los siguientes detalles:</p>

  <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">🏠 Propiedad:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.titulo}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">📍 Ubicación:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.ubicacion}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">📅 Fecha:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.fecha}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">⏰ Hora:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.hora}</td>
    </tr>
  </table>

  <h3>Datos del cliente</h3>
  <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">👤 Nombre:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${datosCliente.nombre}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">📧 Correo:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${datosCliente.correo}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">📞 Teléfono:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${datosCliente.telefono}</td>
    </tr>
  </table>

  <p>Por favor, procedan con la gestión correspondiente.</p>
  <p>Saludos,<br /><strong>Sistema VisitaFácil</strong></p>
</body>
</html>
      `,
      });
    } catch (error) {
      console.error("Error al enviar correo al agente:", error);
    }
  };

  const enviarCorreoUsuario = async (datosCliente) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/notificacion`, {
        destinatario: datosCliente.correo,
        asunto: "Confirmación de Solicitud de Visita",
        mensaje: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Confirmación de Visita</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #d32f2f;">¡Solicitud Recibida!</h2>
  <p>Hola <strong>${datosCliente.nombre}</strong>,</p>
  <p>Gracias por confiar en <strong>VisitaFácil</strong>.</p>
  <p>Hemos recibido tu solicitud de visita para la siguiente propiedad:</p>

  <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">🏠 Propiedad:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.titulo}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">📍 Ubicación:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.ubicacion}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">📅 Fecha:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.fecha}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">⏰ Hora:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${visita.hora}</td>
    </tr>
  </table>

  <p>Un agente se pondrá en contacto contigo pronto para confirmar los detalles.</p>
  <p>Si tienes alguna pregunta, responde a este correo.</p>

  <p>¡Saludos cordiales!<br /><strong>Equipo VisitaFácil</strong></p>
</body>
</html>
      `,
      });
    } catch (error) {
      console.error("Error al enviar correo al usuario:", error);
    }
  };

  const handleSubmit = async (usarDatosGuardados = false) => {
    const datosAEnviar =
      usarDatosGuardados && usuario
        ? {
            nombre: usuario.nombre || "",
            correo: usuario.correo || usuario.email || "",
            telefono: (usuario.telefono || "").replace(/^\+569/, ""), // <-- solo los 8 dígitos
          }
        : formulario;

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datosAEnviar.correo)) {
      showWarning(
        "Correo inválido",
        "Por favor ingresa un correo electrónico válido (ejemplo@algo.com).",
        "Entendido"
      );
      return;
    }

    // Validación de formato de teléfono chileno +569XXXXXXXX
    if (!/^\d{8}$/.test(datosAEnviar.telefono)) {
      showWarning(
        "Teléfono inválido",
        "El número debe tener 8 dígitos después de +569.",
        "Entendido"
      );
      return;
    }

    if (
      !datosAEnviar.nombre.trim() ||
      !datosAEnviar.correo.trim() ||
      !datosAEnviar.telefono.trim()
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
      telefono: "+569" + datosAEnviar.telefono, // Envía el número completo
      fecha: visita.fecha,
      hora: visita.hora,
    };

    setEnviando(true);
    showLoading("Enviando solicitud", "Procesando tu solicitud de visita...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/visitas/solicitar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        await enviarCorreoAgente(datosAEnviar);
        await enviarCorreoUsuario(datosAEnviar);

        // Borro visitaPendiente ANTES de cerrar y mostrar alerta
        localStorage.removeItem("visitaPendiente");

        close(); // Cierro el loading

        await showSuccess(
          "Agendamiento exitoso",
          "Por favor, revise su correo para más detalles.",
          "Aceptar"
        );

        navigate("/catalogo");
      } else {
        close();
        showError(
          "Error al enviar",
          "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.",
          "Intentar de nuevo"
        );
      }
    } catch (err) {
      console.error(err);
      close();
      showError(
        "Error de conexión",
        "No se pudo conectar con el servidor. Intenta nuevamente.",
        "Reintentar"
      );
    } finally {
      setEnviando(false);
    }
  };

  if (!visita)
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "2rem",
          color: "var(--color-texto)",
          fontWeight: "bold",
        }}
      >
        Cargando visita...
      </p>
    );

  return (
    <div style={containerStyle}>
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

      {!usuario && (
        <div style={{ marginTop: "2rem" }}>
          <label style={labelStyle}>Nombre</label>
          <input
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            style={inputStyle}
            disabled={enviando}
          />
          <label style={labelStyle}>Correo</label>
          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            style={inputStyle}
            disabled={enviando}
          />
          <label style={labelStyle}>Teléfono</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                marginRight: "8px",
                fontSize: "1rem",
                lineHeight: "2.2",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              +569
            </span>
            <input
              name="telefono"
              type="text"
              maxLength={8}
              pattern="\d{8}"
              value={formulario.telefono}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                setFormulario({ ...formulario, telefono: value });
              }}
              style={{ ...inputStyle, width: "100%", marginBottom: 0 }}
              disabled={enviando}
              placeholder="12345678"
            />
          </div>
          <button
            onClick={() => handleSubmit(false)}
            disabled={enviando}
            style={buttonStyle}
          >
            {enviando ? "Enviando..." : "Confirmar Visita"}
          </button>
        </div>
      )}

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

// Estilos
const containerStyle = {
  maxWidth: "600px",
  margin: "2rem auto",
  padding: "2rem",
  background: "var(--color-fondo-card)",
  borderRadius: "8px",
  boxShadow: "0 2px 8px var(--color-sombra)",
  color: "var(--color-texto)",
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
