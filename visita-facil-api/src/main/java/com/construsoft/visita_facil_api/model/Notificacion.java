package com.construsoft.visita_facil_api.model;

import java.util.Date;

public class Notificacion {
    private String mensaje;
    private Date fechaMensaje;
    private boolean leido;

    public void enviar() {}
    public void marcarLeido() {
        this.leido = true;
    }
}
