package com.construsoft.visita_facil_api.domain;

import java.util.List;

public class PropiedadDTO {

    private String titulo;
    private String descripcion;
    private int precio;
    private String tipo;
    private String ubicacion;
    private List<String> urlsImagenes;
    private boolean disponible = true;

    public PropiedadDTO() {
    }

    public PropiedadDTO(String titulo, String descripcion, int precio, String tipo, String ubicacion, List<String> urlsImagenes, boolean disponible) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
        this.urlsImagenes = urlsImagenes;
        this.disponible = disponible;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public List<String> getUrlsImagenes() {
        return urlsImagenes;
    }

    public void setUrlsImagenes(List<String> urlsImagenes) {
        this.urlsImagenes = urlsImagenes;
    }

}
