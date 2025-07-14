import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css";

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-secundario);
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const Column = styled.div`
  flex: 1;
  background-color: var(--color-fondo-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--color-sombra);
  color: var(--color-texto);
`;

const Title = styled.h2`
  text-align: center;
  color: #b71c1c;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1rem;
`;

const TimeRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: #d32f2f;
  color: white;
  font-weight: bold;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #b71c1c;
  }
`;

const DisponibilidadItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
  background: none;
  color: #d32f2f;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const ErrorMsg = styled.div`
  color: #d32f2f;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
`;

const RegistrarDisponibilidadAgente = () => {
    const navigate = useNavigate();
    const [fecha, setFecha] = useState("");
    const [inicioHora, setInicioHora] = useState("09");
    const [inicioMinutos, setInicioMinutos] = useState("00");
    const [finHora, setFinHora] = useState("17");
    const [finMinutos, setFinMinutos] = useState("00");
    const [error, setError] = useState("");
    const [disponibilidades, setDisponibilidades] = useState([]);
    const { showConfirm, showSuccess, showError, showLoading, close } = useSweetAlert();

    const agente = JSON.parse(localStorage.getItem("usuario"));
    const accountId = agente?.accountId;

    const horas = Array.from({ length: 12 }, (_, i) => (8 + i).toString().padStart(2, "0"));
    const minutos = ["00", "15", "30", "45"];

    const hoyStr = new Date().toISOString().split("T")[0];

    const fetchDisponibilidades = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/agentes/${accountId}`);
        if (res.ok) {
            const data = await res.json();
            setDisponibilidades(data);
        }
    };

    useEffect(() => {
        if (!accountId) return;
        fetchDisponibilidades();
    }, [accountId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const horaInicio = `${inicioHora}:${inicioMinutos}`;
        const horaFin = `${finHora}:${finMinutos}`;

        const inicio = parseInt(inicioHora) * 60 + parseInt(inicioMinutos);
        const fin = parseInt(finHora) * 60 + parseInt(finMinutos);

        const hoy = new Date();
        const fechaSeleccionada = new Date(`${fecha}T00:00`);

        if (fechaSeleccionada < new Date(hoy.toDateString())) {
            setError("No puedes registrar disponibilidades en fechas pasadas.");
            return;
        }

        if (fin - inicio < 30) {
            setError("La disponibilidad debe durar al menos 30 minutos.");
            return;
        }

        const yaExiste = disponibilidades.some((d) => {
            if (d.fecha !== fecha) return false;

            const [hiH, hiM] = d.horaInicio.split(":").map(Number);
            const [hfH, hfM] = d.horaFin.split(":").map(Number);
            const start = hiH * 60 + hiM;
            const end = hfH * 60 + hfM;

            return !(fin <= start || inicio >= end);
        });

        if (yaExiste) {
            setError("Ya existe una disponibilidad que se solapa.");
            return;
        }

        const payload = {
            accountId,
            fecha,
            horaInicio,
            horaFin,
        };

        const res = await fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/agentes/registrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            fetchDisponibilidades();
            setError("");
        } else {
            setError("Error al registrar disponibilidad.");
        }
    };

    const handleEliminar = async (id) => {
        const result = await showConfirm(
            "¿Eliminar disponibilidad?",
            "Esta acción eliminará tu disponibilidad para esta fecha y hora.",
            "Sí, eliminar",
            "Cancelar"
        );

        if (result.isConfirmed) {
            showLoading("Eliminando disponibilidad", "Por favor espera...");

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/disponibilidad/agentes/${id}`, {
                    method: "DELETE",
                });

                close();

                if (res.ok) {
                    fetchDisponibilidades();
                    showSuccess(
                        "¡Disponibilidad eliminada!",
                        "Tu disponibilidad ha sido eliminada correctamente.",
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

    const formatearFecha = (fechaISO) => {
        const [a, m, d] = fechaISO.split("-");
        const fecha = new Date(parseInt(a), parseInt(m) - 1, parseInt(d));

        return fecha
            .toLocaleDateString("es-CL", {
                weekday: "long",
                day: "numeric",
                month: "long",
            })
            .replace(/^./, (c) => c.toUpperCase());
    };

    return (
        <PageWrapper>
            <Content>
                <Column>
                    <Title>Registrar Disponibilidad</Title>
                    <form onSubmit={handleSubmit}>
                        <Label>Fecha</Label>
                        <Input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            required
                            min={hoyStr}
                        />

                        <Label>Hora de inicio</Label>
                        <TimeRow>
                            <Select value={inicioHora} onChange={(e) => setInicioHora(e.target.value)}>
                                {horas.map((h) => <option key={h} value={h}>{h}</option>)}
                            </Select>
                            <Select value={inicioMinutos} onChange={(e) => setInicioMinutos(e.target.value)}>
                                {minutos.map((m) => <option key={m} value={m}>{m}</option>)}
                            </Select>
                        </TimeRow>

                        <Label>Hora de fin</Label>
                        <TimeRow>
                            <Select value={finHora} onChange={(e) => setFinHora(e.target.value)}>
                                {horas.map((h) => <option key={h} value={h}>{h}</option>)}
                            </Select>
                            <Select value={finMinutos} onChange={(e) => setFinMinutos(e.target.value)}>
                                {minutos.map((m) => <option key={m} value={m}>{m}</option>)}
                            </Select>
                        </TimeRow>

                        <Button type="submit">Guardar Disponibilidad</Button>
                        {error && <ErrorMsg>{error}</ErrorMsg>}
                    </form>
                </Column>

                <Column>
                    <Title>Disponibilidades Registradas</Title>
                    {disponibilidades.length === 0 ? (
                        <p style={{ textAlign: "center" }}>No hay disponibilidades aún.</p>
                    ) : (
                        disponibilidades
                            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                            .map((d) => (
                                <DisponibilidadItem key={d.id}>
                                    <div>
                                        <strong>{formatearFecha(d.fecha)}</strong><br />
                                        {d.horaInicio.slice(0, 5)} – {d.horaFin.slice(0, 5)}
                                    </div>
                                    <DeleteBtn onClick={() => handleEliminar(d.id)}>Eliminar</DeleteBtn>
                                </DisponibilidadItem>
                            ))
                    )}
                </Column>
            </Content>
        </PageWrapper>
    );
};

export default RegistrarDisponibilidadAgente;
