package com.construsoft.visita_facil_api.domain;

public class SolicitudAgenteDTO {
    private Long id;
    private String nombreCliente;
    private String direccionPropiedad;
    private String fecha;
    private String hora;
    private String estado;

    // Constructor
    public SolicitudAgenteDTO(Long id, String nombreCliente, String direccionPropiedad, String fecha, String hora, String estado) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.direccionPropiedad = direccionPropiedad;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
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
