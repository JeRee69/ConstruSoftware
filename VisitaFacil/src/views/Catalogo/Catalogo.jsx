import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaSortAmountUpAlt, FaSortAmountDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cargando from "../../components/Cargando/Cargando";
import TarjetaPropiedad from "../../components/Catalogo/TarjetaPropiedad.jsx";
import { useSweetAlert } from "../../hooks/useSweetAlert";
import "../../styles/sweetalert-custom.css";
import {
  BotonIcono,
  Container,
  Grid,
  PageWrapper,
  Title,
  TitleWrapper,
} from "./Catalogo.styles";

const SeccionPropiedades = ({
  titulo,
  propiedades,
  esAdmin,
  onEliminar,
  onClick,
  onDisponibilidad,
  id,
  orden,
  onOrdenar,
  filtroNombre,
  onFiltroNombreChange,
}) => {
  const propiedadesFiltradas = propiedades.filter((p) =>
    p.titulo.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  return (
    <section id={id} style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h2
          style={{
            borderBottom: "2px solid #4a90e2",
            paddingBottom: "0.3rem",
            marginBottom: "0",
            color: "#2c3e50",
            fontWeight: "700",
            fontSize: "1.8rem",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          {titulo}
        </h2>
        <button
          onClick={onOrdenar}
          title="Ordenar por precio"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "#4a90e2",
          }}
        >
          <span>Precio</span>
          {orden === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDown />}
        </button>
      </div>

      {/* Filtro por nombre */}
      <input
        type="text"
        value={filtroNombre}
        onChange={(e) => onFiltroNombreChange(e.target.value)}
        placeholder="Buscar por nombre..."
        style={{
          marginBottom: "1rem",
          padding: "8px 12px",
          width: "100%",
          maxWidth: 400,
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />

      {propiedadesFiltradas.length === 0 ? (
        <p style={{ fontStyle: "italic", opacity: 0.7 }}>
          No se encontraron propiedades con ese nombre.
        </p>
      ) : (
        <Grid>
          {propiedadesFiltradas.map((prop) => (
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
      )}
    </section>
  );
};

const Catalogo = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { showConfirm, showSuccess, showError, showLoading, close } =
    useSweetAlert();

  // Filtros separados por tipo
  const [ordenes, setOrdenes] = useState({
    Casa: "asc",
    Parcela: "asc",
    Departamento: "asc",
  });
  const [filtrosNombre, setFiltrosNombre] = useState({
    Casa: "",
    Parcela: "",
    Departamento: "",
  });

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

  const handleEliminar = async (id) => {
    const result = await showConfirm(
      "¿Eliminar propiedad?",
      "Esta acción no se puede deshacer. La propiedad será eliminada permanentemente.",
      "Sí, eliminar",
      "Cancelar"
    );

    if (result.isConfirmed) {
      showLoading("Eliminando propiedad", "Por favor espera...");

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/propiedades/${id}`,
          {
            method: "DELETE",
          }
        );

        close();

        if (!res.ok) throw new Error("Error al eliminar la propiedad");

        setPropiedades((prev) => prev.filter((p) => p.id !== id));

        showSuccess(
          "¡Propiedad eliminada!",
          "La propiedad ha sido eliminada correctamente del catálogo.",
          "Continuar"
        );
      } catch (err) {
        close();
        showError(
          "Error al eliminar",
          `No se pudo eliminar la propiedad: ${err.message}`,
          "Reintentar"
        );
      }
    }
  };

  const filtrarYOrdenar = (tipo) => {
    const propsTipo = propiedades.filter((p) => p.tipo === tipo);
    const orden = ordenes[tipo];
    return [...propsTipo].sort((a, b) =>
      orden === "asc" ? a.precio - b.precio : b.precio - a.precio
    );
  };

  const cambiarOrden = (tipo) => {
    setOrdenes((prev) => ({
      ...prev,
      [tipo]: prev[tipo] === "asc" ? "desc" : "asc",
    }));
  };

  const cambiarFiltroNombre = (tipo, valor) => {
    setFiltrosNombre((prev) => ({
      ...prev,
      [tipo]: valor,
    }));
  };

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

        {/* Casas */}
        <SeccionPropiedades
          id="casas"
          titulo="Casas"
          propiedades={filtrarYOrdenar("Casa")}
          esAdmin={usuario?.rol === "ADMINISTRADOR"}
          onEliminar={handleEliminar}
          onClick={(id) => navigate(`/propiedad/${id}`)}
          onDisponibilidad={(id) =>
            navigate(`/admin/propiedad/${id}/disponibilidad`)
          }
          orden={ordenes.Casa}
          onOrdenar={() => cambiarOrden("Casa")}
          filtroNombre={filtrosNombre.Casa}
          onFiltroNombreChange={(valor) => cambiarFiltroNombre("Casa", valor)}
        />

        {/* Parcelas */}
        <SeccionPropiedades
          id="parcelas"
          titulo="Parcelas"
          propiedades={filtrarYOrdenar("Parcela")}
          esAdmin={usuario?.rol === "ADMINISTRADOR"}
          onEliminar={handleEliminar}
          onClick={(id) => navigate(`/propiedad/${id}`)}
          onDisponibilidad={(id) =>
            navigate(`/admin/propiedad/${id}/disponibilidad`)
          }
          orden={ordenes.Parcela}
          onOrdenar={() => cambiarOrden("Parcela")}
          filtroNombre={filtrosNombre.Parcela}
          onFiltroNombreChange={(valor) =>
            cambiarFiltroNombre("Parcela", valor)
          }
        />

        {/* Departamentos */}
        <SeccionPropiedades
          id="departamentos"
          titulo="Departamentos"
          propiedades={filtrarYOrdenar("Departamento")}
          esAdmin={usuario?.rol === "ADMINISTRADOR"}
          onEliminar={handleEliminar}
          onClick={(id) => navigate(`/propiedad/${id}`)}
          onDisponibilidad={(id) =>
            navigate(`/admin/propiedad/${id}/disponibilidad`)
          }
          orden={ordenes.Departamento}
          onOrdenar={() => cambiarOrden("Departamento")}
          filtroNombre={filtrosNombre.Departamento}
          onFiltroNombreChange={(valor) =>
            cambiarFiltroNombre("Departamento", valor)
          }
        />
      </Container>
    </PageWrapper>
  );
};

export default Catalogo;
