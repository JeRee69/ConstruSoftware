package com.construsoft.visita_facil_api.domain;


public class NotificacionDTO {
    private String destinatario;
    private String asunto;
    private String mensaje;


    public NotificacionDTO() {}

    

    public String getDestinatario() {
        return this.destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public String getAsunto() {
        return this.asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getMensaje() {
        return this.mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

}