package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import com.construsoft.visita_facil_api.model.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

public interface DisponibilidadPropiedadRepository extends JpaRepository<DisponibilidadPropiedad, Long> {
    List<DisponibilidadPropiedad> findByPropiedadIdAndFecha(Long propiedadId, LocalDate fecha);
    List<DisponibilidadPropiedad> findByFecha(LocalDate fecha);
}
