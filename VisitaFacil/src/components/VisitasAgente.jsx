import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  border-bottom: 2px solid #ccc;
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
  background-color: white;
  border-left: 6px solid #d32f2f;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Texto = styled.p`
  margin: 0.3rem 0;
  color: #333;
  font-size: 1rem;
`;

const BotonAceptar = styled.button`
  margin-top: 1rem;
  background-color: #388e3c;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2e7d32;
  }
`;

const Mensaje = styled.div`
  background-color: ${({ error }) => (error ? "#ffcdd2" : "#c8e6c9")};
  color: ${({ error }) => (error ? "#b71c1c" : "#2e7d32")};
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
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
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    color: #aaa;
    cursor: default;
    background: none;
  }

  svg {
    width: 28px;
    height: 28px;
  }
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

    fetch(`http://localhost:8080/solicitudes-agente/${agenteId}`)
        .then((res) => res.json())
        .then((data) => setPendientes(data));

    fetch(`http://localhost:8080/solicitudes-agente/${agenteId}/estado?estado=ACEPTADA`)
        .then((res) => res.json())
        .then((data) => {
          const agrupado = {};
          data.forEach((v) => {
            if (!agrupado[v.fecha]) agrupado[v.fecha] = [];
            agrupado[v.fecha].push(v);
          });

          // Ordenar visitas por hora dentro de cada fecha
          for (const fecha in agrupado) {
            agrupado[fecha].sort((a, b) => a.hora.localeCompare(b.hora));
          }

          const ordenadas = Object.keys(agrupado).sort(); // fechas en orden
          setAceptadasPorFecha(agrupado);
          setFechasAceptadas(ordenadas);
          setFechaIndex(0);
          setLoading(false);
        });
  };

  useEffect(() => {
    if (agenteId) fetchVisitas();
  }, [agenteId]);

  const enviarCorreoCliente = async (visita) => {
    try {
      await fetch("http://localhost:8080/api/notificacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinatario: visita.correoCliente,
          asunto: "Visita Aceptada ✔️",
          mensaje: `
Hola ${visita.nombreCliente},

Tu solicitud para visitar la propiedad en:

📍 ${visita.direccionPropiedad}  
📅 Fecha: ${visita.fecha}  
🕒 Hora: ${visita.hora}

Ha sido aceptada por el agente ✅

Un saludo,  
VisitaFácil
          `,
        }),
      });
    } catch (error) {
      console.error("Error al enviar correo al cliente:", error);
    }
  };

  const aceptarVisita = (visitaId) => {
    const visita = pendientes.find((v) => v.id === visitaId);
    fetch("http://localhost:8080/solicitudes-agente/accion", {
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
        })
        .catch(() => {
          setMensaje("Error al aceptar visita");
          setError(true);
        });
  };

  return (
      <Pagina>
        <Contenido>
          {mensaje && <Mensaje error={error}>{mensaje}</Mensaje>}

          {loading ? (
              <p>Cargando visitas...</p>
          ) : (
              <>
                <TituloSeccion>Visitas pendientes</TituloSeccion>
                {pendientes.length === 0 ? (
                    <p>No hay visitas pendientes.</p>
                ) : (
                    pendientes.map((visita) => (
                        <Card key={visita.id}>
                          <Texto><strong>Cliente:</strong> {visita.nombreCliente}</Texto>
                          <Texto><strong>Propiedad:</strong> {visita.direccionPropiedad}</Texto>
                          <Texto><strong>Fecha:</strong> {visita.fecha} a las {visita.hora}</Texto>
                          <BotonAceptar onClick={() => aceptarVisita(visita.id)}>Aceptar visita</BotonAceptar>
                        </Card>
                    ))
                )}

                <TituloSeccion>Visitas aceptadas</TituloSeccion>
                {fechasAceptadas.length === 0 ? (
                    <p>No hay visitas aceptadas.</p>
                ) : (
                    <>
                      <Subtitulo>
                        <FlechaIcono
                            onClick={() => setFechaIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={fechaIndex === 0}
                            title="Día anterior"
                        >
                          <ChevronLeft />
                        </FlechaIcono>

                        {fechaActual}

                        <FlechaIcono
                            onClick={() => setFechaIndex((prev) => Math.min(prev + 1, fechasAceptadas.length - 1))}
                            disabled={fechaIndex === fechasAceptadas.length - 1}
                            title="Día siguiente"
                        >
                          <ChevronRight />
                        </FlechaIcono>
                      </Subtitulo>

                      {aceptadasPorFecha[fechaActual].map((visita) => (
                          <Card key={visita.id}>
                            <Texto><strong>Cliente:</strong> {visita.nombreCliente}</Texto>
                            <Texto><strong>Propiedad:</strong> {visita.direccionPropiedad}</Texto>
                            <Texto><strong>Hora:</strong> {visita.hora}</Texto>
                          </Card>
                      ))}
                    </>
                )}
              </>
          )}
        </Contenido>
      </Pagina>
  );
};

export default VisitasAgente;
