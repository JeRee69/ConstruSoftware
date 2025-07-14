import { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const TituloSeccion = styled.h2`
  color: var(--color-texto);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
`;

const MensajeVacio = styled.p`
  color: var(--color-texto);
  opacity: 0.7;
  font-style: italic;
  text-align: center;
  margin: 2rem 0;
`;

const ListaVisitasPorFecha = ({
                                  titulo,
                                  fechas,
                                  visitasPorFecha,
                                  renderVisita,
                              }) => {
    const [indice, setIndice] = useState(0);

    if (!fechas || fechas.length === 0) {
        return (
            <>
                <TituloSeccion>{titulo}</TituloSeccion>
                <MensajeVacio>No hay visitas para mostrar.</MensajeVacio>
            </>
        );
    }

    const fechaActual = fechas[indice];
    const fechaObj = new Date(fechaActual);
    const dia = new Intl.DateTimeFormat("es-CL", {
        weekday: "long",
    }).format(fechaObj);
    const [yyyy, mm, dd] = fechaActual.split("-");
    const fechaFormateada = `${dia.charAt(0).toUpperCase() + dia.slice(1)} ${dd}-${mm}-${yyyy}`;

    return (
        <>
            <TituloSeccion>{titulo}</TituloSeccion>
            <Subtitulo>
                <FlechaIcono
                    onClick={() => setIndice((prev) => Math.max(prev - 1, 0))}
                    disabled={indice === 0}
                    title="Día anterior"
                >
                    <ChevronLeft />
                </FlechaIcono>

                {fechaFormateada}

                <FlechaIcono
                    onClick={() => setIndice((prev) => Math.min(prev + 1, fechas.length - 1))}
                    disabled={indice === fechas.length - 1}
                    title="Día siguiente"
                >
                    <ChevronRight />
                </FlechaIcono>
            </Subtitulo>

            {visitasPorFecha[fechaActual].map((visita) => renderVisita(visita))}
        </>
    );
};

export default ListaVisitasPorFecha;
