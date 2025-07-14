import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleCalendarButton = ({ visita }) => {
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.events",
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;

        const start = new Date(`${visita.fecha}T${visita.hora}`);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hora

        await axios.post(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            summary: `Visita a: ${visita.titulo}`,
            location: visita.ubicacion, // corregido aquí
            description: "Visita programada con VisitaFácil",
            start: {
              dateTime: start.toISOString(),
              timeZone: "America/Santiago",
            },
            end: {
              dateTime: end.toISOString(),
              timeZone: "America/Santiago",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert("✅ Evento agregado a tu Google Calendar");
      } catch (error) {
        console.error("Error al agregar evento:", error);
        alert("❌ No se pudo agregar el evento");
      }
    },
    onError: () => alert("❌ Error al autenticar con Google"),
  });

  return (
    <button
      onClick={() => login()}
      style={{
        marginTop: "1rem",
        backgroundColor: "#4285F4",
        color: "#fff",
        padding: "0.6rem 1rem",
        borderRadius: "6px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      📆 Agregar a Google Calendar
    </button>
  );
};

export default GoogleCalendarButton;
