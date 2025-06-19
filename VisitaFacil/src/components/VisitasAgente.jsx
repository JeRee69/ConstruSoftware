import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 90vh;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  background-color: #eeeeee;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
`;

const VisitCard = styled.div`
  background-color: #ffffff;
  border-left: 5px solid #d32f2f;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
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

const VisitasAgente = () => {
    const navigate = useNavigate();
    const agenteId = localStorage.getItem('agenteId'); // o sacarlo del login

    const [pendientes, setPendientes] = useState([]);
    const [confirmadas, setConfirmadas] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/Login');
    };

    useEffect(() => {
        fetch(`/solicitudes-agente/${agenteId}`)
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
                setLoading(false);
            });
    }, [agenteId]);

    const aceptarVisita = (id) => {
        console.log(`Aceptar visita ${id}`);
        // Aquí iría el POST/PUT al backend para aceptar la solicitud
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
                    {loading ? (
                        <p>Cargando visitas...</p>
                    ) : (
                        <>
                            <SectionTitle>Visitas pendientes</SectionTitle>
                            {pendientes.length === 0 ? <p>No hay visitas pendientes.</p> : pendientes.map((visita) => (
                                <VisitCard key={visita.id}>
                                    <strong>{visita.nombreCliente}</strong> quiere visitar <strong>{visita.direccionPropiedad}</strong><br />
                                    Fecha: {visita.fecha} a las {visita.hora}
                                    <AcceptButton onClick={() => aceptarVisita(visita.id)}>Aceptar</AcceptButton>
                                </VisitCard>
                            ))}

                            <SectionTitle>Visitas confirmadas</SectionTitle>
                            {confirmadas.length === 0 ? <p>No hay visitas confirmadas.</p> : confirmadas.map((visita) => (
                                <VisitCard key={visita.id}>
                                    <strong>{visita.nombreCliente}</strong> - <strong>{visita.direccionPropiedad}</strong><br />
                                    Confirmada para el {visita.fecha} a las {visita.hora}
                                </VisitCard>
                            ))}
                        </>
                    )}
                </Main>
            </Container>
        </OuterWrapper>
    );
};

export default VisitasAgente;
