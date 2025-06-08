package com.construsoft.visita_facil_api.domain;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class DisponibilidadPropiedadDTO {
    private Long idPropiedad;
    private DayOfWeek dia;
    private LocalTime horaInicio;
    private LocalTime horaFin;

    public DisponibilidadPropiedadDTO(Long idPropiedad, DayOfWeek dia, LocalTime horaInicio, LocalTime horaFin) {
        this.idPropiedad = idPropiedad;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }

    public Integer getIdPropiedad() {
        return Math.toIntExact(idPropiedad);
    }

    public void setIdPropiedad(Long idPropiedad) {
        this.idPropiedad = idPropiedad;
    }

    public DayOfWeek getDia() {
        return dia;
    }

    public void setDia(DayOfWeek dia) {
        this.dia = dia;
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
