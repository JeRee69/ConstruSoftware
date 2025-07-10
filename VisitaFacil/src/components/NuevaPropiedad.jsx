import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css";

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
    const { showSuccess, showError, showLoading, close } = useSweetAlert();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImagenes = (e) => {
        setImagenes(Array.from(e.target.files));
    };    const handleSubmit = async (e) => {
        e.preventDefault();

        showLoading("Creando propiedad", "Guardando la información de la nueva propiedad...");

        try {
            // 1. Crear propiedad
            const response = await fetch(`${import.meta.env.VITE_API_URL}/propiedades`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                close();
                showError(
                    "Error al crear propiedad",
                    "Hubo un problema al crear la propiedad. Por favor, verifica los datos e inténtalo de nuevo.",
                    "Reintentar"
                );
                return;
            }

            const propiedad = await response.json();

            // 2. Subir imágenes (si hay)
            if (imagenes.length > 0) {
                const formData = new FormData();
                imagenes.forEach((img) => formData.append("imagenes", img));

                const uploadResp = await fetch(
                    `${import.meta.env.VITE_API_URL}/propiedades/${propiedad.id}/imagenes`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                close();

                if (!uploadResp.ok) {
                    showError(
                        "Propiedad creada",
                        "La propiedad fue creada exitosamente, pero hubo un error al subir las imágenes. Puedes editarla más tarde para agregar las imágenes.",
                        "Continuar"
                    ).then(() => {
                        navigate("/admin/catalogo");
                    });
                    return;
                }
            } else {
                close();
            }

            showSuccess(
                "¡Propiedad creada!",
                "La nueva propiedad ha sido creada correctamente y está disponible en el catálogo.",
                "Ver catálogo"
            ).then(() => {
                navigate("/admin/catalogo");
            });

        } catch (error) {
            close();
            showError(
                "Error de conexión",
                "No se pudo conectar con el servidor. Revisa tu conexión a internet e inténtalo de nuevo.",
                "Reintentar"
            );
        }
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
