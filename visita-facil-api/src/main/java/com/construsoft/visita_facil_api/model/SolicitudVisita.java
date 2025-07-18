package com.construsoft.visita_facil_api.model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudVisita;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "solicitudes_visita")
public class SolicitudVisita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con Propiedad
    @ManyToOne
    @JoinColumn(name = "propiedad_id", nullable = false)
    private Propiedad propiedad;

    // Información del cliente (no autenticado)
    @Column(nullable = false)
    private String nombreCliente;

    @Column(nullable = false)
    private String correoCliente;

    @Column(nullable = false)
    private String telefonoCliente;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private LocalTime horaInicio;

    // Estado de la solicitud
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSolicitudVisita estado = EstadoSolicitudVisita.PENDIENTE;

    // Relación con Agente 
    @ManyToOne
    @JoinColumn(name = "agente_id")
    private Account agente;

    public SolicitudVisita() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Propiedad getPropiedad() {
        return propiedad;
    }

    public void setPropiedad(Propiedad propiedad) {
        this.propiedad = propiedad;
    }

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

    public String getTelefonoCliente() {
        return telefonoCliente;
    }

    public void setTelefonoCliente(String telefonoCliente) {
        this.telefonoCliente = telefonoCliente;
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

    public EstadoSolicitudVisita getEstado() {
        return estado;
    }

    public void setEstado(EstadoSolicitudVisita estado) {
        this.estado = estado;
    }

    public Account getAgente() {
        return agente;
    }

    public void setAgente(Account agente) {
        this.agente = agente;
    }

}
