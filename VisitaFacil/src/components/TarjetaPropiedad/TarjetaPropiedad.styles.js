// src/components/TarjetaPropiedad/TarjetaPropiedad.styles.js
import styled from "styled-components";

export const Card = styled.div`
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

export const PropertyImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const PlaceholderImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
`;

export const PropertyTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

export const Info = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.95rem;
`;

export const Button = styled.button`
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
