import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css";

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(135deg, #f1f1f1, #e0e0e0);
`;

const ButtonVolver = styled.button`
  background-color: transparent;
  border: none;
  color: #b71c1c;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #d32f2f;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
`;

const Left = styled(Card)`
  max-width: 450px;
  margin-right: 2rem;
`;

const Right = styled(Card)`
  flex: 1;
`;

const Title = styled.h2`
  color: #b71c1c;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1.2rem;
`;

const TimeRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;

const DisponibilidadItem = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteBtn = styled.button`
  background: none;
  color: #b71c1c;
  border: none;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.p`
  color: #d32f2f;
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
`;

const diasSemanaTraducidos = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
};

const RegistrarDisponibilidad = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dia, setDia] = useState("MONDAY");
    const [inicioHora, setInicioHora] = useState("08");
    const [inicioMinutos, setInicioMinutos] = useState("00");
    const [finHora, setFinHora] = useState("09");
    const [finMinutos, setFinMinutos] = useState("00");
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [error, setError] = useState("");
    const { showConfirm, showSuccess, showError, showLoading, close } = useSweetAlert();

    const dias = Object.entries(diasSemanaTraducidos).map(([value, label]) => ({ value, label }));

    const horas = Array.from({ length: 12 }, (_, i) => String(i + 8).padStart(2, "0"));
    const minutos = ["00", "15", "30", "45"];

    const fetchDisponibilidades = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/propiedades/${id}/listar`);
        if (res.ok) {
            const data = await res.json();
            setDisponibilidades(data);
        }
    };

    useEffect(() => {
        fetchDisponibilidades();
    }, [id]);

    const toMinutes = (h, m) => parseInt(h) * 60 + parseInt(m);

    const solapado = () => {
        const nuevaInicio = toMinutes(inicioHora, inicioMinutos);
        const nuevaFin = toMinutes(finHora, finMinutos);

        return disponibilidades.some((d) => {
            if (d.diaSemana !== dia) return false;

            const [h1, m1] = d.horaInicio.split(":");
            const [h2, m2] = d.horaFin.split(":");

            const inicioExistente = toMinutes(h1, m1);
            const finExistente = toMinutes(h2, m2);

            return !(nuevaFin <= inicioExistente || nuevaInicio >= finExistente);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const inicio = toMinutes(inicioHora, inicioMinutos);
        const fin = toMinutes(finHora, finMinutos);

        if (fin - inicio < 30) {
            setError("La duración mínima debe ser de 30 minutos.");
            return;
        }

        if (solapado()) {
            setError("Esta disponibilidad se solapa con otra ya registrada.");
            return;
        }

        const payload = {
            idPropiedad: parseInt(id),
            dia,
            horaInicio: `${inicioHora}:${inicioMinutos}`,
            horaFin: `${finHora}:${finMinutos}`,
        };

        const res = await fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/propiedades/registrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            fetchDisponibilidades();
            setError("");
        } else {
            const msg = await res.text();
            setError("Error al registrar: " + msg);
        }
    };

    const handleEliminar = async (disponibilidadId) => {
        const result = await showConfirm(
            "¿Eliminar disponibilidad?",
            "Esta acción eliminará este horario de disponibilidad permanentemente.",
            "Sí, eliminar",
            "Cancelar"
        );

        if (result.isConfirmed) {
            showLoading("Eliminando disponibilidad", "Por favor espera...");

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/propiedades/${disponibilidadId}`, {
                    method: "DELETE",
                });

                close();

                if (res.ok) {
                    setDisponibilidades((prev) => prev.filter((d) => d.id !== disponibilidadId));

                    showSuccess(
                        "¡Disponibilidad eliminada!",
                        "El horario de disponibilidad ha sido eliminado correctamente.",
                        "Continuar"
                    );
                } else {
                    showError(
                        "Error al eliminar",
                        "No se pudo eliminar la disponibilidad. Por favor, inténtalo de nuevo.",
                        "Reintentar"
                    );
                }
            } catch (error) {
                close();
                showError(
                    "Error de conexión",
                    "No se pudo conectar con el servidor para eliminar la disponibilidad.",
                    "Reintentar"
                );
            }
        }
    };

    return (
        <PageWrapper>
            <Left>
                <ButtonVolver onClick={() => navigate("/catalogo")}>
                    ← Volver al Catálogo
                </ButtonVolver>
                <Title>Agregar Disponibilidad Manual</Title>
                <form onSubmit={handleSubmit}>
                    <Label>Día de la semana</Label>
                    <Select value={dia} onChange={(e) => setDia(e.target.value)}>
                        {dias.map((d) => (
                            <option key={d.value} value={d.value}>
                                {d.label}
                            </option>
                        ))}
                    </Select>

                    <Label>Hora de inicio</Label>
                    <TimeRow>
                        <Select value={inicioHora} onChange={(e) => setInicioHora(e.target.value)}>
                            {horas.map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </Select>
                        <Select value={inicioMinutos} onChange={(e) => setInicioMinutos(e.target.value)}>
                            {minutos.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </Select>
                    </TimeRow>

                    <Label>Hora de fin</Label>
                    <TimeRow>
                        <Select value={finHora} onChange={(e) => setFinHora(e.target.value)}>
                            {horas.map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </Select>
                        <Select value={finMinutos} onChange={(e) => setFinMinutos(e.target.value)}>
                            {minutos.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </Select>
                    </TimeRow>

                    <Button type="submit">Guardar</Button>
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                </form>
            </Left>

            <Right>
                <Title>Disponibilidades Registradas</Title>
                {disponibilidades.length === 0 ? (
                    <>
                        <p style={{ textAlign: "center" }}>
                            No hay disponibilidades registradas.
                        </p>
                        <Button
                            style={{ marginTop: "1rem" }}
                            onClick={async () => {
                                const diasTodos = Object.keys(diasSemanaTraducidos);
                                const payloads = diasTodos.map((d) => ({
                                    idPropiedad: parseInt(id),
                                    dia: d,
                                    horaInicio: "08:00",
                                    horaFin: "19:00",
                                }));

                                showLoading("Registrando disponibilidad", "Por favor espera...");

                                try {
                                    for (const payload of payloads) {
                                        await fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/propiedades/registrar`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(payload),
                                        });
                                    }
                                    await fetchDisponibilidades();
                                    close();
                                    showSuccess("¡Disponibilidades agregadas!", "Se registraron todos los días de 08:00 a 19:00.");
                                } catch (err) {
                                    close();
                                    showError("Error", "No se pudieron registrar las disponibilidades.");
                                }
                            }}
                        >
                            Agregar disponibilidad automática (todos los días)
                        </Button>
                    </>
                ) : (
                    [...disponibilidades]
                        .sort((a, b) => {
                            const ordenDias = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
                            const diaA = ordenDias.indexOf(a.diaSemana);
                            const diaB = ordenDias.indexOf(b.diaSemana);
                            if (diaA !== diaB) return diaA - diaB;

                            const [hA, mA] = a.horaInicio.split(":").map(Number);
                            const [hB, mB] = b.horaInicio.split(":").map(Number);
                            return (hA * 60 + mA) - (hB * 60 + mB);
                        })
                        .map((d) => (
                            <DisponibilidadItem key={d.id}>
                                <div>
                                    <strong>{diasSemanaTraducidos[d.diaSemana]}</strong><br />
                                    {d.horaInicio.slice(0, 5)} – {d.horaFin.slice(0, 5)}
                                </div>
                                <DeleteBtn onClick={() => handleEliminar(d.id)}>Eliminar</DeleteBtn>
                            </DisponibilidadItem>
                        ))
                )}
            </Right>
        </PageWrapper>
    );
};

export default RegistrarDisponibilidad;
