import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    NavContainer,
    Logo,
    NavSectionLeft,
    NavSectionRight,
    NavLinks,
    NavButton
} from './BarraNav.styles';

const BarraNav = () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const logout = () => {
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    return (
        <NavContainer>
            <NavSectionLeft>
                <Logo onClick={() => navigate('/')}>VisitaFácil</Logo>
                <NavLinks>
                    <Link to="/">Catálogo</Link>

                    {usuario?.rol === 'ADMINISTRADOR' && (
                        <>
                            <Link to="/admin/catalogo">Panel de administrador</Link>
                        </>
                    )}

                    {usuario?.rol === 'AGENTE' && (
                        <>
                            <Link to="/agente/disponibilidad">Disponibilidad</Link>
                            <Link to="/visitas-agente">Solicitudes</Link>
                        </>
                    )}
                </NavLinks>
            </NavSectionLeft>

            <NavSectionRight>
                {usuario && (
                    <NavButton as="button" onClick={logout}>Cerrar Sesión</NavButton>
                )}
                {!usuario && <NavButton to="/login">Iniciar Sesión</NavButton>}
            </NavSectionRight>
        </NavContainer>
    );
};

export default BarraNav;
