package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SolicitudVisitaRepository extends JpaRepository<SolicitudVisita, Long> {
    List<SolicitudVisita> findByPropiedadIdAndFecha(int propiedad_id, LocalDate fecha);
    void deleteByPropiedad(Propiedad propiedad);

}
