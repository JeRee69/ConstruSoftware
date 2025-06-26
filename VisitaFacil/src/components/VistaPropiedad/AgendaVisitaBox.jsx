// AgendaVisitaBox.jsx con contenedor de calendario ajustado
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { es } from "date-fns/locale";


const Box = styled.div`
  background-color: var(--color-fondo-card);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  max-width: 360px;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Seccion = styled.div`
  margin-bottom: 1.8rem;
`;

const Titulo = styled.h3`
  margin-bottom: 1rem;
  color: var(--color-texto);
  font-size: 1.2rem;
  font-weight: 600;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: #f0f4f8;
  font-size: 1rem;
  color: var(--color-texto);
  margin-top: 0.5rem;
  cursor: pointer;
`;

const BotonConfirmar = styled.button`
  margin-top: 1.8rem;
  width: 100%;
  padding: 0.9rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b72a2a;
  }
`;

const CalendarioContenedor = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
`;


const AgendaVisitaBox = ({ propiedad }) => {
    const navigate = useNavigate();
    const [fecha, setFecha] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [seleccionado, setSeleccionado] = useState("");
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (!fecha) return;
        setCargando(true);
        const fechaStr = fecha.toISOString().split("T")[0];
        fetch(`http://localhost:8080/disponibilidad/propiedades/${propiedad.id}?fecha=${fechaStr}`)
            .then((res) => res.json())
            .then((data) => {
                const horarios = [];
                data.forEach(({ horaInicio, horaFin }) => {
                    let [h, m] = horaInicio.split(":").map(Number);
                    const [endH, endM] = horaFin.split(":").map(Number);
                    const start = new Date();
                    start.setHours(h, m, 0, 0);
                    const end = new Date();
                    end.setHours(endH, endM, 0, 0);
                    while (start < end) {
                        horarios.push(start.toTimeString().slice(0, 5));
                        start.setMinutes(start.getMinutes() + 60);
                    }
                });
                setHorarios(horarios);
            })
            .catch(() => setHorarios([]))
            .finally(() => setCargando(false));
    }, [fecha, propiedad.id]);

    return (
        <Box>
            <Seccion>
                <Titulo>Pick a date</Titulo>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                    <CalendarioContenedor>
                        <DateCalendar
                            value={fecha}
                            onChange={(newValue) => {
                                setFecha(newValue);
                                setSeleccionado("");
                            }}
                            disablePast
                            minDate={new Date()}
                            maxDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
                            sx={{
                                width: "100%",
                                maxWidth: "320px",
                                margin: "auto",

                                "& .MuiPickersDay-root": {
                                    borderRadius: "50%",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#e5f6f6 !important",
                                    color: "#006e75",
                                    border: "2px solid #008489",
                                },
                                "& .MuiPickersCalendarHeader-label": {
                                    color: "#006e75",
                                    fontWeight: 600,
                                },
                                "& .MuiPickersCalendarHeader-root": {
                                    justifyContent: "center",
                                },
                            }}
                        />
                    </CalendarioContenedor>
                </LocalizationProvider>
            </Seccion>

            {fecha && (
                <Seccion>
                    <Titulo>Pick a time</Titulo>
                    {cargando ? (
                        <p style={{ color: "#888" }}>Cargando horarios...</p>
                    ) : horarios.length > 0 ? (
                        <Dropdown
                            value={seleccionado}
                            onChange={(e) => setSeleccionado(e.target.value)}
                        >
                            <option value="">Selecciona un horario</option>
                            {horarios.map((hora) => (
                                <option key={hora} value={hora}>
                                    {hora}
                                </option>
                            ))}
                        </Dropdown>
                    ) : (
                        <p style={{ color: "#888" }}>No hay horarios disponibles.</p>
                    )}
                </Seccion>
            )}

            {fecha && seleccionado && (
                <BotonConfirmar
                    onClick={() => {
                        localStorage.setItem("visitaPendiente", JSON.stringify({
                            propiedadId: propiedad.id,
                            titulo: propiedad.titulo,
                            ubicacion: propiedad.ubicacion,
                            fecha: fecha.toISOString().split("T")[0],
                            hora: seleccionado,
                        }));
                        navigate("/confirmar-visita");
                    }}
                >
                    Confirmar Visita
                </BotonConfirmar>
            )}
        </Box>
    );
};

export default AgendaVisitaBox;