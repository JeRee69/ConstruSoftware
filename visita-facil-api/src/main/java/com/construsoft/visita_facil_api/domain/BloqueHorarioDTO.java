package com.construsoft.visita_facil_api.domain;

import java.time.LocalDate;
import java.time.LocalTime;

public class BloqueHorarioDTO {
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;

    public BloqueHorarioDTO() {}

    public BloqueHorarioDTO(LocalDate fecha, LocalTime horaInicio, LocalTime horaFin) {
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
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

}
