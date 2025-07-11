// src/vistas/registro/registro.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    RegisterContainer,
    RegisterForm,
    Logo,
    InputField,
    Label,
    Input,
    Button,
    ErrorMessage,
    LoginLink
} from './Registro.styles.js';

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsLoading(false);
            return;
        }

        if (!/^\d{8}$/.test(formData.telefono)) {
            setError('El número debe tener 8 dígitos después de +569.');
            setIsLoading(false);
            return;
        }

        const payload = {
            email: formData.email,
            password: formData.password,
            name: `${formData.nombre} ${formData.apellido}`,
            phone: "+569" + formData.telefono
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/account/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Error al registrar el usuario.');
                return;
            }

            navigate('/', { state: { registrationSuccess: true } });
        } catch (err) {
            setError('Ocurrió un error al registrar. Por favor, intente más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegisterContainer>
            <RegisterForm>
                <Logo>VisitaFácil</Logo>
                <form onSubmit={handleSubmit}>
                    <InputField>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej: Juan" />
                    </InputField>

                    <InputField>
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Ej: Pérez" />
                    </InputField>

                    <InputField>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="corredor@propiedades.com" />
                    </InputField>

                    <InputField>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{
                                marginRight: "8px",
                                
                                fontSize: "1rem",
                                lineHeight: "2.2",
                                height: "38px",
                                display: "flex",
                                alignItems: "center"
                            }}>+569</span>
                            <Input
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={e => {
                                    // Solo permite números y máximo 8 dígitos
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                                    setFormData(prev => ({ ...prev, telefono: value }));
                                }}
                                required
                                placeholder="12345678"
                                maxLength={8}
                                style={{ width: "100%", marginBottom: 0 }}
                            />
                        </div>
                    </InputField>

                    <InputField>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" minLength="6" />
                    </InputField>

                    <InputField>
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <Input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" />
                    </InputField>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </Button>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <LoginLink>
                        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </LoginLink>
                </form>
            </RegisterForm>
        </RegisterContainer>
    );
};

export default Registro;
