import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CancelarVisita = () => {
  const [searchParams] = useSearchParams();
  const visitaId = searchParams.get("id");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleCancelar = async () => {
    setCargando(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/visitas/${visitaId}/cancelar`,
        {
          method: "PUT",
        }
      );
      const texto = await res.text();
      setMensaje(texto);
    } catch (error) {
      setMensaje("Error al cancelar la visita.");
    }
    setCargando(false);
  };

  useEffect(() => {
    if (visitaId) {
      handleCancelar();
    } else {
      setMensaje("ID de visita no proporcionado.");
    }
  }, [visitaId]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Cancelar Visita</h2>
      {cargando && <p>Cancelando visita...</p>}
      {!cargando && <p>{mensaje}</p>}
    </div>
  );
};

export default CancelarVisita;
