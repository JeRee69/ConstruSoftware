
package com.construsoft.visita_facil_api.domain;

import java.time.LocalDate;
import java.time.LocalTime;

public class ObtencionDisponibilidadPropiedadDTO {
    private Long idPropiedad;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;

    public ObtencionDisponibilidadPropiedadDTO() {
    }

    public ObtencionDisponibilidadPropiedadDTO(Long idPropiedad, LocalDate fecha, LocalTime horaInicio, LocalTime horaFin) {
        this.idPropiedad = idPropiedad;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }

    public Long getIdPropiedad() {
        return idPropiedad;
    }

    public void setIdPropiedad(Long idPropiedad) {
        this.idPropiedad = idPropiedad;
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
