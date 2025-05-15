package com.construsoft.visita_facil_api.model;

public abstract class Usuario {
    protected Long id;
    protected String nombre;
    protected String apellido;
    protected String correo;
    protected String telefono;
    protected String contrasena;

    public Usuario(Long id, String nombre, String apellido, String correo, String telefono, String contrasena) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.contrasena = contrasena;
    }


}
