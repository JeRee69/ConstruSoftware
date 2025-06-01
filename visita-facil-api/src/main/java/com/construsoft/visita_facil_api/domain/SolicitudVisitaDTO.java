package com.construsoft.visita_facil_api.domain;

import java.time.LocalDate;
import java.time.LocalTime;

public class SolicitudVisitaDTO {
    private String nombreCliente;
    private String correoCliente;
    private String telefonoCliente;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private Long propiedadId;

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getCorreoCliente() {
        return correoCliente;
    }

    public void setCorreoCliente(String correoCliente) {
        this.correoCliente = correoCliente;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getTelefonoCliente() {
        return telefonoCliente;
    }

    public void setTelefonoCliente(String telefonoCliente) {
        this.telefonoCliente = telefonoCliente;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Long getPropiedadId() {
        return (long) Math.toIntExact(propiedadId);
    }

    public void setPropiedadId(Long propiedadId) {
        this.propiedadId = propiedadId;
    }
}
