import {Route, Routes} from 'react-router-dom';
import Agenda from './components/Agenda';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Catalogo from './components/Catalogo';
import VistaPropiedad from './components/VistaPropiedad';
import VisitasAgente from "./components/VisitasAgente.jsx";
import AdminCatalogo from "./components/CatalogoAdmin.jsx";
import NuevaPropiedad from "./components/NuevaPropiedad.jsx";
import RegistrarDisponibilidad from "./components/RegistrarDisponibilidad.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Catalogo/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<Register/>}/>
            <Route path="/agenda" element={<Agenda/>}/>
            <Route path="/catalogo" element={<Catalogo/>}/>
            <Route path="/propiedad/:id" element={<VistaPropiedad/>}/>
            <Route path="/admin/nueva-propiedad" element={<NuevaPropiedad />} />
            <Route path="*" element={<h1 style={{padding: '2rem'}}>Página no encontrada</h1>}/>
            <Route path="/admin/propiedad/:id/disponibilidad" element={<RegistrarDisponibilidad />} />
            <Route path="/visitas-agente" element={<VisitasAgente />} />
            <Route path="/admin/catalogo" element={<AdminCatalogo />} />
        </Routes>
    );
}

export default App;
