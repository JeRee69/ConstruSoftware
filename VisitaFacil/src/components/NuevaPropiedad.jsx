import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css";

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Titulo = styled.h2`
  color: #d32f2f;
  text-align: center;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  overflow-y: auto;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #333;
  font-weight: 500;
`;

const ImagenesPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  div {
    position: relative;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }

  button {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff4d4d;
    border: none;
    border-radius: 50%;
    color: white;
    width: 22px;
    height: 22px;
    font-size: 14px;
    cursor: pointer;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #efefef;
  color: #444;
  border: 2px dashed #ccc;
  border-radius: 0.7rem;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #fbe9e7;
    border-color: #d32f2f;
    color: #d32f2f;
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #d32f2f;
  color: white;
  padding: 0.9rem;
  border: none;
  border-radius: 0.6rem;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c62828;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #fbe9e7;
  }
`;

const formatPrecio = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const number = parseInt(cleaned || "0", 10);
    return number.toLocaleString("es-CL");
};

const NuevaPropiedad = () => {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        tipo: "Casa",
        ubicacion: "",
        disponible: true,
    });

    const [imagenes, setImagenes] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const textareaRef = useRef();
    const navigate = useNavigate();
    const { showSuccess, showError, showLoading, close } = useSweetAlert();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePrecioChange = (e) => {
        const rawValue = e.target.value.replace(/\./g, "");
        if (rawValue === "" || parseInt(rawValue) <= 10000000000) {
            const formatted = formatPrecio(rawValue);
            setForm((prev) => ({ ...prev, precio: formatted }));
        }
    };

    const handleImagenes = (e) => {
        const files = Array.from(e.target.files);
        setImagenes((prev) => [...prev, ...files]);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prev) => [...prev, ...newPreviews]);
    };

    const removeImagen = (index) => {
        setImagenes((prev) => prev.filter((_, i) => i !== index));
        setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        showLoading("Creando propiedad", "Guardando la información de la nueva propiedad...");

        try {
            const cleanForm = {
                ...form,
                precio: form.precio.replace(/\./g, ""),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/propiedades`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanForm),
            });

            if (!response.ok) {
                close();
                showError("Error al crear propiedad", "Revisa los datos e inténtalo de nuevo.", "Reintentar");
                return;
            }

            const propiedad = await response.json();

            if (imagenes.length > 0) {
                const formData = new FormData();
                imagenes.forEach((img) => formData.append("imagenes", img));

                const uploadResp = await fetch(`${import.meta.env.VITE_API_URL}/propiedades/${propiedad.id}/imagenes`, {
                    method: "POST",
                    body: formData,
                });

                close();

                if (!uploadResp.ok) {
                    showError("Propiedad creada", "Error al subir imágenes. Puedes agregarlas luego.", "Continuar").then(() =>
                        navigate("/admin/catalogo")
                    );
                    return;
                }
            } else {
                close();
            }

            showSuccess("¡Propiedad creada!", "Se agregó correctamente al catálogo.", "Ver catálogo").then(() => {
                navigate("/admin/catalogo");
            });
        } catch (error) {
            close();
            showError("Error de conexión", "Verifica tu conexión e inténtalo de nuevo.", "Reintentar");
        }
    };

    return (
        <Container>
            <BackButton type="button" onClick={() => navigate("/admin/catalogo")}>← Volver al Catálogo</BackButton>
            <Titulo>Agregar Nueva Propiedad</Titulo>
            <form onSubmit={handleSubmit}>
                <Label>Título</Label>
                <Input
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    placeholder="Ej: Casa moderna con piscina"
                    required
                />

                <Label>Descripción</Label>
                <TextArea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    ref={textareaRef}
                    placeholder="Ej: Casa de 3 dormitorios, 2 baños, patio amplio y estacionamiento para 2 autos."
                />

                <Label>
                    Precio (CLP) <span style={{ fontWeight: "normal", fontSize: "0.9rem", color: "#999" }}>(máx. 10.000.000.000)</span>
                </Label>
                <Input
                    type="text"
                    name="precio"
                    value={form.precio}
                    onChange={handlePrecioChange}
                    placeholder="Ej: 250.000.000"
                    required
                />

                <Label>Tipo de Propiedad</Label>
                <Select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="Casa">Casa</option>
                    <option value="Parcela">Parcela</option>
                    <option value="Departamento">Departamento</option>
                </Select>

                <Label>Ubicación</Label>
                <Input
                    name="ubicacion"
                    value={form.ubicacion}
                    onChange={handleChange}
                    placeholder="Ej: Av. Providencia 1234, Santiago"
                />

                <Label>Imágenes</Label>
                <UploadLabel htmlFor="fileInput">📸 Agregar imágenes</UploadLabel>
                <UploadInput id="fileInput" type="file" accept="image/*" multiple onChange={handleImagenes} />
                {previewUrls.length > 0 && (
                    <ImagenesPreview>
                        {previewUrls.map((url, i) => (
                            <div key={i}>
                                <img src={url} alt={`Preview ${i}`} />
                                <button type="button" onClick={() => removeImagen(i)}>×</button>
                            </div>
                        ))}
                    </ImagenesPreview>
                )}

                <Button type="submit">Crear Propiedad</Button>
            </form>
        </Container>
    );
};

export default NuevaPropiedad;
