package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DisponibilidadPropiedadRepository extends JpaRepository<DisponibilidadPropiedad, Long> {
    List<DisponibilidadPropiedad> findByPropiedadId(int propiedadId);
    List<DisponibilidadPropiedad> findByPropiedadIdAndFecha(Long propiedadId, LocalDate fecha);
    List<DisponibilidadPropiedad> findByFecha(LocalDate fecha);
}
