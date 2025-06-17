package com.construsoft.visita_facil_api.domain;

import com.construsoft.visita_facil_api.enums.Rol;

public class RespuestaLoginDTO {
    private Long accountId;
    private Rol rol;
    private String nombre;

    public RespuestaLoginDTO() {
    }

    public RespuestaLoginDTO(Long accountId, Rol rol) {
        this.accountId = accountId;
        this.rol = rol;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
