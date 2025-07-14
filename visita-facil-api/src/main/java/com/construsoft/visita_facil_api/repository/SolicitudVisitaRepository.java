package com.construsoft.visita_facil_api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudVisita;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.model.SolicitudVisita;

public interface SolicitudVisitaRepository extends JpaRepository<SolicitudVisita, Long> {

    List<SolicitudVisita> findByPropiedadIdAndFecha(int propiedad_id, LocalDate fecha);

    void deleteByPropiedad(Propiedad propiedad);

    List<SolicitudVisita> findByCorreoClienteAndEstado(String correoCliente, EstadoSolicitudVisita estado);

    List<SolicitudVisita> findByEstado(EstadoSolicitudVisita estadoSolicitudVisita);

    List<SolicitudVisita> findByPropiedad(Propiedad propiedad);
}
