package com.construsoft.visita_facil_api.model;

public class Agente extends Usuario {

    public Agente(Long id, String nombre, String correo, String telefono) {
        super(id, nombre, correo, telefono);
    }

    public void crearPropiedad() {}
    public void editarPropiedad() {}
    public void eliminarPropiedad() {}
    public void confirmarVisita() {}
    public void establecerDisponibilidad() {}
}
