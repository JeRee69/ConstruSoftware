// AgendaVisitaBox.jsx con contenedor de calendario ajustado
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Estilos CSS para el calendario que se apliquen globalmente
const CalendarStyles = styled.div`
  /* Estilos base del calendario */
  .MuiDateCalendar-root {
    width: 100% !important;
    max-width: 320px !important;
    margin: auto !important;
    background-color: var(--color-fondo-card) !important;
    border-radius: 8px !important;
    border: 1px solid var(--color-border) !important;
  }

  /* Días del calendario */
  .MuiPickersDay-root {
    border-radius: 8px !important;
    color: var(--color-texto) !important;
    font-weight: 500 !important;
  }

  .MuiPickersDay-root:hover {
    background-color: var(--color-border) !important;
  }

  /* Día seleccionado */
  .MuiPickersDay-root.Mui-selected {
    background-color: var(--color-primario) !important;
    color: white !important;
    font-weight: 600 !important;
  }

  .MuiPickersDay-root.Mui-selected:hover {
    background-color: #b72a2a !important;
  }

  /* Día de hoy */
  .MuiPickersDay-today {
    border: 2px solid var(--color-primario) !important;
    font-weight: 600 !important;
  }

  /* Header del calendario */
  .MuiPickersCalendarHeader-label {
    color: var(--color-texto) !important;
    font-weight: 600 !important;
    font-size: 1.1rem !important;
  }

  /* Botones de navegación */
  .MuiPickersArrowSwitcher-button {
    color: var(--color-texto) !important;
  }

  .MuiPickersArrowSwitcher-button:hover {
    background-color: var(--color-border) !important;
  }

  /* Etiquetas de días de la semana */
  .MuiDayCalendar-weekDayLabel {
    color: var(--color-texto) !important;
    opacity: 0.7;
    font-weight: 600 !important;
    font-size: 0.75rem !important;
  }

  /* Días deshabilitados */
  .MuiPickersDay-root.Mui-disabled {
    color: var(--color-texto) !important;
    opacity: 0.4 !important;
  }

  /* Contenedor del header */
  .MuiPickersCalendarHeader-root {
    padding-top: 1rem !important;
    padding-bottom: 0.5rem !important;
  }
`;


const Box = styled.div`
  background-color: var(--color-fondo-card);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 6px 18px var(--color-sombra);
  max-width: 360px;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
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
  background-color: var(--color-fondo-card);
  font-size: 1rem;
  color: var(--color-texto);
  margin-top: 0.5rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-primario);
  }
  
  option {
    background-color: var(--color-fondo-card);
    color: var(--color-texto);
  }
`;

const BotonConfirmar = styled.button`
  margin-top: 1.8rem;
  width: 100%;
  padding: 0.9rem;
  background-color: var(--color-primario);
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
    const [temaOscuro, setTemaOscuro] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);

    // Detectar cambios en el tema
    useEffect(() => {
        const detectarTema = () => {
            const root = document.documentElement;
            const colorSecundario = getComputedStyle(root).getPropertyValue('--color-secundario').trim();
            const esOscuro = colorSecundario === '#121212' || colorSecundario === 'rgb(18, 18, 18)';
            
            if (esOscuro !== temaOscuro) {
                console.log('Cambio de tema detectado:', esOscuro ? 'Oscuro' : 'Claro');
                setTemaOscuro(esOscuro);
                setForceUpdate(prev => prev + 1); // Forzar re-render
                
                // Forzar recalculo de estilos CSS del calendario
                setTimeout(() => {
                    const calendarios = document.querySelectorAll('.MuiDateCalendar-root');
                    calendarios.forEach(cal => {
                        cal.style.display = 'none';
                        cal.offsetHeight; // Trigger reflow
                        cal.style.display = '';
                    });
                }, 100);
            }
        };

        // Detectar tema inicial
        detectarTema();

        // Observar cambios en el style del root
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'style' || mutation.attributeName === 'data-theme')) {
                    setTimeout(detectarTema, 50); // Pequeño delay para asegurar que los cambios se apliquen
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style', 'data-theme']
        });

        // También observar cambios en el body
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style']
        });

        // Verificar cada segundo como respaldo
        const interval = setInterval(detectarTema, 1000);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, [temaOscuro]);

    useEffect(() => {
        if (!fecha) return;
        setCargando(true);
        const fechaStr = fecha.toISOString().split("T")[0];
        fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/propiedades/${propiedad.id}?fecha=${fechaStr}`)
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
        <CalendarStyles key={`theme-${temaOscuro}-${forceUpdate}`}>
            <Box>
                {/* Debug del tema */}
                <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: temaOscuro ? '#4ade80' : '#f59e0b',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    zIndex: 1000
                }}>
                    {temaOscuro ? 'DARK' : 'LIGHT'}
                </div>

                <Seccion>
                    <Titulo>Pick a date</Titulo>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                        <CalendarioContenedor>
                            <DateCalendar
                                key={`calendar-${temaOscuro}-${forceUpdate}`}
                                value={fecha}
                                onChange={(newValue) => {
                                    setFecha(newValue);
                                    setSeleccionado("");
                                }}
                                disablePast
                                minDate={new Date()}
                                maxDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
                            />
                        </CalendarioContenedor>
                    </LocalizationProvider>
                </Seccion>

                {fecha && (
                    <Seccion>
                        <Titulo>Pick a time</Titulo>
                        {cargando ? (
                            <p style={{ color: "var(--color-texto)", opacity: "0.7" }}>Cargando horarios...</p>
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
                            <p style={{ color: "var(--color-texto)", opacity: "0.7" }}>No hay horarios disponibles.</p>
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
        </CalendarStyles>
    );
};

export default AgendaVisitaBox;