import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PageWrapper,
  Container,
  Title,
  Grid,
  TitleWrapper,
  BotonIcono,
} from "./Catalogo.styles";
import TarjetaPropiedad from "../../components/Catalogo/TarjetaPropiedad.jsx";
import Cargando from "../../components/Cargando/Cargando";
import { FiPlus } from "react-icons/fi";

const SeccionPropiedades = ({
  titulo,
  propiedades,
  esAdmin,
  onEliminar,
  onClick,
  onDisponibilidad,
  id,
}) => {
  if (propiedades.length === 0) return null;

  return (
    <section id={id} style={{ marginBottom: "3rem" }}>
      <h2
        style={{
          borderBottom: "2px solid #4a90e2",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
          color: "#2c3e50",
          fontWeight: "700",
          fontSize: "1.8rem",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
        }}
      >
        {titulo}
      </h2>
      <Grid>
        {propiedades.map((prop) => (
          <TarjetaPropiedad
            key={prop.id}
            propiedad={prop}
            esAdmin={esAdmin}
            onClick={() => onClick(prop.id)}
            onEliminar={() => onEliminar(prop.id)}
            onDisponibilidad={() => onDisponibilidad(prop.id)}
          />
        ))}
      </Grid>
    </section>
  );
};

const Catalogo = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/propiedades/disponibles`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar propiedades");
        return res.json();
      })
      .then((data) => {
        setPropiedades(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // Hacer scroll automático si hay un hash en la URL
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elemento = document.querySelector(hash);
      if (elemento) {
        setTimeout(() => {
          elemento.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);

  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar esta propiedad?")) {
      fetch(`${import.meta.env.VITE_API_URL}/propiedades/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al eliminar");
          setPropiedades((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((err) => alert(err.message));
    }
  };

  const filtrarPorTipo = (tipo) => propiedades.filter((p) => p.tipo === tipo);

  return (
    <PageWrapper>
      <Container>
        <TitleWrapper>
          <Title>Catálogo de Propiedades</Title>
          {usuario?.rol === "ADMINISTRADOR" && (
            <BotonIcono
              onClick={() => navigate("/admin/nueva-propiedad")}
              title="Agregar nueva propiedad"
            >
              <FiPlus />
            </BotonIcono>
          )}
        </TitleWrapper>

        {cargando && <Cargando mensaje="Cargando propiedades..." />}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {!cargando && !error && propiedades.length === 0 && (
          <p style={{ textAlign: "center" }}>No hay propiedades disponibles.</p>
        )}

        <SeccionPropiedades
          id="casas"
          titulo="Casas"
          propiedades={filtrarPorTipo("Casa")}
          esAdmin={usuario?.rol === "ADMINISTRADOR"}
          onEliminar={handleEliminar}
          onClick={(id) => navigate(`/propiedad/${id}`)}
          onDisponibilidad={(id) =>
            navigate(`/admin/propiedad/${id}/disponibilidad`)
          }
        />

        <SeccionPropiedades
          id="parcelas"
          titulo="Parcelas"
          propiedades={filtrarPorTipo("Parcela")}
          esAdmin={usuario?.rol === "ADMINISTRADOR"}
          onEliminar={handleEliminar}
          onClick={(id) => navigate(`/propiedad/${id}`)}
          onDisponibilidad={(id) =>
            navigate(`/admin/propiedad/${id}/disponibilidad`)
          }
        />

        <SeccionPropiedades
          id="departamentos"
          titulo="Departamentos"
          propiedades={filtrarPorTipo("Departamento")}
          esAdmin={usuario?.rol === "ADMINISTRADOR"}
          onEliminar={handleEliminar}
          onClick={(id) => navigate(`/propiedad/${id}`)}
          onDisponibilidad={(id) =>
            navigate(`/admin/propiedad/${id}/disponibilidad`)
          }
        />
      </Container>
    </PageWrapper>
  );
};

export default Catalogo;
