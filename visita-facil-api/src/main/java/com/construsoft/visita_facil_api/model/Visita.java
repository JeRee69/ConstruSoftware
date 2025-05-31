package com.construsoft.visita_facil_api.model;

import com.construsoft.visita_facil_api.enums.EstadoVisita;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "visitas")
public class Visita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "propiedad_id")
    private Propiedad propiedad;

    @ManyToOne(optional = false)
    @JoinColumn(name = "agente_id")
    private Account agente;

    @Enumerated(EnumType.STRING)
    private EstadoVisita estado;

    @Column(name = "fecha_visita", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora_visita", nullable = false)
    private LocalTime hora;

    @Column(name = "nombre_cliente", nullable = false)
    private String clienteNombre;

    @Column(name = "email_cliente", nullable = false)
    private String clienteEmail;

    @Column(name = "telefono_cliente", nullable = false)
    private String clienteTelefono;

    public Visita() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Propiedad getPropiedad() {
        return propiedad;
    }

    public void setPropiedad(Propiedad propiedad) {
        this.propiedad = propiedad;
    }

    public Account getAgente() {
        return agente;
    }

    public void setAgente(Account agente) {
        this.agente = agente;
    }

    public EstadoVisita getEstado() {
        return estado;
    }

    public void setEstado(EstadoVisita estado) {
        this.estado = estado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public String getClienteEmail() {
        return clienteEmail;
    }

    public void setClienteEmail(String clienteEmail) {
        this.clienteEmail = clienteEmail;
    }

    public String getClienteTelefono() {
        return clienteTelefono;
    }

    public void setClienteTelefono(String clienteTelefono) {
        this.clienteTelefono = clienteTelefono;
    }

}
