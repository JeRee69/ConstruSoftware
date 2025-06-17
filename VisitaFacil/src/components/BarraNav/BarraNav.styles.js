import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  font-family: 'Inter', sans-serif;
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
    color: #444;
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
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;
