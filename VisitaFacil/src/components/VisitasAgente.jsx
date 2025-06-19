import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-secundario);
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 90vh;
  background-color: var(--color-fondo-card);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--color-sombra);
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #d32f2f;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const SidebarTitle = styled.h2`
  margin-bottom: 2rem;
`;

const SidebarItem = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.8rem 0;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Main = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: var(--color-secundario);
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
`;

const VisitCard = styled.div`
  background-color: var(--color-fondo-card);
  border-left: 5px solid #d32f2f;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px var(--color-sombra);
  color: var(--color-texto);
`;

const AcceptButton = styled.button`
  margin-top: 0.5rem;
  background-color: #388e3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2e7d32;
  }
`;

const Mensaje = styled.div`
  background-color: ${({ error }) => (error ? '#ffcdd2' : '#c8e6c9')};
  color: ${({ error }) => (error ? '#b71c1c' : '#2e7d32')};
  padding: 0.8rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const VisitasAgente = () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const agenteId = usuario?.accountId;

    const [pendientes, setPendientes] = useState([]);
    const [confirmadas, setConfirmadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const fetchVisitas = () => {
        fetch(`http://localhost:8080/solicitudes-agente/${agenteId}`)
            .then((res) => res.json())
            .then((data) => {
                const pendientes = data.filter((v) => v.estado === 'PENDIENTE');
                const confirmadas = data.filter((v) => v.estado === 'CONFIRMADA');
                setPendientes(pendientes);
                setConfirmadas(confirmadas);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error al cargar visitas', err);
                setMensaje("Error al cargar visitas");
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (agenteId) {
            fetchVisitas();
        }
    }, [agenteId]);

    const aceptarVisita = (id) => {
        fetch("http://localhost:8080/solicitudes-agente/accion", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                solicitudAgenteId: id,
                nuevoEstado: "CONFIRMADA"
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                setMensaje("Visita confirmada con éxito");
                setError(false);
                fetchVisitas();
            })
            .catch(() => {
                setMensaje("Error al confirmar visita");
                setError(true);
            });
    };

    return (
        <OuterWrapper>
            <Container>
                <Sidebar>
                    <SidebarTitle>PropiedadesPlus</SidebarTitle>
                    <SidebarItem onClick={() => navigate('/agenda')}>Agenda</SidebarItem>
                    <SidebarItem onClick={() => navigate('/visitas-agente')}>Visitas</SidebarItem>
                    <SidebarItem onClick={handleLogout}>Cerrar sesión</SidebarItem>
                </Sidebar>

                <Main>
                    {mensaje && <Mensaje error={error}>{mensaje}</Mensaje>}

                    {loading ? (
                        <p>Cargando visitas...</p>
                    ) : (
                        <>
                            <SectionTitle>Visitas pendientes</SectionTitle>
                            {pendientes.length === 0 ? (
                                <p>No hay visitas pendientes.</p>
                            ) : (
                                pendientes.map((visita) => (
                                    <VisitCard key={visita.id}>
                                        <strong>{visita.nombreCliente}</strong> quiere visitar{" "}
                                        <strong>{visita.direccionPropiedad}</strong><br />
                                        Fecha: {visita.fecha} a las {visita.hora}
                                        <AcceptButton onClick={() => aceptarVisita(visita.id)}>
                                            Aceptar
                                        </AcceptButton>
                                    </VisitCard>
                                ))
                            )}

                            <SectionTitle>Visitas confirmadas</SectionTitle>
                            {confirmadas.length === 0 ? (
                                <p>No hay visitas confirmadas.</p>
                            ) : (
                                confirmadas.map((visita) => (
                                    <VisitCard key={visita.id}>
                                        <strong>{visita.nombreCliente}</strong> -{" "}
                                        <strong>{visita.direccionPropiedad}</strong><br />
                                        Confirmada para el {visita.fecha} a las {visita.hora}
                                    </VisitCard>
                                ))
                            )}
                        </>
                    )}
                </Main>
            </Container>
        </OuterWrapper>
    );
};

export default VisitasAgente;
