package com.construsoft.visita_facil_api.domain;

import java.time.LocalDate;
import java.time.LocalTime;

public class DisponibilidadPropiedadDTO {
    private final Long propiedadId;
    private final LocalDate fecha;
    private final LocalTime horaInicio;
    private final LocalTime horaFin;

    public DisponibilidadPropiedadDTO(Long propiedadId, LocalDate fecha, LocalTime horaInicio, LocalTime horaFin) {
        this.propiedadId = propiedadId;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }

    public Integer getPropiedadId() {
        return Math.toIntExact(propiedadId);
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

}
