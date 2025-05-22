import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
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

const Catalogo = () => {
  const propiedades = [
    {
      id: 1,
      titulo: 'Casa en Las Condes',
      precio: '$350.000.000',
      direccion: 'Av. Apoquindo 4500',
      habitaciones: 4,
      imagen: 'https://source.unsplash.com/400x300/?house',
    },
    {
      id: 2,
      titulo: 'Departamento en Ñuñoa',
      precio: '$180.000.000',
      direccion: 'Irarrázaval 1234',
      habitaciones: 2,
      imagen: 'https://source.unsplash.com/400x300/?apartment',
    },
    {
      id: 3,
      titulo: 'Parcela en Chicureo',
      precio: '$700.000.000',
      direccion: 'Camino Chicureo KM 8',
      habitaciones: 5,
      imagen: 'https://source.unsplash.com/400x300/?cottage',
    },
  ];

  return (
    <Container>
      <Title>Catálogo de Propiedades</Title>
      <Grid>
        {propiedades.map((propiedad) => (
          <Card key={propiedad.id}>
            <Image src={propiedad.imagen} alt={propiedad.titulo} />
            <CardContent>
              <PropertyTitle>{propiedad.titulo}</PropertyTitle>
              <Info><strong>Precio:</strong> {propiedad.precio}</Info>
              <Info><strong>Dirección:</strong> {propiedad.direccion}</Info>
              <Info><strong>Habitaciones:</strong> {propiedad.habitaciones}</Info>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Catalogo;
