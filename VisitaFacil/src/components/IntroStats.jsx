import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { FaHome, FaBuilding, FaTree, FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    icon: <FaHome />,
    label: "Casas vendidas",
    end: 150,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    icon: <FaBuilding />,
    label: "Departamentos vendidos",
    end: 100,
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
  },
  {
    icon: <FaTree />,
    label: "Parcelas vendidas",
    end: 50,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  },
  {
    icon: <FaCalendarAlt />,
    label: "Visitas realizadas",
    end: 500,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    icon: <FaCalendarAlt />,
    label: "Estadísticas completas",
    end: 0,
    image: "",
  },
];

const IntroStats = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      setScrollY(scrollPos);
      const vh = window.innerHeight;
      const index = Math.min(stats.length - 1, Math.floor(scrollPos / vh));
      setCurrentIndex(index);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const vh = window.innerHeight;

  // Scroll relativo dentro de la sección actual (0 a vh)
  const scrollInSection = scrollY - currentIndex * vh;

  // Mapeamos scrollInSection para scale entre 1 (top) y 1.15 (bottom)
  // Se hace zoom conforme haces scroll dentro de la sección
  // Limitar entre 1 y 1.15 para evitar zoom excesivo
  const maxScale = 1.3;
  const scale =
    1 + Math.min(Math.max(scrollInSection / vh, 0), 1) * (maxScale - 1);

  return (
    <>
      {/* Secciones para scroll */}
      {stats.map((_, index) => (
        <div key={index} style={{ height: "100vh" }} />
      ))}

      {/* Fondo negro con imagen zoom in */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          backgroundColor: "black",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {stats[currentIndex].image && (
            <motion.div
              key={stats[currentIndex].image}
              initial={{ opacity: 0.3, scale: 1.15 }}
              animate={{ opacity: 1, scale: scale }}
              exit={{ opacity: 0.3, scale: 1.35 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${stats[currentIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                willChange: "transform, opacity",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contenido visible */}
      <div
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "2rem",
          textAlign: "center",
          zIndex: 1,
          gap: "3rem",
        }}
      >
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: 900 }}
        >
          <h1
            style={{
              fontSize: "6rem",
              fontWeight: "900",
              textShadow: "0 0 15px rgba(0,0,0,0.9)",
            }}
          >
            VisitaFácil
          </h1>
          <p
            style={{
              fontSize: "3rem",
              fontWeight: "600",
              textShadow: "0 0 12px rgba(0,0,0,0.8)",
            }}
          >
            Agenda fácil, compra fácil
          </p>
        </motion.div>

        {/* Stats con transición suave */}
        <AnimatePresence mode="wait">
          {currentIndex !== stats.length - 1 ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                textShadow: "0 0 10px rgba(0,0,0,0.8)",
                fontSize: "4rem",
              }}
            >
              <div style={{ fontSize: "5rem" }}>{stats[currentIndex].icon}</div>
              <div style={{ textAlign: "left" }}>
                <CountUp
                  end={stats[currentIndex].end}
                  duration={2}
                  suffix="+"
                  style={{ fontWeight: "800", fontSize: "5rem" }}
                />
                <p style={{ fontSize: "2rem", marginTop: 6 }}>
                  {stats[currentIndex].label}
                </p>
              </div>
            </motion.div>
          ) : (
            // Última sección: todas las stats juntas, lado a lado
            <motion.div
              key="all-stats"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4rem",
                maxWidth: "90vw",
                justifyContent: "center",
                userSelect: "text",
                textShadow: "0 0 15px rgba(0,0,0,0.9)",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              {stats
                .slice(0, stats.length - 1)
                .map(({ icon, label, end }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      fontSize: "3rem",
                      fontWeight: "700",
                      minWidth: 220,
                      color: "#d32f2f",
                      flexDirection: "column",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      padding: "1rem 2rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      userSelect: "text",
                    }}
                  >
                    <div style={{ fontSize: "4rem" }}>{icon}</div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: "800", fontSize: "3.5rem" }}>
                        {end}+
                      </div>
                      <div style={{ fontSize: "1.6rem", marginTop: "0.3rem" }}>
                        {label}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            padding: "1rem 3rem",
            fontSize: "2rem",
            fontWeight: "700",
            borderRadius: 9999,
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(211, 47, 47, 0.6)",
          }}
          onClick={() => navigate("/catalogo")}
        >
          Explorar Propiedades
        </motion.button>
      </div>
    </>
  );
};

export default IntroStats;
