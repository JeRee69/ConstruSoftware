import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {NavContainer} from './BarraNav.styles.js';

const BarraNav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <NavContainer>
            <div className="left">
                <Link to="/">Inicio</Link>
            </div>

            <div className="right">
                {!token && <Link to="/login">Iniciar Sesión</Link>}

                {token && rol === 'ADMIN' && (
                    <>
                        <Link to="/admin/catalogo">Propiedades</Link>
                        <Link to="/admin/nueva-propiedad">Nueva Propiedad</Link>
                        <Link to="/admin/crear-agente">Crear Agente</Link>
                        <button onClick={logout}>Cerrar Sesión</button>
                    </>
                )}

                {token && rol === 'AGENTE' && (
                    <>
                        <Link to="/agente/disponibilidad">Disponibilidad</Link>
                        <Link to="/visitas-agente">Solicitudes</Link>
                        <button onClick={logout}>Cerrar Sesión</button>
                    </>
                )}
            </div>
        </NavContainer>
    );
};

export default BarraNav;
