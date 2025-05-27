package com.construsoft.visita_facil_api.model;
import java.util.Date;

public class Visita {
    private Long id;
    private Propiedad propiedad;
    private Usuario agente;
    private Usuario cliente;
    private Date fechaHora;
    private EstadoVisita estado;

    public void asignarAgente(Usuario agente) {
        this.agente = agente;
    }

    public void marcarCompletada() {
        this.estado = EstadoVisita.COMPLETADA;
    }
}
