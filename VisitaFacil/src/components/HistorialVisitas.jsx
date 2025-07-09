import { useState } from "react";
import styled from "styled-components";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css";

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: var(--color-secundario);
  padding: 2rem;
  color: var(--color-texto);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Titulo = styled.h2`
  color: var(--color-primario);
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

const FormContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const InputCorreo = styled.input`
  padding: 12px 16px;
  width: 300px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-fondo-card);
  color: var(--color-texto);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-primario);
    box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.1);
  }

  &::placeholder {
    color: var(--color-texto);
    opacity: 0.6;
  }
`;

const BotonBuscar = styled.button`
  padding: 12px 20px;
  background-color: var(--color-primario);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b72a2a;
  }

  &:disabled {
    background-color: var(--color-border);
    cursor: not-allowed;
  }
`;

const ListaVisitas = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 1000px;
`;

const ItemVisita = styled.li`
  background-color: var(--color-fondo-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0px 2px 6px var(--color-sombra);

  h3 {
    margin-bottom: 0.5rem;
    color: var(--color-texto);
    font-size: 1.3rem;
  }

  p {
    margin: 0.5rem 0;
    color: var(--color-texto);

    strong {
      color: var(--color-texto);
    }
  }
`;

const ImagenPropiedad = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid var(--color-border);
`;

const MensajeCarga = styled.p`
  color: var(--color-texto);
  opacity: 0.7;
  font-style: italic;
  text-align: center;
  margin: 2rem 0;
`;

const MensajeVacio = styled.p`
  color: var(--color-texto);
  opacity: 0.7;
  font-style: italic;
  text-align: center;
  margin: 2rem 0;
  font-size: 1.1rem;
`;

const HistorialVisitas = () => {
  const [correo, setCorreo] = useState("");
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const { showWarning, showError, showLoading, close, showInfo } = useSweetAlert();

  const handleBuscar = async () => {
    if (!correo) {
      showWarning(
        "Correo requerido",
        "Por favor ingresa un correo electrónico válido para buscar tu historial.",
        "Entendido"
      );
      return;
    }

    setLoading(true);
    showLoading("Buscando historial", "Consultando tus visitas programadas...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/visitas/historial?correo=${correo}`);
      const data = await response.json();

      close();
      setVisitas(data);
      setMostrarHistorial(true);

      if (data.length === 0) {
        showInfo(
          "Sin visitas registradas",
          "No se encontraron visitas asociadas a este correo electrónico.",
          "OK"
        );
      }
    } catch (error) {
      console.error("Error al obtener historial:", error);
      close();
      showError(
        "Error en la búsqueda",
        "Hubo un problema al buscar el historial. Verifica el correo ingresado o la conexión al servidor.",
        "Reintentar"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Titulo>Consultar Historial de Visitas</Titulo>

      <FormContainer>
        <InputCorreo
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
        />
        <BotonBuscar 
          onClick={handleBuscar}
          disabled={loading}
        >
          Ver historial
        </BotonBuscar>
      </FormContainer>

      {loading && <MensajeCarga>Cargando historial...</MensajeCarga>}

      {mostrarHistorial && (
        <>
          {visitas.length === 0 ? (
            <MensajeVacio>No hay visitas registradas para este correo.</MensajeVacio>
          ) : (
            <ListaVisitas>
              {visitas.map((visita) => (
                <ItemVisita key={visita.id}>
                  <h3>{visita.propiedad.titulo}</h3>
                  <p><strong>Fecha:</strong> {visita.fecha}</p>
                  <p><strong>Hora:</strong> {visita.horaInicio}</p>
                  <p><strong>Estado:</strong> {visita.estado}</p>
                  {visita.propiedad.urlsImagenes?.[0] && (
                    <ImagenPropiedad
                      src={visita.propiedad.urlsImagenes[0]}
                      alt="Imagen propiedad"
                    />
                  )}
                </ItemVisita>
              ))}
            </ListaVisitas>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default HistorialVisitas;
