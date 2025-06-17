// src/components/Cargando/Cargando.jsx
import React from 'react';
import { Spinner, Text, LoaderWrapper } from './Cargando.styles';

const Cargando = ({ mensaje = "Cargando..." }) => (
    <LoaderWrapper>
        <Spinner />
        <Text>{mensaje}</Text>
    </LoaderWrapper>
);

export default Cargando;