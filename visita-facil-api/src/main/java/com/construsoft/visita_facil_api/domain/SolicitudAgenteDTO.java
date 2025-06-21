package com.construsoft.visita_facil_api.domain;

public class SolicitudAgenteDTO {

    private Long id;
    private String nombreCliente;
    private String correoCliente;
    private String direccionPropiedad;
    private String fecha;
    private String hora;
    private String estado;

    public SolicitudAgenteDTO(Long id, String nombreCliente, String correoCliente,
            String direccionPropiedad, String fecha, String hora, String estado) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.correoCliente = correoCliente;
        this.direccionPropiedad = direccionPropiedad;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
    }

    public SolicitudAgenteDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getCorreoCliente() {
        return correoCliente;
    }

    public void setCorreoCliente(String correoCliente) {
        this.correoCliente = correoCliente;
    }

    public String getDireccionPropiedad() {
        return direccionPropiedad;
    }

    public void setDireccionPropiedad(String direccionPropiedad) {
        this.direccionPropiedad = direccionPropiedad;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
