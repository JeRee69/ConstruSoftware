package com.construsoft.visita_facil_api.domain;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;

public class RespuestaSolicitudAgenteDTO {
    private Long solicitudAgenteId;
    private EstadoSolicitudAgente nuevoEstado;

    public Long getSolicitudAgenteId() {
        return solicitudAgenteId;
    }

    public void setSolicitudAgenteId(Long solicitudAgenteId) {
        this.solicitudAgenteId = solicitudAgenteId;
    }

    public EstadoSolicitudAgente getNuevoEstado() {
        return nuevoEstado;
    }

    public void setNuevoEstado(EstadoSolicitudAgente nuevoEstado) {
        this.nuevoEstado = nuevoEstado;
    }

}
