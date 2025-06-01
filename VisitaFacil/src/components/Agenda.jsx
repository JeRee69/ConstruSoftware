import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
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
  background-color: #f9f9f9;
`;

const Header = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  background-color: white;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const Agenda = () => {
    const tasks = [
        {id: 1, title: 'Reunión con cliente', time: '10:00 AM'},
        {id: 2, title: 'Visita a propiedad', time: '1:00 PM'},
        {id: 3, title: 'Seguimiento por correo', time: '4:30 PM'},
    ];

    return (
        <Container>
            <Sidebar>
                <SidebarTitle>PropiedadesPlus</SidebarTitle>
                <SidebarItem>Agenda</SidebarItem>
                <SidebarItem>Propiedades</SidebarItem>
                <SidebarItem>Configuración</SidebarItem>
                <SidebarItem>Cerrar sesión</SidebarItem>
            </Sidebar>

            <Main>
                <Header>Agenda del día</Header>
                <TaskList>
                    {tasks.map((task) => (
                        <TaskItem key={task.id}>
                            <strong>{task.title}</strong> <br/>
                            <small>{task.time}</small>
                        </TaskItem>
                    ))}
                </TaskList>
            </Main>
        </Container>
    );
};

export default Agenda;
