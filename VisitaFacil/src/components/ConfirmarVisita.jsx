import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmarVisita = () => {
  const [visita, setVisita] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("visitaPendiente"));
    if (!data) {
      alert("No hay visita para confirmar.");
      navigate("/catalogo");
    } else {
      setVisita(data);
    }
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const enviarCorreoAgente = async () => {
    try {
      await axios.post("http://localhost:8080/api/notificacion", {
        destinatario: "crunchyconjunto@gmail.com", // Cambia esto al correo del agente
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

  const enviarCorreoUsuario = async () => {
    try {
      await axios.post("http://localhost:8080/api/notificacion", {
        destinatario: formulario.correo,
        asunto: "Confirmación de Solicitud de Visita",
        mensaje: `
          Hola ${formulario.nombre},

          ✅ Hemos recibido tu solicitud de visita para la siguiente propiedad:

          📌 Propiedad: ${visita.titulo}
          📍 Ubicación: ${visita.ubicacion}
          📅 Fecha: ${visita.fecha}
          🕒 Hora: ${visita.hora}

          Un agente revisará tu solicitud y se pondrá en contacto contigo pronto.

          ¡Gracias por confiar en nosotros!
        `,
      });
      console.log("Correo enviado al usuario");
    } catch (error) {
      console.error("Error al enviar correo al usuario:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formulario.nombre || !formulario.correo || !formulario.telefono) {
      alert("Por favor, completa todos los campos.");
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

    try {
      const res = await fetch("http://localhost:8080/visitas/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await enviarCorreoAgente();
        await enviarCorreoUsuario();
        alert("✅ Solicitud enviada correctamente");
        localStorage.removeItem("visitaPendiente");
        navigate("/catalogo");
      } else {
        alert("❌ Error al enviar solicitud");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al conectar con el servidor");
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
