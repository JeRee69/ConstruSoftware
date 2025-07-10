package com.construsoft.visita_facil_api.domain;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;

public class RespuestaSolicitudAgenteDTO {
    private Long solicitudVisitaId;
    private Long agenteId;
    private EstadoSolicitudAgente nuevoEstado;

    public Long getSolicitudVisitaId() {
        return solicitudVisitaId;
    }

    public void setSolicitudVisitaId(Long solicitudVisitaId) {
        this.solicitudVisitaId = solicitudVisitaId;
    }

    public Long getAgenteId() {
        return agenteId;
    }

    public void setAgenteId(Long agenteId) {
        this.agenteId = agenteId;
    }

    public EstadoSolicitudAgente getNuevoEstado() {
        return nuevoEstado;
    }

    public void setNuevoEstado(EstadoSolicitudAgente nuevoEstado) {
        this.nuevoEstado = nuevoEstado;
    }
}
