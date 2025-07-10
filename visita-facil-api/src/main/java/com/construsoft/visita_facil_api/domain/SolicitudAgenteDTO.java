package com.construsoft.visita_facil_api.domain;

public class SolicitudAgenteDTO {

    private Long id;
    private int idPropiedad;
    private String tituloPropiedad;
    private String nombreCliente;
    private String correoCliente;
    private String telefonoCliente;
    private String direccionPropiedad;
    private String fecha;
    private String hora;
    private String estado;

    public SolicitudAgenteDTO(Long id, int idPropiedad, String tituloPropiedad, String nombreCliente, String correoCliente, String telefonoCliente, String direccionPropiedad, String fecha, String hora, String estado) {
        this.id = id;
        this.idPropiedad = idPropiedad;
        this.tituloPropiedad = tituloPropiedad;
        this.nombreCliente = nombreCliente;
        this.correoCliente = correoCliente;
        this.telefonoCliente = telefonoCliente;
        this.direccionPropiedad = direccionPropiedad;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
    }

    public SolicitudAgenteDTO() {
    }

    public int getIdPropiedad() {
        return idPropiedad;
    }

    public void setIdPropiedad(int idPropiedad) {
        this.idPropiedad = idPropiedad;
    }

    public String getTituloPropiedad() {
        return tituloPropiedad;
    }

    public void setTituloPropiedad(String tituloPropiedad) {
        this.tituloPropiedad = tituloPropiedad;
    }

    public String getTelefonoCliente() {
        return telefonoCliente;
    }

    public void setTelefonoCliente(String telefonoCliente) {
        this.telefonoCliente = telefonoCliente;
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
