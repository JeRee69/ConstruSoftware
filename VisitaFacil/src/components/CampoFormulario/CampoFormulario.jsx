// src/componentes/campo/CampoFormulario.jsx
import React from 'react';
import { Contenedor, Etiqueta, Entrada } from './CampoFormulario.styles.js';

const CampoFormulario = ({ id, label, type = "text", value, onChange, placeholder, required = false }) => (
    <Contenedor>
        <Etiqueta htmlFor={id}>{label}</Etiqueta>
        <Entrada
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    </Contenedor>
);

export default CampoFormulario;