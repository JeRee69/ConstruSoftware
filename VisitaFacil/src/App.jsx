import { Route, Routes } from 'react-router-dom';
import Agenda from './components/Agenda';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Catalogo from './components/Catalogo';
import VistaPropiedad from './components/VistaPropiedad';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/registro" element={<Register />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/catalogo" element={<Catalogo />} />
    | <Route path="/propiedad/:id" element={<VistaPropiedad />} />
      <Route path="*" element={<h1 style={{ padding: '2rem' }}>Página no encontrada</h1>} />

    </Routes>
  );
}

export default App;
