    import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #d32f2f;
  color: white;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const Dropdown = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  background-color: white;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 0.8rem 1rem;
  min-width: 180px;
  z-index: 999;
  text-align: left;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 0.95rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #d32f2f;
  }
`;

const Usermenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem("nombre") || "Usuario";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {open && (
        <Dropdown>
          <DropdownItem><strong>{nombreUsuario}</strong></DropdownItem>
          <DropdownItem onClick={handleLogout}>Cerrar sesión</DropdownItem>
        </Dropdown>
      )}
      <FloatingButton onClick={() => setOpen(!open)}>
        {nombreUsuario[0] || "U"}
      </FloatingButton>
    </>
  );
};

export default Usermenu;
