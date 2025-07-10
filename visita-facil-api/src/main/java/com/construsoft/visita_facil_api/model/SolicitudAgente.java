package com.construsoft.visita_facil_api.model;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import jakarta.persistence.*;

@Entity
@Table(name = "solicitudes_agentes")
public class SolicitudAgente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "solicitud_visita_id")
    private SolicitudVisita solicitudVisita;

    @ManyToOne(optional = false)
    @JoinColumn(name = "agente_id")
    private Account agente;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSolicitudAgente estado = EstadoSolicitudAgente.ACEPTADA;

    public SolicitudAgente() {}

    public SolicitudAgente(SolicitudVisita solicitudVisita, Account agente) {
        this.solicitudVisita = solicitudVisita;
        this.agente = agente;
    }

    public Long getId() {
        return id;
    }

    public SolicitudAgente setId(Long id) {
        this.id = id;
        return this;
    }

    public SolicitudVisita getSolicitudVisita() {
        return solicitudVisita;
    }

    public SolicitudAgente setSolicitudVisita(SolicitudVisita solicitudVisita) {
        this.solicitudVisita = solicitudVisita;
        return this;
    }

    public Account getAgente() {
        return agente;
    }

    public SolicitudAgente setAgente(Account agente) {
        this.agente = agente;
        return this;
    }

    public EstadoSolicitudAgente getEstado() {
        return estado;
    }

    public SolicitudAgente setEstado(EstadoSolicitudAgente estado) {
        this.estado = estado;
        return this;
    }

}
