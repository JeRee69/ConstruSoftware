import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  border-radius: 8px;
  margin-top: 3rem;
`;

const Imagen = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const Titulo = styled.h2`
  color: #d32f2f;
  margin-top: 1rem;
`;

const Info = styled.p`
  color: #333;
  margin: 0.5rem 0;
`;

const VistaPropiedad = () => {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/propiedades/${id}`)
      .then(res => res.json())
      .then(data => setPropiedad(data))
      .catch(err => console.error('Error:', err));
  }, [id]);

  if (!propiedad) return <p style={{ textAlign: 'center' }}>Cargando propiedad...</p>;

  return (
    <Wrapper>
      <Imagen src={`https://source.unsplash.com/800x400/?house,${id}`} alt={propiedad.titulo} />
      <Titulo>{propiedad.titulo}</Titulo>
      <Info><strong>Precio:</strong> ${propiedad.precio}</Info>
      <Info><strong>Ubicación:</strong> {propiedad.ubicacion}</Info>
      <Info><strong>Tipo:</strong> {propiedad.tipo}</Info>
      <Info><strong>Disponible:</strong> {propiedad.disponible ? 'Sí' : 'No'}</Info>
      <Info><strong>Descripción:</strong> {propiedad.descripcion}</Info>
    </Wrapper>
  );
};

export default VistaPropiedad;
