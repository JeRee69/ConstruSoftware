import React from "react";
import logo from "../assets/visitafacil.png";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-800 text-white w-full px-4 md:px-8 py-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-auto max-w-[130px] object-contain rounded-md shadow"
        />
        <h1 className="text-2xl font-bold hidden sm:block">VisitaFácil</h1>
      </div>

      <div className="flex gap-6">
        <a
          href="#"
          className="hover:text-yellow-300 transition duration-300 text-lg font-medium"
        >
          Propiedades
        </a>
        <a
          href="#"
          className="hover:text-yellow-300 transition duration-300 text-lg font-medium"
        >
          Quiénes Somos
        </a>
      </div>
    </nav>
  );
}
