package com.construsoft.visita_facil_api.domain;

public class CancelacionAgenteDTO {
    private Long solicitudVisitaId;
    private Long agenteId;

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
}