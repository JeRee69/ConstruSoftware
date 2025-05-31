package com.construsoft.visita_facil_api.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class HorarioDisponibleDTO {
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private List<Long> agentesDisponibles; // ids de cuentas con rol AGENTE

    public HorarioDisponibleDTO(LocalDate fecha, LocalTime inicio, LocalTime fin, List<Long> agentesList) {
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public List<Long> getAgentesDisponibles() {
        return agentesDisponibles;
    }

    public void setAgentesDisponibles(List<Long> agentesDisponibles) {
        this.agentesDisponibles = agentesDisponibles;
    }

}
