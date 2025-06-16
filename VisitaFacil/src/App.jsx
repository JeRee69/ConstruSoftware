import {Route, Routes} from 'react-router-dom';
import Agenda from './components/Agenda';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register';
import Catalogo from './views/Catalogo/Catalogo.jsx';
import VistaPropiedad from './components/VistaPropiedad';
import VisitasAgente from "./components/VisitasAgente.jsx";
import AdminCatalogo from "./components/CatalogoAdmin.jsx";
import NuevaPropiedad from "./components/NuevaPropiedad.jsx";
import RegistrarDisponibilidad from "./components/RegistrarDisponibilidad.jsx";
import RegistrarDisponibilidadAgente from "./components/RegistrarDisponibilidadAgente.jsx";
import BarraNav from "./components/BarraNav/BarraNav.jsx";

function App() {
    return (
        <>
            <BarraNav />

            <Routes>
                <Route path="/" element={<Catalogo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/agente/disponibilidad" element={<RegistrarDisponibilidadAgente />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/propiedad/:id" element={<VistaPropiedad />} />
                <Route path="/admin/nueva-propiedad" element={<NuevaPropiedad />} />
                <Route path="/admin/propiedad/:id/disponibilidad" element={<RegistrarDisponibilidad />} />
                <Route path="/visitas-agente" element={<VisitasAgente />} />
                <Route path="/admin/catalogo" element={<AdminCatalogo />} />
                <Route path="*" element={<h1 style={{ padding: '2rem' }}>Página no encontrada</h1>} />
            </Routes>
        </>
    );
}

export default App;
