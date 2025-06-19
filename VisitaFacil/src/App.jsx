import { Route, Routes } from "react-router-dom";
import Agenda from "./components/Agenda";
import Login from "./views/Login/Login.jsx";
import Registro from "./views/Registro/Registro.jsx";
import Catalogo from "./views/Catalogo/Catalogo.jsx";
import VistaPropiedad from "./components/VistaPropiedad";
import VisitasAgente from "./components/VisitasAgente.jsx";
import NuevaPropiedad from "./components/NuevaPropiedad.jsx";
import RegistrarDisponibilidad from "./components/RegistrarDisponibilidad.jsx";
import RegistrarDisponibilidadAgente from "./components/RegistrarDisponibilidadAgente.jsx";
import BarraNav from "./components/BarraNav/BarraNav.jsx";
import RutaProtegida from "./components/RutaProtegida";
import HistorialVisitas from "./components/HistorialVisitas.jsx";
import ConfirmarVisita from "./components/ConfirmarVisita.jsx";

function App() {
  return (
    <>
      <BarraNav />

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
