import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Usermenu from "./common/Usermenu.jsx";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  min-height: 100vh;
  width: 100vw;
  padding: 40px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px; /* más ancho para mejor distribución */
  background-color: #f9f9f9;
  padding: 2rem;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* responsive */
  gap: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  padding: 1rem;

  &:hover {
    transform: scale(1.02);
    border: 2px solid #d32f2f;
  }
`;

const PropertyTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const Info = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.95rem;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;

const Catalogo = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/propiedades/disponibles")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar propiedades");
        }
        return res.json();
      })
      .then((data) => {
        setPropiedades(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  return (
    <PageWrapper>
      <Container>
        <Title>Catálogo de Propiedades</Title>

        {cargando && <p>Cargando propiedades...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!cargando && !error && propiedades.length === 0 && (
          <p>No hay propiedades disponibles.</p>
        )}

        <Grid>
          {propiedades.map((prop) => {
            const primeraImagen =
              prop.urlsImagenes && prop.urlsImagenes.length > 0
                ? prop.urlsImagenes[0].trim()
                : null;

            return (
              <Card key={prop.id}>
                {primeraImagen ? (
                  <img
                    src={primeraImagen}
                    alt={`${prop.titulo} imagen principal`}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}
                    onError={(e) => {
                      e.target.src = "/imagen-no-disponible.png";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "180px",
                      backgroundColor: "#ddd",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                  >
                    Sin imagen
                  </div>
                )}

                <PropertyTitle>{prop.titulo}</PropertyTitle>
                <Info>{prop.descripcion}</Info>
                <Info>
                  <strong>Precio:</strong> ${prop.precio}
                </Info>
                <Info>
                  <strong>Tipo:</strong> {prop.tipo}
                </Info>
                <Info>
                  <strong>Ubicación:</strong> {prop.ubicacion}
                </Info>
                <Info>
                  <strong>Disponible:</strong> {prop.disponible ? "Sí" : "No"}
                </Info>
                <Button onClick={() => navigate(`/propiedad/${prop.id}`)}>
                  Ver Detalles
                </Button>
              </Card>
            );
          })}
        </Grid>
      </Container>

      <Usermenu />
    </PageWrapper>
  );
};

export default Catalogo;
