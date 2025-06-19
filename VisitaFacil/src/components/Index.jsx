import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/visitafacil.png"; // Asegúrate que esta imagen exista

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Prueba de Tailwind CSS</h1>
      <p className="text-lg mb-6">
        Si ves este texto centrado en azul, ¡Tailwind funciona!
      </p>
      <img
        src={heroImg}
        alt="Logo de Visita Fácil"
        className="w-48 h-auto mb-6 rounded-lg shadow-lg"
      />
      <button
        onClick={() => navigate("/otra-ruta")}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 font-semibold transition"
      >
        Ir a otra ruta
      </button>
    </div>
  );
}
