package com.construsoft.visita_facil_api.domain;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class DisponibilidadAgenteDTO {
    private Long accountId;
    private DayOfWeek dia;
    private LocalTime horaInicio;
    private LocalTime horaFin;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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
