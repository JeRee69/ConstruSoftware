// src/componentes/RutaProtegida.jsx
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children, rolRequerido }) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (rolRequerido && usuario.rol !== rolRequerido) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RutaProtegida;
