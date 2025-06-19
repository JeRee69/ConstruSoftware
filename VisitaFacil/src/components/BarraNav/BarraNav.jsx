import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import {
    Logo,
    NavButton,
    NavContainer,
    NavLinks,
    NavSectionLeft,
    NavSectionRight,
    Saludo
} from './BarraNav.styles';

const BarraNav = ({ temaOscuro, setTemaOscuro }) => {
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



                    {usuario?.rol === 'AGENTE' && (
                        <>
                            <Link to="/agente/disponibilidad">Disponibilidad</Link>
                            <Link to="/visitas-agente">Solicitudes</Link>
                        </>
                    )}
                </NavLinks>
            </NavSectionLeft>            <NavSectionRight>
                <ThemeToggle temaOscuro={temaOscuro} setTemaOscuro={setTemaOscuro} />
                {usuario && (
                    <>
                        <Saludo>
                            Hola,<br />
                            <strong>{usuario.rol === "ADMINISTRADOR" ? "Admin" : usuario.nombre}</strong>
                        </Saludo>
                        <NavButton as="button" onClick={logout}>Cerrar Sesión</NavButton>
                    </>
                )}
                {!usuario && <NavButton to="/login">Iniciar Sesión</NavButton>}
            </NavSectionRight>
        </NavContainer>
    );
};

export default BarraNav;
