import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #d32f2f;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.3rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #b71c1c;
  }
`;

const NuevaPropiedad = () => {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        tipo: "",
        ubicacion: "",
        disponible: true,
    });

    const [imagenes, setImagenes] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImagenes = (e) => {
        setImagenes(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Crear propiedad
        const response = await fetch("http://localhost:8080/propiedades", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            alert("Error al crear propiedad");
            return;
        }

        const propiedad = await response.json();

        // 2. Subir imágenes (si hay)
        if (imagenes.length > 0) {
            const formData = new FormData();
            imagenes.forEach((img) => formData.append("imagenes", img));

            const uploadResp = await fetch(
                `http://localhost:8080/propiedades/${propiedad.id}/imagenes`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!uploadResp.ok) {
                alert("Propiedad creada, pero error al subir imágenes");
            }
        }

        alert("Propiedad creada correctamente");
        navigate("/admin/catalogo");
    };

    return (
        <Container>
            <Title>Agregar Nueva Propiedad</Title>
            <form onSubmit={handleSubmit}>
                <Label>Título</Label>
                <Input name="titulo" value={form.titulo} onChange={handleChange} required />

                <Label>Descripción</Label>
                <TextArea name="descripcion" value={form.descripcion} onChange={handleChange} rows={4} />

                <Label>Precio</Label>
                <Input
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    required
                />

                <Label>Tipo</Label>
                <Input name="tipo" value={form.tipo} onChange={handleChange} />

                <Label>Ubicación</Label>
                <Input name="ubicacion" value={form.ubicacion} onChange={handleChange} required />

                <Label>
                    <input
                        type="checkbox"
                        name="disponible"
                        checked={form.disponible}
                        onChange={handleChange}
                    />
                    Disponible
                </Label>

                <Label>Imágenes</Label>
                <Input type="file" accept="image/*" multiple onChange={handleImagenes} />

                <Button type="submit">Crear Propiedad</Button>
            </form>
        </Container>
    );
};

export default NuevaPropiedad;
