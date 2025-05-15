package com.construsoft.visita_facil_api.model;

public abstract class Usuario {
    protected Long id;
    protected String nombre;
    protected String correo;
    protected String telefono;

    public Usuario(Long id, String nombre, String correo, String telefono) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
    }


}
