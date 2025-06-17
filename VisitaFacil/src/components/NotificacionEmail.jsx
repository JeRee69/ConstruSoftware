import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificacionEmail = () => {
  const enviarCorreo = async () => {
    try {
      await axios.post("http://localhost:8080/api/notificacion", {
        destinatario: "pawearprimero@gmail.com",
        asunto: "Chupala JEREMY",
        mensaje: "CORREO QL WEON LA CAGO.",
      });
      alert("Correo enviado correctamente");
    } catch (error) {
      console.error("Error al enviar correo:", error);
      alert("Error al enviar correo");
    }
  };

  return (
    <div>
      <button onClick={enviarCorreo}>Enviar correo</button>
    </div>
  );
};

export default NotificacionEmail;
