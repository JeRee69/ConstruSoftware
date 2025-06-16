import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from '../../themes/theme';

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    background-color: ${({theme}) => theme.background};
`;

const LoginForm = styled.div`
    background-color: ${({theme}) => theme.formBackground};
    padding: 2.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Logo = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    color: ${({theme}) => theme.buttonBackground};
    font-size: 1.8rem;
    font-weight: bold;
`;

const ToggleButton = styled.button`
    background: none;
    color: ${({theme}) => theme.text};
    border: 1px solid ${({theme}) => theme.inputBorder};
    padding: 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 1rem;
    border-radius: 4px;

    &:hover {
        background-color: ${({theme}) => theme.inputBackground};
    }
`;

const InputField = styled.div`
    margin-bottom: 1.5rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: ${({theme}) => theme.text};
    font-size: 0.9rem;
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 0.8rem;
    background-color: ${({theme}) => theme.inputBackground};
    color: ${({theme}) => theme.text};
    border: 1px solid ${({theme}) => theme.inputBorder};
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
        border-color: ${({theme}) => theme.buttonBackground};
        outline: none;
    }
`;

const Button = styled.button`
    box-sizing: border-box;
    width: 100%;
    padding: 0.9rem 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    background-color: ${({theme}) => theme.buttonBackground};
    color: ${({theme}) => theme.buttonText};
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;

    &:hover {
        background-color: #b71c1c;
    }

    &:disabled {
        background-color: #e0e0e0;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: #d32f2f;
    font-size: 0.9rem;
    margin-top: 1rem;
    text-align: center;
`;

const RegisterLink = styled.div`
    text-align: center;
    margin-top: 1.5rem;
    color: ${({theme}) => theme.text};

    a {
        color: ${({theme}) => theme.buttonBackground};
        text-decoration: none;
        font-weight: 500;
        margin-left: 0.3rem;
        transition: color 0.2s;

        &:hover {
            color: #b71c1c;
            text-decoration: underline;
        }
    }
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? darkTheme : lightTheme;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/account/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            if (response.status === 200) {
                const data = await response.json(); // { accountId, rol }

                localStorage.setItem('usuario', JSON.stringify(data));

                switch (data.rol) {
                    case 'ADMINISTRADOR':
                        navigate('/admin/catalogo');
                        break;
                    case 'AGENTE':
                        navigate('/agenda');
                        break;
                    case 'CLIENTE':
                    default:
                        navigate('/catalogo');
                        break;
                }

            } else if (response.status === 401) {
                setError('Credenciales incorrectas. Por favor, intente nuevamente.');
            } else {
                setError('Error inesperado. Intente más tarde.');
            }
        } catch {
            setError('Ocurrió un error al iniciar sesión. Intente más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <LoginContainer>
                <LoginForm>
                    <ToggleButton onClick={() => setIsDark(!isDark)}>
                        Cambiar a tema {isDark ? 'claro' : 'oscuro'}
                    </ToggleButton>

                    <Logo>PropiedadesPlus</Logo>
                    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                        <InputField>
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="correo@ejemplo.com"
                            />
                        </InputField>

                        <InputField>
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </InputField>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </Button>

                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <RegisterLink>
                            ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
                        </RegisterLink>
                    </form>
                </LoginForm>
            </LoginContainer>
        </ThemeProvider>
    );
};

export default Login;
