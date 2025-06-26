import styled from "styled-components";

export const Card = styled.div`
  background: var(--color-fondo-card);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 16px var(--color-sombra);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  transition: transform 0.2s, box-shadow 0.2s;
  max-width: 340px;
  color: var(--color-texto);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px var(--color-sombra);
  }
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 1rem;
`;

export const PropertyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-texto);
  margin-bottom: 0.5rem;
`;

export const MetaInfo = styled.p`
  font-size: 0.9rem;
  color: var(--color-texto);
  opacity: 0.8;
  margin: 0.2rem 0;
  /* sin label, solo texto */
`;

export const Price = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-texto);
  margin-top: 0.6rem;
`;


export const SmallButton = styled.button`
  background: none;
  color: #1c1f2a;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
    font-family: 'Inter', sans-serif;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(28, 31, 42, 0.05);
  }
`;

export const ImagenWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
`;

export const FlechaIzquierda = styled.button`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(0,0,0,0.6);
  }
`;

export const FlechaDerecha = styled(FlechaIzquierda)`
  left: auto;
  right: 8px;
`;

export const PlaceholderSinImagen = styled.div`
  width: 100%;
  height: 180px;
  background-color: var(--color-border);
  color: var(--color-texto);
  opacity: 0.6;
  font-style: italic;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-transform: uppercase;
  overflow: hidden;

  &::before {
    content: "Sin imagen";
    position: absolute;
    transform: rotate(-45deg);
    font-size: 1.2rem;
    color: var(--color-texto);
    opacity: 0.4;
  }
`;

export const Footer = styled.div`
  margin-top: auto;
  padding: 0 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AdminIconos = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const Icono = styled.button`
  background: none;
  border: none;
  color: var(--color-texto);
  opacity: 0.7;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s;

  &:hover {
    color: #d32f2f;
    opacity: 1;
  }
`;

