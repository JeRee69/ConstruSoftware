import { useNavigate } from 'react-router-dom'; // ✅ Importa useNavigate
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const TaskItem = styled.li`
  background-color: white;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const Agenda = () => {
  const navigate = useNavigate(); // ✅ Hook para redirección

  const handleLogout = () => {
    localStorage.clear(); // ✅ Limpiar datos almacenados
    navigate('/Login');   // ✅ Redirigir al login
  };

  const tasks = [
    { id: 1, title: 'Reunión con cliente', time: '10:00 AM' },
    { id: 2, title: 'Visita a propiedad', time: '1:00 PM' },
    { id: 3, title: 'Seguimiento por correo', time: '4:30 PM' },
  ];

  return (
    <OuterWrapper>
      <Container>
        <Sidebar>
          <SidebarTitle>PropiedadesPlus</SidebarTitle>
          <SidebarItem>Agenda</SidebarItem>
          <SidebarItem>Propiedades</SidebarItem>
          <SidebarItem>Configuración</SidebarItem>
          <SidebarItem onClick={handleLogout}>Cerrar sesión</SidebarItem>
        </Sidebar>

        <Main>
          <MainContent>
            <Header>Agenda del día</Header>
            <TaskList>
              {tasks.map((task) => (
                <TaskItem key={task.id}>
                  <strong>{task.title}</strong> <br />
                  <small>{task.time}</small>
                </TaskItem>
              ))}
            </TaskList>
          </MainContent>
        </Main>
      </Container>
    </OuterWrapper>
  );
};

export default Agenda;
