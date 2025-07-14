import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background-color: var(--color-fondo-card);
  box-shadow: 0 2px 10px var(--color-sombra);
  font-family: "Inter", sans-serif;
`;

export const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #d32f2f;
  cursor: pointer;
`;

export const NavSectionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const NavSectionRight = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.2rem;

  a {
    color: var(--color-texto);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;

    &:hover {
      color: #d32f2f;
    }
  }
`;

export const NavButton = styled(RouterLink)`
  background-color: #1c1f2a;
  color: white;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    opacity: 0.85;
  }
`;

export const Saludo = styled.div`
  color: var(--color-texto);
  font-size: 0.85rem;
  text-align: right;
  margin-right: 1rem;
  line-height: 1.2;

  strong {
    font-weight: 600;
    color: var(--color-texto);
  }
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  .dropdown-title {
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    transition: color 0.2s;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 160px;
    z-index: 1000;
    border-radius: 0.5rem;
  }

  .dropdown-content a {
    color: ${({ theme }) => theme.text};
    padding: 0.75rem 1rem;
    display: block;
    text-decoration: none;
  }

  .dropdown-content a:hover {
    background-color: ${({ theme }) => theme.hover};
  }

  &:hover .dropdown-content {
    display: block;
  }

  .dropdown-content button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    padding: 0.75rem 1rem;
    display: block;
    text-align: left;
    width: 100%;
    font: inherit;
    cursor: pointer;
  }

  .dropdown-content button:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;
