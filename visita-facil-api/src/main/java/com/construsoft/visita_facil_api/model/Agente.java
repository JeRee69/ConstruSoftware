package com.construsoft.visita_facil_api.model;

public class Agente extends Usuario {

    public Agente(Long id, String nombre, String apellido, String correo, String telefono, String contrasena) {
        super(id, nombre, apellido, correo, telefono, contrasena);
    }

    public void crearPropiedad() {}
    public void editarPropiedad() {}
    public void eliminarPropiedad() {}
    public void confirmarVisita() {}
    public void establecerDisponibilidad() {}
}
