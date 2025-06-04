import { Route, Routes } from 'react-router-dom';
import Agenda from './components/Agenda';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Catalogo from './components/Catalogo'; // 👈 Asegúrate que el path esté correcto

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registro" element={<Register/>}/>
            <Route path="/agenda" element={<Agenda/>}/>
            <Route path="/catalogo" element={<Catalogo/>}/> {/* 👈 Ruta agregada */}
        </Routes>
    );
}

export default App;
