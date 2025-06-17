import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Agenda from "./components/Agenda";
import Catalogo from "./components/Catalogo";
import VistaPropiedad from "./components/VistaPropiedad";
import NotificacionEmail from "./components/NotificacionEmail";
import Index from "./components/Index";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/notificacion-email" element={<NotificacionEmail />} />
        <Route path="/propiedad/:id" element={<VistaPropiedad />} />
        <Route
          path="*"
          element={<h1 style={{ padding: "2rem" }}>Página no encontrada</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
