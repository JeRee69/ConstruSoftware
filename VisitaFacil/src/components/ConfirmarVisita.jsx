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

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>Confirmar Visita</h2>

      <p><strong>Propiedad:</strong> {visita.titulo}</p>
      <p><strong>Ubicación:</strong> {visita.ubicacion}</p>
      <p><strong>Fecha:</strong> {visita.fecha}</p>
      <p><strong>Hora:</strong> {visita.hora}</p>

      <div style={{ marginTop: "2rem" }}>
        <label>Nombre</label>
        <input
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={formulario.correo}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <label>Teléfono</label>
        <input
          name="telefono"
          value={formulario.telefono}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <button
          onClick={handleSubmit}
          disabled={enviando}
          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "#d32f2f",
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

