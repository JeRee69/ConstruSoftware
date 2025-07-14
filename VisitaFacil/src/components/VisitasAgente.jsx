import {
  ChevronLeft,
  ChevronRight,
  CopyCheck,
  MessageCircleMore,
} from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Cargando from "./Cargando/Cargando.jsx";

const Pagina = styled.div`
  min-height: 100vh;
  background-color: var(--color-secundario);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Contenido = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: var(--color-fondo-card);
  border-radius: 16px;
  box-shadow: 0 6px 16px var(--color-sombra);
  padding: 2rem;
`;

const TituloSeccion = styled.h2`
  color: var(--color-texto);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
`;

const Subtitulo = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--color-texto);
`;

const Card = styled.div`
  background-color: var(--color-fondo-card);
  border-left: 6px solid var(--color-primario);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px var(--color-sombra);
  border: 1px solid var(--color-border);
`;

const Texto = styled.p`
  margin: 0.3rem 0;
  color: var(--color-texto);
  font-size: 1rem;
`;

const BotonAceptar = styled.button`
  margin-top: 0.5rem;
  background-color: #388e3c;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2e7d32;
  }
`;

const BotonCancelar = styled.button`
  margin-top: 0.5rem;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #c62828;
  }
`;

const Mensaje = styled.div`
  background-color: ${({ error }) =>
    error ? "rgba(244, 67, 54, 0.1)" : "rgba(76, 175, 80, 0.1)"};
  color: ${({ error }) => (error ? "#d32f2f" : "#388e3c")};
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
  border: 1px solid
    ${({ error }) =>
      error ? "rgba(244, 67, 54, 0.3)" : "rgba(76, 175, 80, 0.3)"};
`;

const FlechaIcono = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 6px;
  color: var(--color-texto);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: var(--color-border);
  }

  &:disabled {
    color: var(--color-texto);
    opacity: 0.4;
    cursor: default;
    background: none;
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

const LinkPropiedad = styled.a`
  color: #1976d2;
  text-decoration: underline;
  font-weight: 500;

  &:hover {
    color: #0d47a1;
  }
`;

const Copiable = styled.span`
  cursor: pointer;
  color: #1976d2;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const LinkWhatsapp = styled.a`
  color: #25d366;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MensajeVacio = styled.p`
  color: var(--color-texto);
  opacity: 0.7;
  font-style: italic;
  text-align: center;
  margin: 2rem 0;
`;

const VisitasAgente = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const agenteId = usuario?.accountId;

  const [pendientes, setPendientes] = useState([]);
  const [aceptadasPorFecha, setAceptadasPorFecha] = useState({});
  const [fechasAceptadas, setFechasAceptadas] = useState([]);
  const [fechaIndex, setFechaIndex] = useState(0);

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fechaActual = fechasAceptadas[fechaIndex];

  const fetchVisitas = () => {
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/solicitudes-agente/${agenteId}`)
      .then((res) => res.json())
      .then((data) => setPendientes(data));

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/solicitudes-agente/${agenteId}/estado?estado=ACEPTADA`
    )
      .then((res) => res.json())
      .then((data) => {
        const agrupado = {};
        data.forEach((v) => {
          if (!agrupado[v.fecha]) agrupado[v.fecha] = [];
          agrupado[v.fecha].push(v);
        });

        for (const fecha in agrupado) {
          agrupado[fecha].sort((a, b) => a.hora.localeCompare(b.hora));
        }

        const ordenadas = Object.keys(agrupado).sort();
        setAceptadasPorFecha(agrupado);
        setFechasAceptadas(ordenadas);
        setFechaIndex(0);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (agenteId) fetchVisitas();
  }, [agenteId]);

  const copiarCorreo = (correo) => {
    navigator.clipboard.writeText(correo);
    setMensaje("Correo copiado al portapapeles");
    setError(false);
    setTimeout(() => setMensaje(null), 2000);
  };

  const enviarCorreoCliente = async (visita) => {
    try {
      // Crear fecha/hora inicio y fin en formato de Google Calendar
      const start = new Date(`${visita.fecha}T${visita.hora}`);
      const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hora de duración

      const formatDate = (date) =>
        date.toISOString().replace(/[-:]|\.\d{3}/g, ""); // formato: 20250626T150000Z

      const startFormatted = formatDate(start);
      const endFormatted = formatDate(end);

      // Crear enlace a Google Calendar
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Visita+Propiedad&dates=${startFormatted}/${endFormatted}&details=Visita+a+la+propiedad+en+${encodeURIComponent(
        visita.direccionPropiedad
      )}&location=${encodeURIComponent(
        visita.direccionPropiedad
      )}&sf=true&output=xml`;

      // URL para cancelar la visita
      const cancelarUrl = `https://visitafacil.mooo.com/cancelar-visita?id=${visita.id}`;

      // Cuerpo del mensaje con enlace incluido
      const mensaje = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 1rem;">
  <h2 style="color: #d32f2f;">¡Tu visita ha sido aceptada!</h2>
  <p>Hola <strong>${visita.nombreCliente}</strong>,</p>
  <p>Tu solicitud para visitar la siguiente propiedad ha sido <strong>aceptada</strong>:</p>

  <ul style="list-style: none; padding: 0;">
    <li><strong>📍 Dirección:</strong> ${visita.direccionPropiedad}</li>
    <li><strong>📅 Fecha:</strong> ${visita.fecha}</li>
    <li><strong>🕒 Hora:</strong> ${visita.hora}</li>
  </ul>

  <p>Puedes agregar esta visita a tu calendario de Google haciendo clic en el siguiente botón:</p>

  <div style="margin: 1.5rem 0;">
    <a href="${calendarUrl}" target="_blank" style="
      background-color: #4285F4;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
    ">
      📅 Agregar a Google Calendar
    </a>
  </div>

  <p>Si deseas cancelar esta visita, haz clic en el siguiente botón:</p>

  <div style="margin: 1.5rem 0;">
    <a href="${cancelarUrl}" target="_blank" style="
      background-color: #d32f2f;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
    ">
      ❌ Cancelar Visita
    </a>
  </div>

  <p>Un agente se pondrá en contacto contigo si es necesario.</p>
  <p style="margin-top: 2rem;">Saludos,<br><strong>Equipo VisitaFácil</strong></p>
</div>
`;

      await fetch(`${import.meta.env.VITE_API_URL}/api/notificacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinatario: visita.correoCliente,
          asunto: "Visita Aceptada ✔️",
          mensaje: mensaje,
        }),
      });
    } catch (error) {
      console.error("Error al enviar correo al cliente:", error);
    }
  };

  const aceptarVisita = (visitaId) => {
    const visita = pendientes.find((v) => v.id === visitaId);
    fetch(`${import.meta.env.VITE_API_URL}/solicitudes-agente/accion`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        solicitudVisitaId: visitaId,
        agenteId: agenteId,
        nuevoEstado: "ACEPTADA",
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setMensaje("Visita aceptada con éxito");
        setError(false);
        enviarCorreoCliente(visita);
        fetchVisitas();
        setTimeout(() => setMensaje(null), 3000); // 🔥 aquí desaparece
      })
      .catch(() => {
        setMensaje("Error al aceptar visita");
        setError(true);
      });
  };

  const cancelarVisita = (visitaId) => {
    const confirmar = window.confirm(
      "¿Estás seguro que deseas cancelar esta visita?"
    );
    if (!confirmar) return;

    fetch(`${import.meta.env.VITE_API_URL}/solicitudes-agente/cancelar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        solicitudVisitaId: visitaId,
        agenteId: agenteId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setMensaje("Visita cancelada con éxito");
        setError(false);
        fetchVisitas();
        setTimeout(() => setMensaje(null), 3000); // 🔥 aquí desaparece
      })
      .catch(() => {
        setMensaje("Error al cancelar la visita");
        setError(true);
      });
  };

  const renderVisita = (visita, mostrarBoton = false) => {
    const fechaObj = new Date(visita.fecha);
    const diaSemana = new Intl.DateTimeFormat("es-CL", {
      weekday: "long",
    }).format(fechaObj);
    const fechaFormateada = visita.fecha.split("-").reverse().join("-");

    return (
      <Card key={visita.id}>
        <Texto>
          <strong>Propiedad:</strong>{" "}
          <LinkPropiedad
            href={`${import.meta.env.VITE_API_URL}/propiedad/${
              visita.idPropiedad
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {visita.tituloPropiedad}
          </LinkPropiedad>
        </Texto>

        <Texto>
          <strong>Ubicación:</strong> {visita.direccionPropiedad}
        </Texto>
        <Texto>
          <strong>Cliente:</strong> {visita.nombreCliente}
        </Texto>

        <Texto>
          <strong>Teléfono:</strong>{" "}
          <LinkWhatsapp
            href={`https://wa.me/${visita.telefonoCliente}`}
            target="_blank"
          >
            {visita.telefonoCliente}
            <MessageCircleMore
              size={18}
              style={{ marginLeft: "8px", verticalAlign: "middle" }}
            />
          </LinkWhatsapp>
        </Texto>

        <Texto>
          <strong>Correo:</strong>{" "}
          <Copiable onClick={() => copiarCorreo(visita.correoCliente)}>
            {visita.correoCliente}
            <CopyCheck
              size={16}
              style={{ marginLeft: "8px", verticalAlign: "middle" }}
            />
          </Copiable>
        </Texto>

        <Texto>
          <strong>Fecha:</strong>{" "}
          {diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}{" "}
          {fechaFormateada} a las {visita.hora}
        </Texto>

        {mostrarBoton ? (
          <BotonAceptar onClick={() => aceptarVisita(visita.id)}>
            Aceptar visita
          </BotonAceptar>
        ) : (
          <BotonCancelar onClick={() => cancelarVisita(visita.id)}>
            Cancelar visita
          </BotonCancelar>
        )}
      </Card>
    );
  };

  return (
    <Pagina>
      <Contenido>
        {mensaje && <Mensaje error={error}>{mensaje}</Mensaje>}

        {loading ? (
          <Cargando mensaje={"Cargando visitas..."} />
        ) : (
          <>
            <TituloSeccion>Visitas pendientes</TituloSeccion>
            {pendientes.length === 0 ? (
              <p>No hay visitas pendientes.</p>
            ) : (
              pendientes.map((visita) => renderVisita(visita, true))
            )}

            <TituloSeccion>Visitas aceptadas</TituloSeccion>
            {fechasAceptadas.length === 0 ? (
              <p>No hay visitas aceptadas.</p>
            ) : (
              <>
                <Subtitulo>
                  <FlechaIcono
                    onClick={() =>
                      setFechaIndex((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={fechaIndex === 0}
                    title="Día anterior"
                  >
                    <ChevronLeft />
                  </FlechaIcono>

                  {(() => {
                    const fechaObj = new Date(fechaActual);
                    const dia = new Intl.DateTimeFormat("es-CL", {
                      weekday: "long",
                    }).format(fechaObj);
                    const [yyyy, mm, dd] = fechaActual.split("-");
                    return `${
                      dia.charAt(0).toUpperCase() + dia.slice(1)
                    } ${dd}-${mm}-${yyyy}`;
                  })()}

                  <FlechaIcono
                    onClick={() =>
                      setFechaIndex((prev) =>
                        Math.min(prev + 1, fechasAceptadas.length - 1)
                      )
                    }
                    disabled={fechaIndex === fechasAceptadas.length - 1}
                    title="Día siguiente"
                  >
                    <ChevronRight />
                  </FlechaIcono>
                </Subtitulo>

                {aceptadasPorFecha[fechaActual].map((visita) =>
                  renderVisita(visita)
                )}
              </>
            )}
          </>
        )}
      </Contenido>
    </Pagina>
  );
};

export default VisitasAgente;
