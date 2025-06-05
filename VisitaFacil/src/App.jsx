import { Route, Routes } from 'react-router-dom';
import Agenda from './components/Agenda';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Catalogo from './components/Catalogo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} /> {/* Necesaria para logout */}
      <Route path="/registro" element={<Register />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/catalogo" element={<Catalogo />} />
    </Routes>
  );
}

export default App;
