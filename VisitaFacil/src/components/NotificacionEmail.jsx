import axios from "axios";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css";

const NotificacionEmail = () => {
  const { showSuccess, showError, showLoading, close } = useSweetAlert();

  const enviarCorreo = async () => {
    showLoading("Enviando correo", "Procesando el envío del correo electrónico...");

    try {
      await axios.post("http://localhost:8080/api/notificacion", {
        destinatario: "pawearprimero@gmail.com",
        asunto: "Chupala JEREMY",
        mensaje: "CORREO QL WEON LA CAGO.",
      });
      
      close();
      showSuccess(
        "¡Correo enviado!",
        "El correo electrónico ha sido enviado correctamente.",
        "Perfecto"
      );
    } catch (error) {
      console.error("Error al enviar correo:", error);
      close();
      showError(
        "Error al enviar",
        "Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo.",
        "Reintentar"
      );
    }
  };

  return (
    <div>
      <button onClick={enviarCorreo}>Enviar correo</button>
    </div>
  );
};

export default NotificacionEmail;
