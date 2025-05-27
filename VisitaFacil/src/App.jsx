import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Agenda from './components/Agenda';
import Catalogo from './components/Catalogo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/catalogo" element={<Catalogo />} />
    </Routes>
  );
}

export default App;
