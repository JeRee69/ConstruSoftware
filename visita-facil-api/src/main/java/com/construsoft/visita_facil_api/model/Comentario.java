package com.construsoft.visita_facil_api.model;

import java.sql.Date;

public class Comentario {
    private Long id;
    private Cliente cliente;
    private Visita visita;
    private String texto;
    private int calificacion;
    private Date fecha;

    public void responderComentario() {}
}
