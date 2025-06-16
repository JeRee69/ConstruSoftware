import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 🧱 Estilos
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Title = styled.h1`
  color: #b71c1c;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  }
`;

const PropInfo = styled.p`
  margin: 0.5rem 0;
  color: #444;

  strong {
    color: #222;
  }
`;

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  background-color: ${({ variant }) =>
    variant === "delete" ? "#c62828" : "#d32f2f"};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ variant }) =>
    variant === "delete" ? "#b71c1c" : "#b71c1c"};
  }
`;

const TopButton = styled(Button)`
  max-width: 220px;
  margin: 0 auto 2rem;
  display: block;
`;

const AdminCatalogo = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        if (!usuario || usuario.rol !== "ADMINISTRADOR") {
            navigate("/");
            return;
        }

        fetch("http://localhost:8080/propiedades/disponibles")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar propiedades");
                return res.json();
            })
            .then(setPropiedades)
            .catch((err) => setError(err.message));
    }, []);

    const handleEditar = (id) => {
        navigate(`/admin/editar-propiedad/${id}`);
    };

    const handleEliminar = (id) => {
        if (window.confirm("¿Eliminar esta propiedad?")) {
            fetch(`http://localhost:8080/propiedades/${id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Error al eliminar");
                    setPropiedades((prev) => prev.filter((p) => p.id !== id));
                })
                .catch((err) => alert(err.message));
        }
    };

    const handleAgregar = () => {
        navigate("/admin/nueva-propiedad");
    };

    return (
        <PageWrapper>
            <Container>
                <Title>Panel del Administrador</Title>

                <TopButton onClick={handleAgregar}>Nueva Propiedad</TopButton>

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                <Grid>
                    {propiedades.map((prop) => (
                        <Card key={prop.id}>
                            <div>
                                <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>
                                    {prop.titulo}
                                </h3>
                                <PropInfo>
                                    <strong>Ubicación:</strong> {prop.ubicacion}
                                </PropInfo>
                                <PropInfo>
                                    <strong>Tipo:</strong> {prop.tipo}
                                </PropInfo>
                                <PropInfo>
                                    <strong>Precio:</strong> ${prop.precio}
                                </PropInfo>
                                <PropInfo>
                                    <strong>Disponible:</strong> {prop.disponible ? "Sí" : "No"}
                                </PropInfo>
                            </div>

                            <Actions>
                                <Button onClick={() => handleEditar(prop.id)}>Editar</Button>
                                <Button variant="delete" onClick={() => handleEliminar(prop.id)}>
                                    Eliminar
                                </Button>
                                <Button onClick={() => navigate(`/admin/propiedad/${prop.id}/disponibilidad`)}>
                                    Disponibilidad
                                </Button>
                            </Actions>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </PageWrapper>
    );
};

export default AdminCatalogo;
