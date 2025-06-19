import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Agenda from "./components/Agenda";
import BarraNav from "./components/BarraNav/BarraNav.jsx";
import ConfirmarVisita from "./components/ConfirmarVisita.jsx";
import HistorialVisitas from "./components/HistorialVisitas.jsx";
import NuevaPropiedad from "./components/NuevaPropiedad.jsx";
import RegistrarDisponibilidad from "./components/RegistrarDisponibilidad.jsx";
import RegistrarDisponibilidadAgente from "./components/RegistrarDisponibilidadAgente.jsx";
import RutaProtegida from "./components/RutaProtegida";
import VisitasAgente from "./components/VisitasAgente.jsx";
import VistaPropiedad from "./components/VistaPropiedad";
import Catalogo from "./views/Catalogo/Catalogo.jsx";
import Login from "./views/Login/Login.jsx";
import Registro from "./views/Registro/Registro.jsx";

function App() {
  const [temaOscuro, setTemaOscuro] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (temaOscuro) {
      root.style.setProperty("--color-secundario", "#121212");
      root.style.setProperty("--color-texto", "#f5f5f5");
      root.style.setProperty("--color-primario", "#d32f2f");
      root.style.setProperty("--color-fondo-claro", "#1e1e1e");
      root.style.setProperty("--color-fondo-card", "#2c2c2c");
      root.style.setProperty("--color-border", "#444444");
      root.style.setProperty("--color-sombra", "rgba(255, 255, 255, 0.1)");
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#f5f5f5";
    } else {
      root.style.setProperty("--color-secundario", "#f9f9f9");
      root.style.setProperty("--color-texto", "#212121");
      root.style.setProperty("--color-primario", "#d32f2f");
      root.style.setProperty("--color-fondo-claro", "#ffffff");
      root.style.setProperty("--color-fondo-card", "#ffffff");
      root.style.setProperty("--color-border", "#e0e0e0");
      root.style.setProperty("--color-sombra", "rgba(0, 0, 0, 0.1)");
      document.body.style.backgroundColor = "#f9f9f9";
      document.body.style.color = "#212121";
    }
  }, [temaOscuro]);

  return (
    <>
      <BarraNav temaOscuro={temaOscuro} setTemaOscuro={setTemaOscuro} />

      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/propiedad/:id" element={<VistaPropiedad />} />
        <Route path="/historial" element={<HistorialVisitas />} />
        <Route path="/confirmar-visita" element={<ConfirmarVisita />} />
        <Route
          path="*"
          element={<h1 style={{ padding: "2rem" }}>Página no encontrada</h1>}
        />

        {/* Rutas protegidas para AGENTE */}
        <Route
          path="/agente/disponibilidad"
          element={
            <RutaProtegida rolRequerido="AGENTE">
              <RegistrarDisponibilidadAgente />
            </RutaProtegida>
          }
        />
        <Route
          path="/visitas-agente"
          element={
            <RutaProtegida rolRequerido="AGENTE">
              <VisitasAgente />
            </RutaProtegida>
          }
        />

        {/* Rutas protegidas para ADMINISTRADOR */}

        <Route
          path="/admin/nueva-propiedad"
          element={
            <RutaProtegida rolRequerido="ADMINISTRADOR">
              <NuevaPropiedad />
            </RutaProtegida>
          }
        />
        <Route
          path="/admin/propiedad/:id/disponibilidad"
          element={
            <RutaProtegida rolRequerido="ADMINISTRADOR">
              <RegistrarDisponibilidad />
            </RutaProtegida>
          }
        />

        <Route
          path="*"
          element={<h1 style={{ padding: "2rem" }}>Página no encontrada</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
