import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #b30000;
  color: white;

  .left,
  .right {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    padding-right: 1rem;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #ffe6e6;
    }
  }

  button {
    background: none;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: #ffcccc;
    }
  }
`;
